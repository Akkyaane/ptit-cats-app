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
    const catsRaw = JSON.parse(formData.get("cats") as string) as Array<Record<string, unknown> & { animal_requirements?: { id: number; documentId: string }[] }>;

    if (!title || !shortDescription || !longDescription || photos.length === 0 || isNaN(price) || catsRaw.length === 0) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    // Create each cat individually in Strapi (cats is a relation, not a component)
    const catDocumentIds: string[] = [];
    for (const cat of catsRaw) {
      const { animal_requirements, birthDate, ...catFields } = cat;
      const catData: Record<string, unknown> = {
        ...catFields,
        ...(birthDate ? { birthDate } : {}),
        animal_requirements: (animal_requirements ?? []).map((r) => r.documentId),
      };

      const catRes = await fetch(`${process.env.STRAPI_LOCALHOST_URL}/api/cats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
        },
        body: JSON.stringify({ data: catData }),
      });

      if (!catRes.ok) {
        const errorBody = await catRes.text();
        console.error("[adoption-posts] Strapi cat creation failed:", catRes.status, errorBody);
        let message = "Échec de la création d'un chat";
        try { message = JSON.parse(errorBody)?.error?.message ?? message; } catch { /* noop */ }
        throw new Error(message);
      }

      const createdCat = await catRes.json();
      console.log("[adoption-posts] cat created:", createdCat.data.id, createdCat.data.documentId);
      catDocumentIds.push(createdCat.data.documentId);
    }

    // Create adoption post referencing created cat IDs
    const response = await fetch(
      `${process.env.STRAPI_LOCALHOST_URL}/api/adoption-posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            title, slogan, shortDescription, longDescription, isDuo, price,
            cats: catDocumentIds,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[adoption-posts] Strapi post creation failed:", response.status, errorBody);
      let message = "Échec de la création de l'annonce";
      try { message = JSON.parse(errorBody)?.error?.message ?? message; } catch { /* noop */ }
      throw new Error(message);
    }

    const createdEntry = await response.json();
    const entryId = createdEntry.data.documentId as string;

    console.log("[adoption-posts] photos received:", photos.length, photos.map((p) => `${p.name} (${p.size}B)`));

    const photosForm = new FormData();
    for (const photo of photos) {
      const buffer = Buffer.from(await photo.arrayBuffer());
      const blob = new Blob([buffer], { type: photo.type });
      photosForm.append("files", blob, photo.name);
    }
    photosForm.append("ref", "api::adoption-post.adoption-post");
    photosForm.append("refId", entryId);
    photosForm.append("field", "photos");

    const uploadRes = await fetch(`${process.env.STRAPI_LOCALHOST_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
      },
      body: photosForm,
    });

    if (!uploadRes.ok) {
      const uploadError = await uploadRes.text();
      console.error("[adoption-posts] Strapi upload failed:", uploadRes.status, uploadError);
      throw new Error("Échec du téléversement des photos");
    }

    return NextResponse.json({ success: true, entryId }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}