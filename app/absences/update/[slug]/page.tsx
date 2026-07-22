import { redirect } from "next/navigation";
import UpdateAbsenceForm from "@/components/absence/UpdateAbsenceForm";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import IAbsence from "@/interfaces/IAbsence";
import { serverApiData } from "@/helpers/apiHelper";
import { getVolunteerSession } from "@/helpers/sessionHelper";
import { canManageAbsence } from "@/components/absence/absencePermissions";

export default async function UpdateAbsencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getVolunteerSession();
  if (!session) redirect("/account");

  const { slug } = await params;
  const absence = await serverApiData<IAbsence | null>(
    `/api/absences/${slug}`,
    null,
  );

  if (!absence) {
    return (
      <div className="layout-header-spacing">
        <main className="container">
          <p className="text-center text-quaternary/60 py-16">
            Entrée introuvable.
          </p>
        </main>
      </div>
    );
  }

  if (!canManageAbsence(absence, session.role, session.documentId)) {
    redirect("/absences/calendar");
  }

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
              Modifier l&apos;absence
            </Heading>
            <UpdateAbsenceForm absence={absence} />
          </div>
        </div>
      </main>
    </div>
  );
}
