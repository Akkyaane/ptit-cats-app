"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeAdoptantProfile } from "@/app/adoptant/register/profile/action";

export default function AdoptantProfileForm({
  documentId,
}: {
  documentId: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await completeAdoptantProfile(documentId, formData);

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="housingType" className="text-sm font-bold text-[var(--color-quaternary)]">
          Type de logement
        </label>
        <select
          id="housingType"
          name="housingType"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200 bg-white"
        >
          <option value="">-- Choisir --</option>
          <option value="maison">Maison</option>
          <option value="appartement">Appartement</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <em className="text-sm font-bold text-[var(--color-quaternary)]">Avez-vous un jardin ?</em>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-[var(--color-quaternary)] font-bold">
            <input type="radio" name="hasGarden" value="true" className="accent-[var(--color-primary)]" /> Oui
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-[var(--color-quaternary)] font-bold">
            <input type="radio" name="hasGarden" value="false" defaultChecked className="accent-[var(--color-primary)]" /> Non
          </label>
        </div>
      </div>

      {error && (
        <p className="text-sm font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full px-6 py-3 font-bold rounded-xl bg-[var(--color-primary)] border-2 border-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors duration-200"
      >
        Enregistrer mon profil
      </button>
    </form>
  );
}
