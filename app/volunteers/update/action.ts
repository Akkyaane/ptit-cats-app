"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAllBenevoles() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/volunteers`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) return [];

  const json = await response.json();
  return json.data;
}

export async function getBenevoleById(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/volunteers/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) return null;

  const json = await response.json();
  return json.data;
}

export async function updateBenevole(documentId: string, formData: FormData) {
  const lastName = formData.get("lastName") as string;
  const firstName = formData.get("firstName") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  if (!lastName || !firstName || !email || !role) {
    return { error: "Tous les champs sont requis" };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/volunteers/${documentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: { lastName, firstName, email, role },
      }),
    }
  );

  if (!response.ok) return { error: "Erreur lors de la mise à jour" };

  return { success: true };
}

export async function deleteBenevole(documentId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/volunteers/${documentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) return { error: "Erreur lors de la suppression" };

  return { success: true };
}

export async function changeVolunteerPassword(documentId: string, formData: FormData) {
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!newPassword || !confirmPassword) {
    return { error: "Tous les champs sont requis." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "Les mots de passe ne correspondent pas." };
  }
  if (newPassword.length < 6) {
    return { error: "Le mot de passe doit contenir au moins 6 caractères." };
  }

  const base = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const authHeaders = { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` };

  // Le mot de passe de connexion est porté par le users_permissions_user lié
  // (auth via users-permissions), pas par le champ password de l'entité.
  const current = await fetch(
    `${base}/api/volunteers/${documentId}?populate=users_permissions_user`,
    { cache: "no-store", headers: authHeaders }
  );
  if (!current.ok) {
    return { error: "Compte introuvable." };
  }
  const json = await current.json();
  const userId = json?.data?.users_permissions_user?.id;
  if (!userId) {
    return { error: "Aucun compte de connexion associé à ce profil." };
  }

  const response = await fetch(`${base}/api/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ password: newPassword }),
  });

  if (!response.ok) {
    console.error(
      `[changeVolunteerPassword] PUT user ${userId}: ${response.status} - ${await response.text()}`
    );
    return { error: "Erreur lors de la mise à jour du mot de passe." };
  }

  return { success: true };
}

export async function deleteOwnVolunteerAccount(documentId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/volunteers/${documentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) return { error: "Erreur lors de la suppression." };

  const cookieStore = await cookies();
  cookieStore.delete("volunteer_id");
  cookieStore.delete("user_role");
  cookieStore.delete("jwt");

  redirect("/");
}