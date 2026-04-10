"use server";

import { cookies } from "next/headers";

export async function loginAdoptant(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      }
    );

    if (!response.ok) {
      return { error: "Email ou mot de passe incorrect." };
    }

    const json = await response.json();
    const jwt: string = json.jwt;

    const adoptantRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adoptants?filters[email][$eq]=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
        },
      }
    );

    let documentId: string | null = null;
    if (adoptantRes.ok) {
      const adoptantJson = await adoptantRes.json();
      if (adoptantJson.data?.length > 0) {
        documentId = adoptantJson.data[0].documentId;
      }
    }

    const cookieStore = await cookies();
    cookieStore.set("jwt", jwt, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    if (documentId) {
      cookieStore.set("adoptant_id", documentId, {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return { success: true, documentId };
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Erreur serveur, veuillez réessayer." };
  }
}
