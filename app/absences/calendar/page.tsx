import AbsencesTabs from "@/components/absence/AbsencesTabs";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/ui/Button";
import IAbsence from "@/interfaces/IAbsence";
import IVolunteer from "@/interfaces/IVolunteer";
import { serverApiData } from "@/helpers/api";

export default async function CalendarPage() {
  const [absences, benevoles] = await Promise.all([
    serverApiData<IAbsence[]>("/api/absences", []),
    serverApiData<IVolunteer[]>("/api/volunteers", []),
  ]);

  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-quaternary">
              Absences
            </h1>
            <div className="flex flex-row flex-wrap gap-2 shrink-0">
              <Button href="/account?tab=actions" variant="secondary" size="sm">
                ← Retour
              </Button>
              <Button href="/absences/create" variant="primary" size="sm">
                Ajouter +
              </Button>
            </div>
          </div>

          <AbsencesTabs absences={absences} benevoles={benevoles} />
        </div>
      </main>
    </div>
  );
}
