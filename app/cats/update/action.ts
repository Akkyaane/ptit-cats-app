"use server";

import { IAnimalRequirement } from "@/interfaces/IAnimalRequirement";

export async function getCatById(documentId: string) {
  const res = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/api/cats/${documentId}?populate=animal_requirements`,
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  return (await res.json()).data;
}

export async function getAllAnimalRequirements(): Promise<IAnimalRequirement[]> {
  const res = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/api/animal-requirements`,
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];
  return (await res.json()).data ?? [];
}

export async function updateCat(documentId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const sex = formData.get("sex") as string;
  const birthDate = formData.get("birthDate") as string;
  const isDewormed = formData.has("isDewormed");
  const isVaccinated = formData.has("isVaccinated");
  const isSterilizedOrCastrated = formData.has("isSterilizedOrCastrated");
  const isIdentified = formData.has("isIdentified");
  const dogAffinity = formData.get("dogAffinity") as string;
  const catAffinity = formData.get("catAffinity") as string;
  const childAffinity = formData.get("childAffinity") as string;
  const livingEnvironmentType = formData.get("livingEnvironmentType") as string;
  const animalRequirements = formData.getAll("animal_requirements") as string[];

  if (!name || !sex || !dogAffinity || !catAffinity || !childAffinity || !livingEnvironmentType) {
    return { error: "Tous les champs obligatoires doivent être remplis" };
  }

  const res = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/api/cats/${documentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          name,
          sex,
          ...(birthDate ? { birthDate } : {}),
          isDewormed,
          isVaccinated,
          isSterilizedOrCastrated,
          isIdentified,
          dogAffinity,
          catAffinity,
          childAffinity,
          livingEnvironmentType,
          animal_requirements: animalRequirements,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("[updateCat] Strapi error:", res.status, err);
    return { error: "Erreur lors de la mise à jour du chat" };
  }

  return { success: true };
}

export async function deleteCat(documentId: string) {
  const res = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/api/cats/${documentId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    }
  );

  if (!res.ok) return { error: "Erreur lors de la suppression du chat" };
  return { success: true };
}
