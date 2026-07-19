import UpdateAbsenceForm from "@/components/absence/UpdateAbsenceForm";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import IAbsence from "@/interfaces/IAbsence";

async function getAbsence(documentId: string): Promise<IAbsence | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/absences/${documentId}?populate=volunteer`,
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function UpdateAbsencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const absence = await getAbsence(slug);

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
