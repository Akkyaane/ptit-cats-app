"use server";

import IAbsence from "@/interfaces/IAbsence";
import { revalidatePath } from "next/cache";

export async function getAllAbsences(): Promise<IAbsence[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/absences`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

// Convertit une date de formulaire (YYYY-MM-DD) en datetime ISO (minuit UTC).
function toISO(dateStr: string) {
  return new Date(`${dateStr}T00:00:00.000Z`).toISOString();
}

export async function createAbsence(formData: FormData) {
  const startDate = formData.get("startDate") as string;
  const endDate = (formData.get("endDate") as string) || startDate;
  const volunteerId = formData.get("volunteerId") as string;

  if (!startDate || !volunteerId) {
    return { error: "Le bénévole et la date de début sont requis" };
  }
  if (endDate < startDate) {
    return { error: "La date de fin doit être postérieure ou égale à la date de début" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/absences/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: toISO(startDate),
        endDate: toISO(endDate),
        volunteer: volunteerId,
      }),
    }
  );

  if (!res.ok) return { error: "Erreur lors de la création" };
  revalidatePath("/absences");
  return { success: true };
}

export async function updateAbsence(formData: FormData) {
  const documentId = formData.get("documentId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = (formData.get("endDate") as string) || startDate;

  if (!documentId || !startDate) {
    return { error: "Champs requis manquants" };
  }
  if (endDate < startDate) {
    return { error: "La date de fin doit être postérieure ou égale à la date de début" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/absences/update`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentId,
        startDate: toISO(startDate),
        endDate: toISO(endDate),
      }),
    }
  );

  if (!res.ok) return { error: "Erreur lors de la modification" };
  revalidatePath("/absences");
  return { success: true };
}
