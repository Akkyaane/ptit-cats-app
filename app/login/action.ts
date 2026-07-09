"use server";

import { cookies } from "next/headers";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      return { error: "Email ou mot de passe incorrect." };
    }

    const json = await response.json();
    const token: string = json.token;
    const type: "adoptant" | "volunteer" = json.type;
    const user = json.user;

    const cookieStore = await cookies();

    if (type === "adoptant") {
      cookieStore.set("jwt", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      cookieStore.set("adoptant_id", user.documentId, {
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
      return { success: true, role: "adoptant", documentId: user.documentId };
    }

    // volunteer / admin
    cookieStore.set("volunteer_id", user.documentId, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set("user_role", user.role, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return { success: true, role: user.role, volunteerId: user.documentId };
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
