import { redirect } from "next/navigation";
import AddAbsenceForm from "@/components/absence/AddAbsenceForm";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import IVolunteer from "@/interfaces/IVolunteer";
import { serverApiData } from "@/helpers/apiHelper";
import { getVolunteerSession } from "@/helpers/sessionHelper";

export default async function AddAbsencePage() {
  const session = await getVolunteerSession();
  if (!session) redirect("/account");

  const benevoles = await serverApiData<IVolunteer[]>("/api/volunteers", []);

  const selectableBenevoles =
    session.role === "admin"
      ? benevoles
      : benevoles.filter((b) => b.documentId === session.documentId);

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
              Ajouter +
            </Heading>
            <AddAbsenceForm
              benevoles={selectableBenevoles}
              canChooseVolunteer={session.role === "admin"}
              currentVolunteerId={session.documentId}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
