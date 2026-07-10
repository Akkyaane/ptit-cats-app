"use client";

import { useState } from "react";
import { IAttendance } from "@/interfaces/IAttendance";

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MOIS = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];

export default function AttendanceCalendar({ attendances }: { attendances: IAttendance[] }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  }

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();

  // Lundi = 0, Dimanche = 6
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const absencesByDate: Record<string, IAttendance[]> = {};
  attendances.forEach((a) => {
    const d = a.date.slice(0, 10);
    if (!absencesByDate[d]) absencesByDate[d] = [];
    absencesByDate[d].push(a);
  });

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  function toKey(day: number) {
    const m = String(currentMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${currentYear}-${m}-${d}`;
  }

  const selectedAbsences = selectedDate ? (absencesByDate[selectedDate] ?? []) : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Header navigation */}
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

      {/* Grille calendrier */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 bg-tertiary/10">
          {JOURS.map((j) => (
            <div key={j} className="py-3 text-center text-xs font-bold text-quaternary/70">
              {j}
            </div>
          ))}
        </div>

        {/* Cases */}
        <div className="grid grid-cols-7 divide-x divide-y divide-gray-100">
          {cells.map((day, i) => {
            if (!day) {
              return <div key={`empty-${i}`} className="h-16 bg-gray-50/50" />;
            }

            const key = toKey(day);
            const absences = absencesByDate[key] ?? [];
            const hasAbsences = absences.length > 0;
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();
            const isSelected = selectedDate === key;

            return (
              <button
                key={key}
                onClick={() => setSelectedDate(isSelected ? null : key)}
                className={`h-16 flex flex-col items-center justify-start pt-2 gap-1 transition-colors duration-150 relative
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
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {absences.length} absent{absences.length > 1 ? "s" : ""}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Détail du jour sélectionné */}
      {selectedDate && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="font-bold text-lg mb-4">
            {new Date(selectedDate + "T12:00:00").toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h3>

          {selectedAbsences.length === 0 ? (
            <p className="text-quaternary/60 text-sm">Aucune absence ce jour.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedAbsences.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <div>
                    <p className="font-bold text-sm">
                      {a.volunteer
                        ? `${a.volunteer.firstName} ${a.volunteer.name}`
                        : "Bénévole inconnu"}
                    </p>
                    {a.reason && (
                      <p className="text-xs text-quaternary/60 mt-0.5">
                        Motif : {a.reason}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Absent
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}