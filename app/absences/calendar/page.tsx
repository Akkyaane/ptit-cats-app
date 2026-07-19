import AbsencesTabs from "@/components/absence/AbsencesTabs";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/ui/Button";
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
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
          {/* Toolbar : titre à gauche, actions (retour + ajout) à droite */}
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
