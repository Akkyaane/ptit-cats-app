"use server";

import IAdopter from "@/interfaces/IAdopter";
import { buildAdopterPayload } from "@/components/adopter/AdopterForm";

export async function getAllAdopters(): Promise<IAdopter[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adopters`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) return [];

  const json = await response.json();
  return json.data;
}

export async function getAdopterById(id: string): Promise<IAdopter | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adopters/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) return null;

  const json = await response.json();
  return json.data;
}

export async function changeAdopterPassword(
  documentId: string,
  formData: FormData
) {
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

  // Le mot de passe de connexion est porté par le users_permissions_user lié.
  const current = await fetch(
    `${base}/api/adopters/${documentId}?populate=users_permissions_user`,
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

  const res = await fetch(`${base}/api/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ password: newPassword }),
  });

  if (!res.ok) {
    console.error(
      `[changeAdopterPassword] PUT user ${userId}: ${res.status} - ${await res.text()}`
    );
    return { error: "Erreur lors de la mise à jour du mot de passe." };
  }

  return { success: true };
}

export async function deleteAdopter(documentId: string) {
  if (!documentId) {
    return { error: "Identifiant adoptant manquant." };
  }

  const base = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const token = process.env.STRAPI_API_TOKEN;
  const authHeaders = { Authorization: `Bearer ${token}` };

  // 1. Récupère le compte users-permissions lié pour le supprimer aussi
  //    (sinon on laisserait un utilisateur orphelin capable de se connecter).
  let linkedUserId: number | string | null = null;
  try {
    const current = await fetch(
      `${base}/api/adopters/${documentId}?populate=users_permissions_user`,
      { cache: "no-store", headers: authHeaders }
    );
    if (current.ok) {
      const json = await current.json();
      linkedUserId = json?.data?.users_permissions_user?.id ?? null;
    }
  } catch (err) {
    console.error("[deleteAdopter] lookup user:", err);
  }

  // 2. Supprime l'adoptant.
  const res = await fetch(`${base}/api/adopters/${documentId}`, {
    method: "DELETE",
    headers: authHeaders,
  });

  if (!res.ok) {
    console.error(
      `[deleteAdopter] DELETE adopter: ${res.status} - ${await res.text()}`
    );
    return { error: "Erreur lors de la suppression de l'adoptant." };
  }

  // 3. Supprime le compte utilisateur lié s'il existe. On ne bloque pas en cas
  //    d'échec : l'adoptant est déjà supprimé, on se contente de journaliser.
  if (linkedUserId != null) {
    const userRes = await fetch(`${base}/api/users/${linkedUserId}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    if (!userRes.ok) {
      console.error(
        `[deleteAdopter] DELETE user ${linkedUserId}: ${userRes.status} - ${await userRes.text()}`
      );
    }
  }

  return { success: true };
}

export async function updateAdopter(
  documentId: string,
  formData: FormData
) {
  if (!documentId) {
    return { error: "Identifiant adopter manquant." };
  }

  const payload = buildAdopterPayload(formData, { includePassword: false });

  if (!("data" in payload)) {
    return {
      error: "error" in payload && payload.error ? payload.error : "Formulaire invalide.",
    };
  }

  try {
    // Contournement temporaire : on exclut l'email du payload s'il n'a pas changé.
    // Le back Strapi ne gère pas encore correctement la self-exclusion (erreur 500 / 400).
    const currentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adopters/${documentId}`,
      {
        cache: "no-store",
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );
    const updateData: Record<string, unknown> = { ...payload.data };
    if (currentResponse.ok) {
      const currentJson = await currentResponse.json();
      const currentEmail: string | undefined = currentJson?.data?.email;
      if (
        typeof currentEmail === "string" &&
        typeof updateData.email === "string" &&
        currentEmail.trim().toLowerCase() === updateData.email.trim().toLowerCase()
      ) {
        delete updateData.email;
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adopters/${documentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: updateData,
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Strapi update adopter error:", errorBody);

      try {
        const parsed = JSON.parse(errorBody);
        const message =
          parsed?.error?.message ||
          parsed?.message ||
          "Erreur lors de la mise à jour.";
        return { error: message };
      } catch {
        return { error: "Erreur lors de la mise à jour." };
      }
    }

    return { success: true };
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Erreur serveur, veuillez réessayer." };
  }
}
