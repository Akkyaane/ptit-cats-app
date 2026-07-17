"use server";

import IAdopter from "@/interfaces/IAdopter";
import { buildAdopterPayload } from "@/components/adopter/AdopterForm";

export async function getAllAdopters(): Promise<IAdopter[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adopters`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) return [];

  const json = await response.json();
  return json.data;
}

export async function getAdopterById(id: string): Promise<IAdopter | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adopters/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) return null;

  const json = await response.json();
  return json.data;
}

export async function updateAdopter(
  documentId: string,
  formData: FormData
) {
  if (!documentId) {
    return { error: "Identifiant adopter manquant." };
  }

  const payload = buildAdopterPayload(formData, { includePassword: false });

  if (!("data" in payload)) {
    return {
      error: "error" in payload && payload.error ? payload.error : "Formulaire invalide.",
    };
  }

  try {
    // Contournement temporaire : on exclut l'email du payload s'il n'a pas changé.
    // Le back Strapi ne gère pas encore correctement la self-exclusion (erreur 500 / 400).
    const currentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adopters/${documentId}`,
      {
        cache: "no-store",
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );
    const updateData: Record<string, unknown> = { ...payload.data };
    if (currentResponse.ok) {
      const currentJson = await currentResponse.json();
      const currentEmail: string | undefined = currentJson?.data?.email;
      if (
        typeof currentEmail === "string" &&
        typeof updateData.email === "string" &&
        currentEmail.trim().toLowerCase() === updateData.email.trim().toLowerCase()
      ) {
        delete updateData.email;
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adopters/${documentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: updateData,
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Strapi update adopter error:", errorBody);

      try {
        const parsed = JSON.parse(errorBody);
        const message =
          parsed?.error?.message ||
          parsed?.message ||
          "Erreur lors de la mise à jour.";
        return { error: message };
      } catch {
        return { error: "Erreur lors de la mise à jour." };
      }
    }

    return { success: true };
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Erreur serveur, veuillez réessayer." };
  }
}
