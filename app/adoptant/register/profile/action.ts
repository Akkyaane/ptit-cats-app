"use server";

export async function completeAdoptantProfile(
  documentId: string,
  formData: FormData
) {
  const housingType = formData.get("housingType") as string;
  const hasGarden = formData.get("hasGarden") === "true";

  if (!housingType) {
    return { error: "Veuillez sélectionner un type de logement." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adoptants/${documentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            housingType,
            hasGarden,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Strapi error:", errorText);
      return { error: "Erreur lors de la mise à jour du profil." };
    }

    return { success: true };
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Erreur serveur, veuillez réessayer." };
  }
}
