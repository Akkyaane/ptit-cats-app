"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateAttendance } from "@/app/attendance/action";
import { IAttendance } from "@/interfaces/IAttendance";

export default function UpdateAttendanceForm({ attendance }: { attendance: IAttendance }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await updateAttendance(formData);
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
        Modification enregistrée ! Redirection...
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <input type="hidden" name="documentId" value={attendance.documentId} />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold">Bénévole</label>
        <p className="px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-quaternary/70">
          {attendance.volunteer
            ? `${attendance.volunteer.firstName} ${attendance.volunteer.name}`
            : "—"}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm font-bold">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={attendance.date}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-bold">
          Statut
        </label>
        <select
          id="status"
          name="status"
          defaultValue={attendance.status}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200 bg-white"
        >
          <option value="present">Présent</option>
          <option value="absent">Absent</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="reason" className="text-sm font-bold">
          Motif <span className="text-quaternary/50 font-normal">(optionnel)</span>
        </label>
        <input
          id="reason"
          name="reason"
          type="text"
          defaultValue={attendance.reason ?? ""}
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