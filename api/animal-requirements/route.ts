"use server";

import { IAnimalRequirement } from "@/interfaces/IAnimalRequirement";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/animal-requirements?populate=*`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Échec de la récupération des exigences animales");
    }

    const data = (await response.json()) as { data: IAnimalRequirement[] };

    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}