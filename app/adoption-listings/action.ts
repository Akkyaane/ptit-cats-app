"use server";

import IAdoptionListing from "@/interfaces/IAdoptionListing";

export async function getAllAdoptionListings(): Promise<IAdoptionListing[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-listings?populate=*&sort=createdAt:desc`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    }
  );

  if (!res.ok) return [];

  const json = await res.json();
  return json.data ?? [];
}
