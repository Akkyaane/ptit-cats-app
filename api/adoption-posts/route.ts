"use server";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const slogan = formData.get("slogan") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const longDescription = formData.get("longDescription") as string;
    const photos = formData.getAll("photos") as File[];
    const isDuo = formData.get("isDuo") === "true" ? true : false;
    const price = Number(formData.get("price"));
    const cats = JSON.parse(formData.get("cats") as string);

    if (!title || !shortDescription || !longDescription || photos.length === 0 || isNaN(price) || cats.length === 0) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/adoption-posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
        },
        body: JSON.stringify({
          data: { title, slogan, shortDescription, longDescription, isDuo, price, cats },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Échec de la création de l'annonce");
    }

    const createdEntry = await response.json();
    const entryId = createdEntry.data.id;

    const photosForm = new FormData();
    photos.forEach((photo) => {
      photosForm.append("files", photo, photo.name);
    });
    photosForm.append("ref", "api::adoption-post.adoption-post");
    photosForm.append("refId", entryId);
    photosForm.append("field", "photos");

    const uploadRes = await fetch(`${process.env.STRAPI_API_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
      },
      body: photosForm,
    });

    if (!uploadRes.ok) {
      throw new Error("Échec du téléversement des photos");
    }

    return NextResponse.json({ success: true, entryId }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}