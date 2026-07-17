import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

type LinkedEntity = { documentId: string; role: string } | null;

// Cherche l'adopter ou le volunteer lié au user users-permissions.
// Utilise le token API serveur (jamais exposé au client).
async function findLinkedEntity(
  collection: "adopters" | "volunteers",
  userId: number,
): Promise<LinkedEntity> {
  const res = await fetch(
    `${STRAPI_BASE}/api/${collection}?filters[users_permissions_user][id][$eq]=${userId}`,
    { headers: { Authorization: `Bearer ${API_TOKEN}` } },
  );

  if (!res.ok) {
    console.error(
      `[auth/login] lookup ${collection}: ${res.status} - ${res.statusText} - ${await res.text()}`,
    );
    return null;
  }

  const json = await res.json();
  const entity = json.data?.[0];

  if (!entity) return null;

  return {
    documentId: entity.documentId,
    // adopters n'ont pas de champ role : on renvoie "adopter" par défaut
    role: entity.role ?? "adopter",
  };
}

export async function POST(request: Request) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis." },
        { status: 400 },
      );
    }

    // 1. Authentification via le plugin users-and-permissions
    const authRes = await fetch(`${STRAPI_BASE}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    if (!authRes.ok) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect." },
        { status: 401 },
      );
    }

    const { jwt, user } = await authRes.json();

    // 2. Résolution du profil lié (adopter puis volunteer)
    let type: "adopter" | "volunteer";
    let linked = await findLinkedEntity("adopters", user.id);

    if (linked) {
      type = "adopter";
    } else {
      linked = await findLinkedEntity("volunteers", user.id);
      type = "volunteer";
    }

    if (!linked) {
      return NextResponse.json(
        { error: "Aucun profil n'est associé à ce compte." },
        { status: 403 },
      );
    }

    // 3. Pose des cookies (jwt httpOnly, le reste lisible côté client)
    const cookieStore = await cookies();
    const base = { sameSite: "lax" as const, path: "/", maxAge: MAX_AGE };

    cookieStore.set("jwt", jwt, { ...base, httpOnly: true });
    cookieStore.set("user_role", linked.role, { ...base, httpOnly: false });
    cookieStore.set(
      type === "adopter" ? "adopter_id" : "volunteer_id",
      linked.documentId,
      { ...base, httpOnly: false },
    );

    return NextResponse.json(
      { success: true, type, role: linked.role, documentId: linked.documentId },
      { status: 200 },
    );
  } catch (err) {
    console.error(`[auth/login] POST: ${String(err)}`);
    return NextResponse.json(
      { error: "Erreur serveur, veuillez réessayer." },
      { status: 500 },
    );
  }
}
