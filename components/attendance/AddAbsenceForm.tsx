"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAbsence } from "@/app/attendance/action";

type Benevole = {
  id: number;
  documentId: string;
  name: string;
  firstName: string;
};

export default function AddAbsenceForm({ benevoles }: { benevoles: Benevole[] }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await createAbsence(formData);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/attendance"), 1500);
    }
  }

  if (success) {
    return (
      <p className="text-sm font-bold text-green-600 bg-green-50 px-4 py-3 rounded-xl text-center">
        Absence ajoutée avec succès ! Redirection...
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="volunteerId" className="text-sm font-bold">
          Bénévole
        </label>
        <select
          id="volunteerId"
          name="volunteerId"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200 bg-white"
        >
          <option value="">-- Choisir un bénévole --</option>
          {benevoles.map((b) => (
            <option key={b.documentId} value={b.documentId}>
              {b.firstName} {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm font-bold">
          Date d'absence
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="reason" className="text-sm font-bold">
          Motif <span className="text-quaternary/50 font-normal">(optionnel)</span>
        </label>
        <input
          id="reason"
          name="reason"
          type="text"
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

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
        {loading ? "Enregistrement..." : "Ajouter l'absence"}
      </button>
    </form>
  );
}