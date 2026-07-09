"use server";

import { IAdoptant } from "@/interfaces/IAdoptant";
import { buildAdoptantPayload } from "@/helpers/adoptantForm";

export async function getAllAdoptants(): Promise<IAdoptant[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoptants`,
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

export async function getAdoptantById(id: string): Promise<IAdoptant | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoptants/${id}`,
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

export async function updateAdoptant(
  documentId: string,
  formData: FormData
) {
  if (!documentId) {
    return { error: "Identifiant adoptant manquant." };
  }

  const payload = buildAdoptantPayload(formData, { includePassword: false });

  if ("error" in payload) {
    return { error: payload.error };
  }

  try {
    // Contournement temporaire : on exclut l'email du payload s'il n'a pas changé.
    // Le back Strapi ne gère pas encore correctement la self-exclusion (erreur 500 / 400).
    const currentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoptants/${documentId}`,
      {
        cache: "no-store",
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );
    const updateData = { ...payload.data };
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
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoptants/${documentId}`,
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
      console.error("Strapi update adoptant error:", errorBody);

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
