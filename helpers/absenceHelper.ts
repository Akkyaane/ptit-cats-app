import { strapiFetch } from "@/helpers/strapiHelper";
import type { VolunteerSession } from "@/helpers/sessionHelper";

type AccessCheck = { ok: true } | { ok: false; status: number; error: string };

export async function checkAbsenceAccess(
  session: VolunteerSession,
  documentId: string,
): Promise<AccessCheck> {
  if (session.role === "admin") return { ok: true };

  const res = await strapiFetch(`/api/absences/${documentId}?populate=volunteer`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return { ok: false, status: 404, error: "Absence introuvable" };
  }

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error: `Lecture de l'absence impossible: ${res.status} - ${await res.text()}`,
    };
  }

  const json = await res.json();
  const ownerId = json.data?.volunteer?.documentId;

  if (ownerId !== session.documentId) {
    return {
      ok: false,
      status: 403,
      error: "Vous ne pouvez gérer que vos propres absences",
    };
  }

  return { ok: true };
}
