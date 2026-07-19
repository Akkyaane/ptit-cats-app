"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import IAdoptionRequest, {
  AdoptionRequestStatus,
} from "@/interfaces/IAdoptionRequest";

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
const authHeaders = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
};

type VolunteerLoad = {
  documentId: string;
  activeCount: number;
  present: boolean;
};

// Récupère les bénévoles d'un rôle avec leur charge (demandes actives) et leur
// présence (aucune absence ne chevauche l'instant présent).
async function getVolunteersWithLoad(
  role: "manager" | "referent",
): Promise<VolunteerLoad[]> {
  const params = new URLSearchParams();
  params.set("filters[role][$eq]", role);
  params.set("populate[adoption_requests][fields][0]", "entityStatus");
  params.set("populate[absences][fields][0]", "startDate");
  params.set("populate[absences][fields][1]", "endDate");
  params.set("pagination[pageSize]", "100");

  const res = await fetch(`${STRAPI}/api/volunteers?${params}`, {
    cache: "no-store",
    headers: authHeaders,
  });
  if (!res.ok) return [];

  const json = await res.json();
  const now = Date.now();

  return (json.data ?? []).map(
    (v: {
      documentId: string;
      adoption_requests?: { entityStatus: string }[];
      absences?: { startDate?: string; endDate?: string }[];
    }) => {
      const activeCount = (v.adoption_requests ?? []).filter(
        (r) =>
          r.entityStatus === "to be processed" || r.entityStatus === "pending",
      ).length;
      const present = !(v.absences ?? []).some((a) => {
        const start = a.startDate ? new Date(a.startDate).getTime() : -Infinity;
        const end = a.endDate ? new Date(a.endDate).getTime() : Infinity;
        return start <= now && now <= end;
      });
      return { documentId: v.documentId, activeCount, present };
    },
  );
}

// Choisit l'assigné : présent en priorité, puis le moins chargé. Fallback sur le
// moins chargé même absent pour ne jamais perdre une demande.
function pickAssignee(pool: VolunteerLoad[]): string | null {
  if (pool.length === 0) return null;
  const byLoad = (a: VolunteerLoad, b: VolunteerLoad) =>
    a.activeCount - b.activeCount;
  const present = pool.filter((v) => v.present).sort(byLoad);
  if (present.length > 0) return present[0].documentId;
  return [...pool].sort(byLoad)[0].documentId;
}

export async function getAdoptionRequestsByAdopter(
  adopterDocumentId: string
): Promise<IAdoptionRequest[]> {
  const params = new URLSearchParams();
  params.set("filters[adopter][documentId][$eq]", adopterDocumentId);
  // Populate imbriqué : l'annonce liée avec ses médias et animaux, pour que
  // ALCard s'affiche comme sur la page des annonces (image + tags + prix).
  params.set("populate[adopter]", "true");
  params.set("populate[adoption_listing][populate]", "*");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-requests?${params}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    }
  );

  if (!response.ok) return [];

  const json = await response.json();
  return json.data ?? [];
}

export async function getAdoptionRequestsByVolunteer(
  volunteerDocumentId: string
): Promise<IAdoptionRequest[]> {
  const params = new URLSearchParams();
  params.set("filters[volunteer][documentId][$eq]", volunteerDocumentId);
  params.set("populate", "*");
  params.set("sort", "createdAt:desc");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-requests?${params}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    }
  );

  if (!response.ok) return [];

  const json = await response.json();
  return json.data ?? [];
}

export async function createAdoptionRequest(
  adopterDocumentId: string,
  listingDocumentId: string
): Promise<{ error: string } | undefined> {
  // Vérifier doublon
  const existing = await getAdoptionRequestsByAdopter(adopterDocumentId);
  if (existing.some((r) => r.adoption_listing?.documentId === listingDocumentId)) {
    return { error: "Vous avez déjà soumis une demande pour ce chat." };
  }

  // Distribution : le responsable présent le moins chargé (équilibrage).
  const assigneeDocumentId = pickAssignee(
    await getVolunteersWithLoad("manager"),
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          adopter: { connect: [{ documentId: adopterDocumentId }] },
          adoption_listing: { connect: [{ documentId: listingDocumentId }] },
          entityStatus: "to be processed",
          ...(assigneeDocumentId
            ? { volunteer: { connect: [{ documentId: assigneeDocumentId }] } }
            : {}),
        },
      }),
    }
  );

  if (!response.ok) {
    const responseBody = await response.json().catch(() => null);
    console.error("Strapi create adoption-request error:", responseBody);
    return { error: "Erreur lors de la création de la demande. Veuillez réessayer." };
  }

  redirect("/account?tab=demandes&requested=true");
}

// Demandes visibles par un bénévole : celles qui lui sont assignées
// (volunteer=lui) ET celles qu'il a transférées (transferredBy=lui).
export async function getAdoptionRequestsForVolunteer(
  volunteerDocumentId: string
): Promise<IAdoptionRequest[]> {
  const build = (key: string, value: string) => {
    const p = new URLSearchParams();
    p.set(key, value);
    p.set("populate", "*");
    p.set("sort", "createdAt:desc");
    return `${STRAPI}/api/adoption-requests?${p}`;
  };

  const [assignedRes, transferredRes] = await Promise.all([
    fetch(build("filters[volunteer][documentId][$eq]", volunteerDocumentId), {
      cache: "no-store",
      headers: authHeaders,
    }),
    fetch(build("filters[transferredBy][$eq]", volunteerDocumentId), {
      cache: "no-store",
      headers: authHeaders,
    }),
  ]);

  const assigned = assignedRes.ok ? (await assignedRes.json()).data ?? [] : [];
  const transferred = transferredRes.ok
    ? (await transferredRes.json()).data ?? []
    : [];

  const map = new Map<string, IAdoptionRequest>();
  [...assigned, ...transferred].forEach((r: IAdoptionRequest) =>
    map.set(r.documentId, r)
  );

  return [...map.values()].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getAdoptionRequestById(
  documentId: string
): Promise<IAdoptionRequest | null> {
  const p = new URLSearchParams();
  p.set("populate[adopter]", "true");
  p.set("populate[adoption_listing][populate]", "*");
  p.set("populate[volunteer]", "true");

  const res = await fetch(
    `${STRAPI}/api/adoption-requests/${documentId}?${p}`,
    { cache: "no-store", headers: authHeaders }
  );
  if (!res.ok) return null;
  return (await res.json()).data ?? null;
}

// Met à jour le statut (+ remarques). À "done", l'annonce liée passe adoptée.
export async function setAdoptionRequestStatus(
  documentId: string,
  status: AdoptionRequestStatus,
  remarks?: string
): Promise<{ error?: string }> {
  const data: Record<string, unknown> = { entityStatus: status };
  if (remarks !== undefined) data.remarks = remarks;

  const res = await fetch(`${STRAPI}/api/adoption-requests/${documentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) return { error: "Échec de la mise à jour de la demande." };

  if (status === "done") {
    const full = await getAdoptionRequestById(documentId);
    const listingId = full?.adoption_listing?.documentId;
    if (listingId) {
      await fetch(`${STRAPI}/api/adoption-listings/${listingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ data: { entityStatus: "adoption completed" } }),
      });
    }
  }

  revalidatePath("/account/requests");
  return {};
}

// Transfert vers un référent disponible. Le responsable d'origine reste lié via
// transferredBy ; le champ volunteer pointe désormais sur le référent.
export async function transferRequest(
  documentId: string,
  managerDocumentId: string
): Promise<{ error?: string }> {
  const referentId = pickAssignee(await getVolunteersWithLoad("referent"));
  if (!referentId) {
    return { error: "Aucun référent disponible pour le transfert." };
  }

  const res = await fetch(`${STRAPI}/api/adoption-requests/${documentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({
      data: {
        volunteer: { set: [{ documentId: referentId }] },
        transferredBy: managerDocumentId,
        entityStatus: "to be processed",
      },
    }),
  });
  if (!res.ok) return { error: "Échec du transfert." };

  revalidatePath("/account/requests");
  return {};
}
