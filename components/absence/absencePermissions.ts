import IAbsence from "@/interfaces/IAbsence";

export function canManageAbsence(
  absence: Pick<IAbsence, "volunteer">,
  role: string | null | undefined,
  volunteerId: string | null | undefined,
): boolean {
  if (role === "admin") return true;
  if (!volunteerId) return false;
  return absence.volunteer?.documentId === volunteerId;
}

export function isOwnAbsence(
  absence: Pick<IAbsence, "volunteer">,
  volunteerId: string | null | undefined,
): boolean {
  return Boolean(volunteerId) && absence.volunteer?.documentId === volunteerId;
}
