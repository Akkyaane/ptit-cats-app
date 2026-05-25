"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCat } from "@/app/cats/update/action";
import { IAnimalRequirement } from "@/interfaces/IAnimalRequirement";

type CatData = {
  documentId: string;
  name: string;
  sex: "Male" | "Female";
  birthDate?: string;
  isDewormed: boolean;
  isVaccinated: boolean;
  isSterilizedOrCastrated: boolean;
  isIdentified: boolean;
  dogAffinity: "Yes" | "No" | "Unknown";
  catAffinity: "Yes" | "No" | "Unknown";
  childAffinity: "Yes" | "No" | "Unknown";
  livingEnvironmentType: "Apartment" | "House" | "Other";
  animal_requirements: IAnimalRequirement[];
};

interface Props {
  cat: CatData;
  animalRequirements: IAnimalRequirement[];
}

export default function UpdateCatForm({ cat, animalRequirements }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await updateCat(cat.documentId, formData);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => router.refresh(), 1500);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 transition-colors duration-200 bg-white";
  const lClass = "text-sm font-bold text-[var(--color-quaternary)]";

  if (success) {
    return (
      <p className="text-sm font-bold text-green-600 bg-green-50 px-4 py-3 rounded-xl text-center">
        Chat mis à jour avec succès !
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <p className="text-sm font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-4 py-3 rounded-xl text-center">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className={lClass}>
          Nom <span className="text-[var(--color-primary)]">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={cat.name}
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="birthDate" className={lClass}>
          Date de naissance
        </label>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          defaultValue={cat.birthDate ?? ""}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sex" className={lClass}>
          Sexe <span className="text-[var(--color-primary)]">*</span>
        </label>
        <select
          id="sex"
          name="sex"
          defaultValue={cat.sex}
          required
          className={inputClass}
        >
          <option value="Male">Mâle</option>
          <option value="Female">Femelle</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["isDewormed", "Déparasité"],
            ["isVaccinated", "Vacciné"],
            ["isSterilizedOrCastrated", "Stérilisé / castré"],
            ["isIdentified", "Identifié"],
          ] as [keyof CatData, string][]
        ).map(([field, label]) => (
          <div key={field} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={field}
              id={`update-${field}`}
              defaultChecked={cat[field] as boolean}
              className="w-4 h-4 accent-[var(--color-primary)]"
            />
            <label htmlFor={`update-${field}`} className={lClass}>
              {label}
            </label>
          </div>
        ))}
      </div>

      {(
        [
          ["dogAffinity", "Entente avec les chiens"],
          ["catAffinity", "Entente avec les chats"],
          ["childAffinity", "Entente avec les enfants"],
        ] as [keyof CatData, string][]
      ).map(([field, label]) => (
        <div key={field} className="flex flex-col gap-1">
          <label htmlFor={`update-${field}`} className={lClass}>
            {label} <span className="text-[var(--color-primary)]">*</span>
          </label>
          <select
            id={`update-${field}`}
            name={field}
            defaultValue={cat[field] as string}
            required
            className={inputClass}
          >
            <option value="Yes">Oui</option>
            <option value="No">Non</option>
            <option value="Unknown">Inconnu</option>
          </select>
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label htmlFor="livingEnvironmentType" className={lClass}>
          Type de lieu de vie <span className="text-[var(--color-primary)]">*</span>
        </label>
        <select
          id="livingEnvironmentType"
          name="livingEnvironmentType"
          defaultValue={cat.livingEnvironmentType}
          required
          className={inputClass}
        >
          <option value="Apartment">Appartement</option>
          <option value="House">Maison</option>
          <option value="Other">Autre</option>
        </select>
      </div>

      {animalRequirements.length > 0 && (
        <div className="flex flex-col gap-2">
          <em className={lClass}>Points clés</em>
          <div className="grid grid-cols-2 gap-2">
            {animalRequirements.map((req) => (
              <div key={req.documentId} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="animal_requirements"
                  id={`req-${req.documentId}`}
                  value={req.documentId}
                  defaultChecked={cat.animal_requirements.some(
                    (r) => r.documentId === req.documentId
                  )}
                  className="w-4 h-4 accent-[var(--color-primary)]"
                />
                <label htmlFor={`req-${req.documentId}`} className={lClass}>
                  {req.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 font-bold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/80 transition-colors duration-200 disabled:opacity-60"
      >
        {loading ? "Enregistrement..." : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
