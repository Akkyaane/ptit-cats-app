"use client";

import { useState } from "react";
import AbsenceCalendar from "@/components/absence/AbsenceCalendar";
import AbsencesManager from "@/components/account/AbsencesManager";
import IAbsence from "@/interfaces/IAbsence";

type Benevoles = React.ComponentProps<typeof AbsenceCalendar>["benevoles"];

export default function AbsencesTabs({
  absences,
  benevoles,
  role,
  currentVolunteerId,
}: {
  absences: IAbsence[];
  benevoles: Benevoles;
  role: string;
  currentVolunteerId: string;
}) {
  const [tab, setTab] = useState<"calendrier" | "tableau">("calendrier");

  return (
    <div className="flex flex-col gap-6">

      <div className="flex gap-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 w-fit mx-auto">
        {(["calendrier", "tableau"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors duration-200 ${
              tab === t
                ? "bg-primary text-white shadow-sm"
                : "text-quaternary/70 hover:text-quaternary hover:bg-gray-50"
            }`}
          >
            {t === "calendrier" ? "Calendrier" : "Tableau"}
          </button>
        ))}
      </div>

      {tab === "calendrier" ? (
        <AbsenceCalendar
          absences={absences}
          benevoles={benevoles}
          role={role}
          currentVolunteerId={currentVolunteerId}
        />
      ) : (
        <AbsencesManager
          absences={absences}
          role={role}
          currentVolunteerId={currentVolunteerId}
        />
      )}
    </div>
  );
}
