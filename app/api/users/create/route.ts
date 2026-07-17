import { NextRequest, NextResponse } from "next/server";

const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Rôles users-permissions configurés côté back (cf. table up_roles).
const ROLE_IDS = {
  adopter: 8, // "Adopter"
  admin: 6, // "Admin"
  managerReferent: 7, // "Manager/Referent"
} as const;

type Collection = "adopters" | "volunteers";

// Détermine le rôle u&p selon le type d'entité et, pour un volunteer, son rôle métier.
function resolveRoleId(collection: Collection, volunteerRole?: string): number {
  if (collection === "adopters") return ROLE_IDS.adopter;
  return volunteerRole === "admin" ? ROLE_IDS.admin : ROLE_IDS.managerReferent;
}

// username = lastName + 1re lettre du firstName, en minuscules, sans caractères parasites.
function buildUsernameBase(lastName: string, firstName: string): string {
  const raw = `${lastName}${firstName.charAt(0)}`.toLowerCase();
  return raw.normalize("NFD").replace(/[^a-z0-9]/g, "");
}

// Cherche le prochain suffixe à 3 chiffres disponible (001, 002, ...) pour ce base.
async function nextUsername(base: string): Promise<string> {
  const res = await fetch(
    `${STRAPI_BASE}/api/users?filters[username][$startsWith]=${base}&fields[0]=username`,
    { headers: { Authorization: `Bearer ${API_TOKEN}` } },
  );

  let max = 0;
  if (res.ok) {
    const users = await res.json();
    const pattern = new RegExp(`^${base}(\\d{3})$`);
    (Array.isArray(users) ? users : []).forEach((u: { username?: string }) => {
      const match = u.username?.match(pattern);
      if (match) max = Math.max(max, Number(match[1]));
    });
  }

  return `${base}${String(max + 1).padStart(3, "0")}`;
}

export async function POST(req: NextRequest) {
  try {
    const { collection, documentId, lastName, firstName, email, password, volunteerRole } =
      await req.json();

    if (
      (collection !== "adopters" && collection !== "volunteers") ||
      !documentId ||
      !lastName ||
      !firstName ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        { error: "Paramètres manquants pour la création du compte utilisateur." },
        { status: 400 },
      );
    }

    const username = await nextUsername(buildUsernameBase(lastName, firstName));

    // 1. Création du user users-permissions (mêmes email/password + username généré).
    const userRes = await fetch(`${STRAPI_BASE}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmed: true,
        blocked: false,
        role: resolveRoleId(collection, volunteerRole),
      }),
    });

    if (!userRes.ok) {
      return NextResponse.json(
        { error: `[users/create] POST /users: ${userRes.status} - ${await userRes.text()}` },
        { status: userRes.status },
      );
    }

    const user = await userRes.json();

    // 2. Lien vers l'entité créée précédemment (relation portée côté adopter/volunteer).
    const linkRes = await fetch(`${STRAPI_BASE}/api/${collection}/${documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: { users_permissions_user: user.id } }),
    });

    if (!linkRes.ok) {
      return NextResponse.json(
        { error: `[users/create] link PUT /${collection}: ${linkRes.status} - ${await linkRes.text()}` },
        { status: linkRes.status },
      );
    }

    return NextResponse.json(
      { success: true, userId: user.id, username },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: `[users/create] POST: ${String(err)}` },
      { status: 500 },
    );
  }
}
