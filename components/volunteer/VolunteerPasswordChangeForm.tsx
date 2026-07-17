"use client";

import { useState } from "react";
import { changeVolunteerPassword } from "@/app/volunteers/update/action";

export default function VolunteerPasswordChangeForm({
  documentId,
}: {
  documentId: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await changeVolunteerPassword(documentId, formData);

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setOpen(false), 1500);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full px-6 py-3 font-bold rounded-xl border-2 border-quaternary text-quaternary hover:bg-quaternary hover:text-white transition-colors duration-200"
      >
        Changer le mot de passe
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="font-bold text-lg">Changer le mot de passe</h3>

      {error && (
        <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl text-center">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm font-bold text-green-700 bg-green-100 px-4 py-3 rounded-xl text-center">
          Mot de passe mis à jour !
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold" htmlFor="newPassword">
          Nouveau mot de passe
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-quaternary outline-none transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold" htmlFor="confirmPassword">
          Confirmer le mot de passe
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-quaternary outline-none transition-colors duration-200"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => { setOpen(false); setError(null); }}
          disabled={loading}
          className="flex-1 px-6 py-3 font-bold rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-60"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 font-bold rounded-xl bg-quaternary border-2 border-quaternary text-white hover:bg-quaternary/10 hover:text-quaternary transition-colors duration-200 disabled:opacity-60"
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
