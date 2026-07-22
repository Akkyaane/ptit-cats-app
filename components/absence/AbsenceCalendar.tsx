"use client";

import { useState } from "react";
import Link from "next/link";
import IAbsence from "@/interfaces/IAbsence";
import { canManageAbsence } from "@/components/absence/absencePermissions";

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MOIS = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];

type Benevole = {
  id: number;
  documentId: string;
  lastName: string;
  firstName: string;
  role: string;
};

const roleColors: Record<string, string> = {
  admin: "bg-primary/10 text-primary",
  manager: "bg-quaternary/10",
  referent: "bg-tertiary/30",
};

const roleLabels: Record<string, string> = {
  admin: "Administrateur",
  manager: "Responsable",
  referent: "Référent",
};

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function AbsenceCalendar({
  absences: initialAbsences,
  benevoles,
  role,
  currentVolunteerId,
}: {
  absences: IAbsence[];
  benevoles: Benevole[];
  role: string;
  currentVolunteerId: string;
}) {
  const today = new Date();
  const [absences, setAbsences] = useState(initialAbsences);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>(toDateKey(today));
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  async function handleDelete(documentId: string) {
    setDeletingId(documentId);
    setError(null);
    const res = await fetch("/api/absences/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId }),
    });
    setDeletingId(null);

    if (!res.ok) {
      setError("Erreur lors de la suppression");
      return;
    }

    setConfirmingId(null);
    setAbsences((prev) => prev.filter((a) => a.documentId !== documentId));
  }

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();

  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const absencesByDate: Record<string, IAbsence[]> = {};
  absences.forEach((a) => {
    const startKey = String(a.startDate).slice(0, 10);
    const endKey = String(a.endDate ?? a.startDate).slice(0, 10);
    const cursor = new Date(`${startKey}T12:00:00`);
    const end = new Date(`${endKey}T12:00:00`);
    while (cursor <= end) {
      const key = toDateKey(cursor);
      if (!absencesByDate[key]) absencesByDate[key] = [];
      absencesByDate[key].push(a);
      cursor.setDate(cursor.getDate() + 1);
    }
  });

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function toCellKey(day: number) {
    const m = String(currentMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${currentYear}-${m}-${d}`;
  }

  const selectedAbsences = absencesByDate[selectedDate] ?? [];
  const absenceByVolunteer = new Map<string, IAbsence>();
  selectedAbsences.forEach((a) => {
    if (a.volunteer?.documentId) {
      absenceByVolunteer.set(a.volunteer.documentId, a);
    }
  });

  const absents = benevoles.filter((b) => absenceByVolunteer.has(b.documentId));
  const presents = benevoles.filter(
    (b) => !absenceByVolunteer.has(b.documentId)
  );

  const selectedDateObj = new Date(selectedDate + "T12:00:00");

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        <div className="flex flex-col gap-4 w-full lg:w-1/2">

          <div className="flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="px-4 py-2 rounded-xl border-2 border-tertiary font-bold hover:bg-tertiary hover:text-white transition-colors duration-200"
            >
              ←
            </button>
            <h2 className="text-xl font-bold">
              {MOIS[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={nextMonth}
              className="px-4 py-2 rounded-xl border-2 border-tertiary font-bold hover:bg-tertiary hover:text-white transition-colors duration-200"
            >
              →
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-7 bg-tertiary/10">
              {JOURS.map((j) => (
                <div key={j} className="py-3 text-center text-xs font-bold text-quaternary/70">
                  {j}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 divide-x divide-y divide-gray-100">
              {cells.map((day, i) => {
                if (!day) {
                  return <div key={`empty-${i}`} className="h-14 bg-gray-50/50" />;
                }

                const key = toCellKey(day);
                const dayAbsences = absencesByDate[key] ?? [];
                const hasAbsences = dayAbsences.length > 0;
                const isToday = key === toDateKey(today);
                const isSelected = selectedDate === key;

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(key)}
                    className={`h-14 flex flex-col items-center justify-start pt-1 gap-0.5 transition-colors duration-150
                      ${isSelected ? "bg-tertiary/20" : "hover:bg-secondary/60"}
                    `}
                  >
                    <span
                      className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full
                        ${isToday ? "bg-primary text-white" : ""}
                      `}
                    >
                      {day}
                    </span>
                    {hasAbsences && (
                      <span className="text-[10px] font-bold text-primary bg-primary/10 min-w-4 px-1 py-0.5 rounded-full leading-none">
                        {dayAbsences.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h2 className="text-xl font-bold">
            {selectedDateObj.toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h2>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 bg-primary/10 border-b border-primary/10">
              <p className="font-bold text-primary text-sm">
                Absents ({absents.length})
              </p>
            </div>
            {absents.length === 0 ? (
              <p className="px-5 py-4 text-sm text-quaternary/50">
                Aucun absent ce jour.
              </p>
            ) : (
              <div className="divide-y divide-gray-100">
                {absents.map((b) => {
                  const absence = absenceByVolunteer.get(b.documentId);
                  const isConfirming =
                    !!absence && confirmingId === absence.documentId;
                  const isDeleting =
                    !!absence && deletingId === absence.documentId;
                  return (
                    <div
                      key={b.documentId}
                      className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                          {b.firstName.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-bold text-sm">
                          {b.firstName} {b.lastName}
                          {b.documentId === currentVolunteerId && (
                            <span className="ml-1.5 font-normal text-xs text-quaternary/50">
                              (vous)
                            </span>
                          )}
                        </p>
                      </div>

                      {absence &&
                        canManageAbsence(absence, role, currentVolunteerId) &&
                        (isConfirming ? (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleDelete(absence.documentId)}
                              disabled={isDeleting}
                              className="text-xs font-bold text-white bg-primary border-2 border-primary px-3 py-1.5 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-60 whitespace-nowrap"
                            >
                              {isDeleting ? "Suppression…" : "Confirmer"}
                            </button>
                            <button
                              onClick={() => setConfirmingId(null)}
                              disabled={isDeleting}
                              className="text-xs font-bold text-quaternary/60 hover:text-quaternary transition-colors disabled:opacity-60"
                            >
                              Annuler
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <Link
                              href={`/absences/update/${absence.documentId}`}
                              className="text-xs font-bold text-quaternary hover:underline whitespace-nowrap"
                            >
                              Modifier
                            </Link>
                            <button
                              onClick={() => {
                                setError(null);
                                setConfirmingId(absence.documentId);
                              }}
                              className="text-xs font-bold text-primary hover:underline whitespace-nowrap"
                            >
                              Supprimer
                            </button>
                          </div>
                        ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 bg-tertiary/20 border-b border-tertiary/30">
              <p className="font-bold text-quaternary text-sm">
                Présents ({presents.length})
              </p>
            </div>
            {presents.length === 0 ? (
              <p className="px-5 py-4 text-sm text-quaternary/50">
                Aucun bénévole présent ce jour.
              </p>
            ) : (
              <div className="divide-y divide-gray-100">
                {presents.map((b) => (
                  <div key={b.documentId} className="px-5 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-tertiary/30 flex items-center justify-center text-quaternary font-bold text-xs flex-shrink-0">
                        {b.firstName.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-bold text-sm">
                        {b.firstName} {b.lastName}
                        {b.documentId === currentVolunteerId && (
                          <span className="ml-1.5 font-normal text-xs text-quaternary/50">
                            (vous)
                          </span>
                        )}
                      </p>
                    </div>
                    <em className={`not-italic text-xs font-bold px-2 py-1 rounded-full ${roleColors[b.role] ?? "bg-gray-100"}`}>
                      {roleLabels[b.role] ?? b.role}
                    </em>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
