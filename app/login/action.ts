"use server";

import { cookies } from "next/headers";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }

  try {
    const volunteerRes = await fetch(
      `${process.env.STRAPI_LOCALHOST_URL}/api/volunteers?filters[email][$eq]=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
        },
      }
    );

    if (volunteerRes.ok) {
      const volunteerJson = await volunteerRes.json();
      if (volunteerJson.data?.length > 0) {
        const volunteer = volunteerJson.data[0];
        if (volunteer.password !== password) {
          return { error: "Email ou mot de passe incorrect." };
        }

        const cookieStore = await cookies();
        cookieStore.set("volunteer_id", volunteer.documentId, {
          httpOnly: false,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        cookieStore.set("user_role", volunteer.role, {
          httpOnly: false,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        return { success: true, role: volunteer.role, volunteerId: volunteer.documentId };
      }
    }

    const response = await fetch(
      `${process.env.STRAPI_LOCALHOST_URL}/api/auth/local`,
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
      `${process.env.STRAPI_LOCALHOST_URL}/api/adoptants?filters[email][$eq]=${encodeURIComponent(email)}`,
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
      cookieStore.set("user_role", "adoptant", {
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

export const loginAdoptant = loginUser;

export async function logoutUser() {
  "use server";
  const { cookies } = await import("next/headers");
  const { redirect } = await import("next/navigation");
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  cookieStore.delete("adoptant_id");
  cookieStore.delete("volunteer_id");
  cookieStore.delete("user_role");
  redirect("/");
}
