"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
      setTimeout(() => router.push(`/volunteer/view/${benevole.documentId}`), 1500);
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
        <label htmlFor="name" className="text-sm font-bold text-[var(--color-quaternary)]">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={benevole.name}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-sm font-bold text-[var(--color-quaternary)]">
          Prénom
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          defaultValue={benevole.firstName}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-bold text-[var(--color-quaternary)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={benevole.email}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="role" className="text-sm font-bold text-[var(--color-quaternary)]">
          Rôle
        </label>
        <select
          id="role"
          name="role"
          defaultValue={benevole.role}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200 bg-white"
        >
          <option value="">-- Choisir un rôle --</option>
          <option value="Admin">Admin</option>
          <option value="Référent">Référent</option>
          <option value="Responsable-adoption">Responsable-adoption</option>
        </select>
      </div>

      {error && (
        <p className="text-sm font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 font-bold rounded-xl bg-[var(--color-primary)] border-2 border-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors duration-200 disabled:opacity-60"
      >
        {loading ? "Mise à jour..." : "Mettre à jour"}
      </button>
    </form>
  );
}