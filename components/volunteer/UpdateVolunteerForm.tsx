"use client";

import { useState } from "react";
import { updateBenevole } from "@/app/volunteer/update/action";

type Benevole = {
  id: number;
  documentId: string;
  name: string;
  firstName: string;
  email: string;
  role: "Admin" | "Référent" | "Responsable-adoption";
};

export default function UpdateVolunteerForm({ benevole }: { benevole: Benevole }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await updateBenevole(benevole.documentId, formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return <p>Bénévole mis à jour avec succès !</p>;
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" type="text" defaultValue={benevole.name} required />
      </div>

      <div>
        <label htmlFor="firstName">Prénom</label>
        <input id="firstName" name="firstName" type="text" defaultValue={benevole.firstName} required />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" defaultValue={benevole.email} required />
      </div>

      <div>
        <label htmlFor="role">Rôle</label>
        <select id="role" name="role" defaultValue={benevole.role} required>
          <option value="">-- Choisir un rôle --</option>
          <option value="Admin">Admin</option>
          <option value="Référent">Référent</option>
          <option value="Responsable-adoption">Responsable-adoption</option>
        </select>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Mettre à jour</button>
    </form>
  );
}