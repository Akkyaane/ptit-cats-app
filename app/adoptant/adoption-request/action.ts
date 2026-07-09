"use server";

import { redirect } from "next/navigation";
import { IAdoptionRequest } from "@/interfaces/IAdoptionRequest";

export async function getAdoptionRequestsByAdoptant(
  adoptantDocumentId: string
): Promise<IAdoptionRequest[]> {
  const params = new URLSearchParams();
  params.set("filters[adoptant][documentId][$eq]", adoptantDocumentId);
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
  adoptantDocumentId: string,
  listingDocumentId: string
): Promise<{ error: string } | undefined> {
  // Vérifier doublon
  const existing = await getAdoptionRequestsByAdoptant(adoptantDocumentId);
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
          adoptant: { connect: [{ documentId: adoptantDocumentId }] },
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

  redirect("/adoptant/profile?tab=demandes&requested=true");
}
