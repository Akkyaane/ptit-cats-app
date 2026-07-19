import AddAbsenceForm from "@/components/absence/AddAbsenceForm";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { getAllBenevoles } from "@/app/volunteers/update/action";

export default async function AddAbsencePage() {
  const benevoles = await getAllBenevoles();

  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <div className="w-full max-w-md mx-auto flex flex-col gap-6">
          <div className="flex justify-start">
            <Button href="/absences/calendar" variant="secondary" size="sm">
              ← Retour
            </Button>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-6">
            <Heading
              type="h3"
              headingVariant="quaternary"
              underlineVariant="tertiary"
            >
              Ajouter une absence
            </Heading>
            <AddAbsenceForm benevoles={benevoles} />
          </div>
        </div>
      </main>
    </div>
  );
}
