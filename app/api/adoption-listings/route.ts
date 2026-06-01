import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-listings?populate=*`,
      {
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
        next: { revalidate: 5 },
      },
    );

    if (!res.ok) {
      return NextResponse.json({ error: `[adoption-listings] API GET: ${res.status} - ${res.statusText} - ${await res.text()}` }, { status: res.status });
    }

    const data = await res.json();

    
    return NextResponse.json(
      { success: true, data: data.data },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ error: `[adoption-listings] API GET: ${String(err)}` }, { status: 500 });
  }
}


// function getPhotoUrl(photoPath?: string) {
//   if (!photoPath) {
//     return "/assets/animals/animal-1.jpg";
//   }

//   if (photoPath.startsWith("http")) {
//     return photoPath;
//   }

//   return `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${photoPath}`;
// }

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();

//     const title = formData.get("title") as string;
//     const slogan = formData.get("slogan") as string;
//     const shortDescription = formData.get("shortDescription") as string;
//     const longDescription = formData.get("longDescription") as string;
//     const photos = formData.getAll("photos") as File[];
//     const isDuo = formData.get("isDuo") === "true" ? true : false;
//     const price = Number(formData.get("price"));
//     const catsRaw = JSON.parse(formData.get("cats") as string) as Array<
//       Record<string, unknown> & {
//         animal_requirements?: { id: number; documentId: string }[];
//       }
//     >;

//     if (
//       !title ||
//       !shortDescription ||
//       !longDescription ||
//       photos.length === 0 ||
//       isNaN(price) ||
//       catsRaw.length === 0
//     ) {
//       return NextResponse.json(
//         { error: "Données manquantes" },
//         { status: 400 },
//       );
//     }

//     // Create each cat individually in Strapi (cats is a relation, not a component)
//     const catDocumentIds: string[] = [];
//     for (const cat of catsRaw) {
//       const { animal_requirements, birthDate, ...catFields } = cat;
//       const catData: Record<string, unknown> = {
//         ...catFields,
//         ...(birthDate ? { birthDate } : {}),
//         animal_requirements: (animal_requirements ?? []).map(
//           (r) => r.documentId,
//         ),
//       };

//       const catRes = await fetch(
//         `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/animals`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
//           },
//           body: JSON.stringify({ data: catData }),
//         },
//       );

//       if (!catRes.ok) {
//         const errorBody = await catRes.text();
//         console.error(
//           "[adoption-listings] Strapi cat creation failed:",
//           catRes.status,
//           errorBody,
//         );
//         let message = "Échec de la création d'un chat";
//         try {
//           message = JSON.parse(errorBody)?.error?.message ?? message;
//         } catch {
//           /* noop */
//         }
//         throw new Error(message);
//       }

//       const createdCat = await catRes.json();
//       console.log(
//         "[adoption-listings] cat created:",
//         createdCat.data.id,
//         createdCat.data.documentId,
//       );
//       catDocumentIds.push(createdCat.data.documentId);
//     }

//     // Create adoption post referencing created cat IDs
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-listings`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
//         },
//         body: JSON.stringify({
//           data: {
//             title,
//             slogan,
//             shortDescription,
//             longDescription,
//             isDuo,
//             price,
//             cats: catDocumentIds,
//           },
//         }),
//       },
//     );

//     if (!response.ok) {
//       const errorBody = await response.text();
//       console.error(
//         "[adoption-listings] Strapi post creation failed:",
//         response.status,
//         errorBody,
//       );
//       let message = "Échec de la création de l'annonce";
//       try {
//         message = JSON.parse(errorBody)?.error?.message ?? message;
//       } catch {
//         /* noop */
//       }
//       throw new Error(message);
//     }

//     const createdEntry = await response.json();
//     const entryDocumentId = createdEntry.data.documentId as string;
//     const entryNumericId = String(createdEntry.data.id);
//     console.log(
//       "[adoption-listings] post created — id:",
//       entryNumericId,
//       "documentId:",
//       entryDocumentId,
//     );

//     console.log(
//       "[adoption-listings] photos received:",
//       photos.length,
//       photos.map((p) => `${p.name} (${p.size}B)`),
//     );

//     // Resolve the "Assets" folder ID in Strapi media library
//     let assetsFolderId: string | null = null;
//     try {
//       const foldersRes = await fetch(
//         `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/upload/folders`,
//         {
//           headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
//         },
//       );
//       if (foldersRes.ok) {
//         const foldersData = await foldersRes.json();
//         const found = (foldersData.data ?? []).find(
//           (f: { name: string; id: number }) => f.name === "Assets",
//         );
//         if (found) assetsFolderId = String(found.id);
//       }
//     } catch {
//       /* proceed without folder targeting */
//     }

//     const photosForm = new FormData();
//     for (const photo of photos) {
//       const buffer = Buffer.from(await photo.arrayBuffer());
//       const blob = new Blob([buffer], { type: photo.type });
//       photosForm.append("files", blob, photo.name);
//     }
//     if (assetsFolderId) photosForm.append("folder", assetsFolderId);

//     const uploadRes = await fetch(
//       `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/upload`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
//         },
//         body: photosForm,
//       },
//     );

//     if (!uploadRes.ok) {
//       const uploadError = await uploadRes.text();
//       console.error(
//         "[adoption-listings] Strapi upload failed:",
//         uploadRes.status,
//         uploadError,
//       );
//       throw new Error("Échec du téléversement des photos");
//     }

//     const uploadedFiles = (await uploadRes.json()) as { id: number }[];
//     console.log(
//       "[adoption-listings] uploaded file ids:",
//       uploadedFiles.map((f) => f.id),
//     );

//     // Link uploaded files to the adoption post entry
//     const patchRes = await fetch(
//       `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-listings/${entryDocumentId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
//         },
//         body: JSON.stringify({
//           data: { photos: uploadedFiles.map((f) => f.id) },
//         }),
//       },
//     );

//     if (!patchRes.ok) {
//       const patchError = await patchRes.text();
//       console.error(
//         "[adoption-listings] photo link failed:",
//         patchRes.status,
//         patchError,
//       );
//       throw new Error("Échec de la liaison des photos");
//     }

//     return NextResponse.json(
//       { success: true, entryId: entryDocumentId },
//       { status: 200 },
//     );
//   } catch (error) {
//     const message = error instanceof Error ? error.message : "Erreur inconnue";
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }
