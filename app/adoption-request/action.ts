"use server";

import { redirect } from "next/navigation";
import { IAdoptionRequest } from "@/interfaces/IAdoptionRequest";

export async function getAdoptionRequestsByAdopter(
  adopterDocumentId: string
): Promise<IAdoptionRequest[]> {
  const params = new URLSearchParams();
  params.set("filters[adopter][documentId][$eq]", adopterDocumentId);
  params.set("populate", "*");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-requests?${params}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    }
  );

  if (!response.ok) return [];

  const json = await response.json();
  // DEBUG temporaire — à retirer après diagnostic
  if (json.data?.[0]) {
    console.log("[adoption-requests] structure item[0]:", JSON.stringify(json.data[0], null, 2));
  }
  return json.data ?? [];
}

export async function createAdoptionRequest(
  adopterDocumentId: string,
  listingDocumentId: string
): Promise<{ error: string } | undefined> {
  // Vérifier doublon
  const existing = await getAdoptionRequestsByAdopter(adopterDocumentId);
  if (existing.some((r) => r.adoptionListing?.documentId === listingDocumentId)) {
    return { error: "Vous avez déjà soumis une demande pour ce chat." };
  }

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
          adoptionListing: { connect: [{ documentId: listingDocumentId }] },
          status: "en_attente",
        },
      }),
    }
  );

  const responseBody = await response.json();
  console.log("[createAdoptionRequest] listingDocumentId:", listingDocumentId);
  console.log("[createAdoptionRequest] Strapi response:", JSON.stringify(responseBody, null, 2));

  if (!response.ok) {
    console.error("Strapi create adoption-request error:", responseBody);
    return { error: "Erreur lors de la création de la demande. Veuillez réessayer." };
  }

  redirect("/adopter/profile?tab=demandes&requested=true");
}
