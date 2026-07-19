"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Benevole = {
  id: number;
  documentId: string;
  lastName: string;
  firstName: string;
};

export default function AddAbsenceForm({ benevoles }: { benevoles: Benevole[] }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    const startDate = formData.get("startDate") as string;
    const endDate = (formData.get("endDate") as string) || startDate;
    const volunteerId = formData.get("volunteerId") as string;

    if (!startDate || !volunteerId) {
      setError("Le bénévole et la date de début sont requis");
      return;
    }
    if (endDate < startDate) {
      setError("La date de fin doit être postérieure ou égale à la date de début");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/absences/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: new Date(`${startDate}T00:00:00.000Z`).toISOString(),
        endDate: new Date(`${endDate}T00:00:00.000Z`).toISOString(),
        volunteer: volunteerId,
      }),
    });
    setLoading(false);

    if (!res.ok) {
      setError("Erreur lors de la création");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/absences/calendar"), 1500);
    }
  }

  if (success) {
    return (
      <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl text-center">
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
          <option value="">-- Sélectionner un bénévole --</option>
          {benevoles.map((b) => (
            <option key={b.documentId} value={b.documentId}>
              {b.firstName} {b.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="startDate" className="text-sm font-bold">
          Date de début
        </label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="endDate" className="text-sm font-bold">
          Date de fin
        </label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          required
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
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
}
