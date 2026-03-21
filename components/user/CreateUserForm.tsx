"use client";

import { useState } from "react";
import { createBenevole } from "@/app/user/create/action";

export default function CreateUserForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await createBenevole(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return <p>Bénévole créé avec succès !</p>;
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" type="text" required />
      </div>

      <div>
        <label htmlFor="firstName">Prénom</label>
        <input id="firstName" name="firstName" type="text" required />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>

      <div>
        <label htmlFor="password">Mot de passe provisoire</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
      </div>

      <div>
        <label htmlFor="role">Rôle</label>
        <select id="role" name="role" required>
          <option value="">-- Choisir un rôle --</option>
          <option value="Admin">Admin</option>
          <option value="Référent">Référent</option>
          <option value="Responsable-adoption">Responsable-adoption</option>
        </select>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Créer le bénévole</button>
    </form>
  );
}