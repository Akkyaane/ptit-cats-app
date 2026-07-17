"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBenevole } from "@/app/volunteers/update/action";

type Benevole = {
  id: number;
  documentId: string;
  lastName: string;
  firstName: string;
  email: string;
  role: "admin" | "manager" | "referent";
};

export default function UpdateVolunteerForm({
  benevole,
  canChangeRole = true,
}: {
  benevole: Benevole;
  canChangeRole?: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await updateBenevole(benevole.documentId, formData);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(
        () => router.push(`/volunteers/view/${benevole.documentId}`),
        1500,
      );
    }
  }

  if (success) {
    return (
      <p className="text-sm font-bold text-green-600 bg-green-50 px-4 py-3 rounded-xl text-center">
        Bénévole mis à jour avec succès ! Redirection...
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="lastName" className="text-sm font-bold ">
          Nom
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          defaultValue={benevole.lastName}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-sm font-bold ">
          Prénom
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          defaultValue={benevole.firstName}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-bold ">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={benevole.email}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      {canChangeRole && (
        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="text-sm font-bold ">
            Rôle
          </label>
          <select
            id="role"
            name="role"
            defaultValue={benevole.role}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200 bg-white"
          >
            <option value="">-- Choisir un rôle --</option>
            <option value="admin">Administrateur</option>
            <option value="manager">Responsable</option>
            <option value="referent">Référent</option>
          </select>
        </div>
      )}
      {!canChangeRole && (
        <input type="hidden" name="role" value={benevole.role} />
      )}

      {error && (
        <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 font-bold rounded-xl bg-primary border-2 border-primary text-white hover:bg-primary/10 hover:text-primary transition-colors duration-200 disabled:opacity-60"
      >
        {loading ? "Mise à jour..." : "Mettre à jour"}
      </button>
    </form>
  );
}
