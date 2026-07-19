"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import IAbsence from "@/interfaces/IAbsence";

function toDateInput(value: Date | string | null | undefined) {
  return value ? String(value).slice(0, 10) : "";
}

export default function UpdateAbsenceForm({ absence }: { absence: IAbsence }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    const documentId = formData.get("documentId") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = (formData.get("endDate") as string) || startDate;

    if (!documentId || !startDate) {
      setError("Champs requis manquants");
      return;
    }
    if (endDate < startDate) {
      setError("La date de fin doit être postérieure ou égale à la date de début");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/absences/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentId,
        startDate: new Date(`${startDate}T00:00:00.000Z`).toISOString(),
        endDate: new Date(`${endDate}T00:00:00.000Z`).toISOString(),
      }),
    });
    setLoading(false);

    if (!res.ok) {
      setError("Erreur lors de la modification");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/absences/calendar"), 1500);
    }
  }

  if (success) {
    return (
      <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl text-center">
        Modification enregistrée ! Redirection...
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <input type="hidden" name="documentId" value={absence.documentId} />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold">Bénévole</label>
        <p className="px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-quaternary/70">
          {absence.volunteer
            ? `${absence.volunteer.firstName} ${absence.volunteer.lastName}`
            : "—"}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="startDate" className="text-sm font-bold">
          Date de début
        </label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          defaultValue={toDateInput(absence.startDate)}
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
          defaultValue={toDateInput(absence.endDate)}
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
        {loading ? "Modification..." : "Enregistrer"}
      </button>
    </form>
  );
}
