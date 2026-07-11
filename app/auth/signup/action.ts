"use server";

import { cookies } from "next/headers";
import { buildAdopterPayload } from "@/components/adopter/adopterForm";

export async function createAdopter(formData: FormData) {
  const payload = buildAdopterPayload(formData, { includePassword: true });

  if ("error" in payload) {
    return { error: payload.error };
  }

  if (!("data" in payload)) {
    return { error: payload.error };
  }

  try {
    const { name, firstName, email, password, housingType, hasGarden } = payload.data;

    const registerResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/auth/register/adopter`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, firstName, email, password, housingType, hasGarden }),
      }
    );

    if (!registerResponse.ok) {
      const errorJson = await registerResponse.json();
      const message: string = errorJson?.error?.message ?? "";
      if (message.toLowerCase().includes("email") || message.toLowerCase().includes("déjà")) {
        return { error: "Un compte existe déjà avec cet email." };
      }
      console.error("Register error:", errorJson);
      return { error: "Erreur lors de la création du compte." };
    }

    const registerJson = await registerResponse.json();
    const token: string = registerJson.token;
    const documentId: string = registerJson.user.documentId;

    const cookieStore = await cookies();
    cookieStore.set("jwt", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set("adopter_id", documentId, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set("user_role", "adopter", {
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
