"use server";

export async function getAllBenevoles() {
  const response = await fetch(
    `${process.env.STRAPI_LOCALHOST_URL}/api/volunteers`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
      },
    }
  );

  if (!response.ok) return [];

  const json = await response.json();
  return json.data;
}

export async function getBenevoleById(id: string) {
  const response = await fetch(
    `${process.env.STRAPI_LOCALHOST_URL}/api/volunteers/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
      },
    }
  );

  if (!response.ok) return null;

  const json = await response.json();
  return json.data;
}

export async function updateBenevole(documentId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const firstName = formData.get("firstName") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  if (!name || !firstName || !email || !role) {
    return { error: "Tous les champs sont requis" };
  }

  const response = await fetch(
    `${process.env.STRAPI_LOCALHOST_URL}/api/volunteers/${documentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
      },
      body: JSON.stringify({
        data: { name, firstName, email, role },
      }),
    }
  );

  if (!response.ok) return { error: "Erreur lors de la mise à jour" };

  return { success: true };
}

export async function deleteBenevole(documentId: string) {
  const response = await fetch(
    `${process.env.STRAPI_LOCALHOST_URL}/api/volunteers/${documentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
      },
    }
  );

  if (!response.ok) return { error: "Erreur lors de la suppression" };

  return { success: true };
}