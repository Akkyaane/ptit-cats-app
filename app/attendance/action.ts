"use server";

import { IAttendance } from "@/interfaces/IAbsence";
import { revalidatePath } from "next/cache";

export async function getAllAttendances(): Promise<IAttendance[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/attendance`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

export async function createAbsence(formData: FormData) {
  const date = formData.get("date") as string;
  const reason = formData.get("reason") as string;
  const volunteerId = formData.get("volunteerId") as string;

  if (!date || !volunteerId) {
    return { error: "La date et le bénévole sont requis" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/attendance/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        status: "absent",
        reason: reason || null,
        volunteer: volunteerId,
      }),
    }
  );

  if (!res.ok) return { error: "Erreur lors de la création" };
  revalidatePath("/attendance");
  return { success: true };
}

export async function updateAttendance(formData: FormData) {
  const documentId = formData.get("documentId") as string;
  const date = formData.get("date") as string;
  const status = formData.get("status") as string;
  const reason = formData.get("reason") as string;

  if (!documentId || !date || !status) {
    return { error: "Champs requis manquants" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/attendance/update`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentId,
        date,
        status,
        reason: reason || null,
      }),
    }
  );

  if (!res.ok) return { error: "Erreur lors de la modification" };
  revalidatePath("/attendance");
  return { success: true };
}