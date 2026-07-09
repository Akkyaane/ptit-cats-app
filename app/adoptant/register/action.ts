"use server";

import { cookies } from "next/headers";
import { buildAdoptantPayload } from "@/helpers/adoptantForm";

export async function createAdoptant(formData: FormData) {
  const payload = buildAdoptantPayload(formData, { includePassword: true });

  if ("error" in payload) {
    return { error: payload.error };
  }

  try {
    const { name, firstName, email, password, ...profileData } = payload.data;

    const existingRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoptants?filters[email][$eq]=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );
    if (existingRes.ok) {
      const existingJson = await existingRes.json();
      if (existingJson.data?.length > 0) {
        return { error: "Un compte existe déjà avec cet email." };
      }
    }

    const authResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          email,
          password,
        }),
      }
    );

    if (!authResponse.ok) {
      const errorJson = await authResponse.json();
      const message: string = errorJson?.error?.message ?? "";
      if (
        message.toLowerCase().includes("email") ||
        message.toLowerCase().includes("already taken") ||
        message.toLowerCase().includes("username")
      ) {
        return { error: "Un compte existe déjà avec cet email." };
      }
      console.error("Auth register error:", errorJson);
      return { error: "Erreur lors de la création du compte." };
    }

    const authJson = await authResponse.json();
    const jwt: string = authJson.jwt;

    const adoptantResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoptants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: { name, firstName, email, ...profileData },
        }),
      }
    );

    if (!adoptantResponse.ok) {
      const errorText = await adoptantResponse.text();
      console.error("Adoptant creation error:", errorText);
      return { error: "Compte créé mais erreur lors de la sauvegarde du profil." };
    }

    const adoptantJson = await adoptantResponse.json();
    const documentId: string = adoptantJson.data.documentId;

    const cookieStore = await cookies();
    cookieStore.set("jwt", jwt, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set("adoptant_id", documentId, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set("user_role", "adoptant", {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, documentId };
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Erreur serveur, veuillez réessayer." };
  }
}
