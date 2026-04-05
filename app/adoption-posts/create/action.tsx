'use server';
import { revalidatePath } from "next/cache";

export default async function postAdoptionPost(formData: FormData) {
  // const data1 = {
  //   data: {
  //     title: formData.get("title"),
  //     slogan: formData.get("slogan"),
  //     shortDescription: formData.get("shortDescription"),
  //     longDescription: formData.get("longDescription"),
  //     isDuo: formData.get("isDuo") === "on",
  //     price: Number(formData.get("price")), 
  //     cats: [
  //       {
  //         name: formData.get("name"),
  //         sex: formData.get("sex"),
  //         birthDate: formData.get("birthDate") || undefined,
  //         isDewormed: formData.get("isDewormed") === "on",
  //         isVaccinated: formData.get("isVaccinated") === "on",
  //         isSterilizedOrCastrated: formData.get("isSterilizedOrCastrated") === "on",
  //         isIdentified: formData.get("isIdentified") === "on",
  //         dogAffinity: formData.get("dogAffinity"),
  //         catAffinity: formData.get("catAffinity"),
  //         childAffinity: formData.get("childAffinity"),
  //         livingEnvironmentType: formData.get("livingEnvironmentType"),
  //         keyPoints: formData.getAll("keyPoints"),
  //       }
  //     ]
  //   }
  // };

    const data = {
    data: {
        name: formData.get("name"),
        sex: formData.get("sex"),
        birthDate: formData.get("birthDate"),
        isDewormed: formData.get("isDewormed"),
        isVaccinated: formData.get("isVaccinated"),
        isSterilizedOrCastrated: formData.get("isSterilizedOrCastrated"),
        isIdentified: formData.get("isIdentified"),
        dogAffinity: formData.get("dogAffinity"),
        catAffinity: formData.get("catAffinity"),
        childAffinity: formData.get("childAffinity"),
        livingEnvironmentType: formData.get("livingEnvironmentType"),
        keyPoints: formData.getAll("keyPoints"),
    }
  };

  const res = await fetch(`http://localhost:1337/api/cats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  // const res = await fetch(`http://localhost:1337/api/adoption-posts`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
  //   },
  //   body: JSON.stringify(data),
  // });

  const response = await res.json();

  if (!res.ok) {
    console.error("Strapi Error Details:", JSON.stringify(response.error, null, 2));
    throw new Error(response.error?.message || "Failed to create post");
  }
  
  revalidatePath("/adoption-posts");

  return response.data;
}