import AbsenceCalendar from "@/components/absence/AbsenceCalendar";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import IAbsence from "@/interfaces/IAbsence";
import { getAllBenevoles } from "@/app/volunteers/update/action";

async function getAllAbsences(): Promise<IAbsence[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/absences?populate=volunteer&pagination[limit]=1000`,
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

export default async function CalendarPage() {
  const [absences, benevoles] = await Promise.all([
    getAllAbsences(),
    getAllBenevoles(),
  ]);

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Tableau de présence
            </h1>
            <div className="w-16 h-1 bg-tertiary rounded-full"></div>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href="/absences/create"
              className="px-4 py-2 font-bold rounded-xl bg-tertiary border-2 border-tertiary text-white hover:bg-tertiary/10 hover:text-tertiary transition-colors duration-200 text-sm"
            >
              + Ajouter une absence
            </Link>
          </div>

          <AbsenceCalendar absences={absences} benevoles={benevoles} />

          <div className="flex justify-center">
            <Link
              href="/admin"
              className="font-bold text-primary hover:underline text-sm"
            >
              &larr; Retour au panneau admin
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}