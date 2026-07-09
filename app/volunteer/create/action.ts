"use server";

export async function createBenevole(formData: FormData) {
  const name = formData.get("name") as string;
  const firstName = formData.get("firstName") as string; 
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!name || !firstName || !email || !password || !role) {
    return { error: "Tous les champs sont obligatoires." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/auth/register/volunteer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, firstName, email, password, role }),
      }
    );

    if (!response.ok) {
      const errorJson = await response.json();
      const message: string = errorJson?.error?.message ?? "";
      if (message.toLowerCase().includes("email") || message.toLowerCase().includes("déjà")) {
        return { error: "Un bénévole existe déjà avec cet email." };
      }
      console.error("Strapi error:", errorJson);
      return { error: "Erreur lors de la création du bénévole." };
    }

    return { success: true };
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Erreur serveur, veuillez réessayer." };
  }
}