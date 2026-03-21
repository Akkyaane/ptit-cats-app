"use server";
import AdoptionPostForm from "@/components/adoptionPost/AdoptionPostForm";
import { revalidatePath } from "next/cache";

export default async function createAdoptionPost() {
  async function postAdoptionPost(formData: FormData) {
    const data = {
      data: {
        title: formData.get("title"),
        slogan: formData.get("slogan"),
        shortDescription: formData.get("shortDescription"),
        content: formData.get("longDescription"),
        isDuo: formData.get("isDuo") === "on",
        price: formData.get("price"),
      }
    };
    const res = await fetch(`http://localhost:1337/api/adoption-posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath("/adoption-posts");
    }

    const response = await res.json();
    return response.data;
  }

  return (
    <AdoptionPostForm action={postAdoptionPost} />
  );
}
