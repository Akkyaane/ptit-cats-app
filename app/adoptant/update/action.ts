"use server";

import { IAdoptant } from "@/interfaces/IAdoptant";

export async function getAllAdoptants(): Promise<IAdoptant[]> {
  const response = await fetch(
    `${process.env.STRAPI_LOCALHOST_URL}/api/adoptants`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
      },
    }
  );

  if (!response.ok) return [];

  const json = await response.json();
  return json.data;
}

export async function getAdoptantById(id: string): Promise<IAdoptant | null> {
  const response = await fetch(
    `${process.env.STRAPI_LOCALHOST_URL}/api/adoptants/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
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
  const name = formData.get("name") as string;
  const firstName = formData.get("firstName") as string;
  const email = formData.get("email") as string;
  const housingType = formData.get("housingType") as string;
  const hasGarden = formData.get("hasGarden") === "true";

  if (!name || !firstName || !email) {
    return { error: "Les champs nom, prénom et email sont requis." };
  }

  try {
    const response = await fetch(
      `${process.env.STRAPI_LOCALHOST_URL}/api/adoptants/${documentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
        },
        body: JSON.stringify({
          data: { name, firstName, email, housingType: housingType || null, hasGarden },
        }),
      }
    );

    if (!response.ok) return { error: "Erreur lors de la mise à jour." };

    return { success: true };
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Erreur serveur, veuillez réessayer." };
  }
}
