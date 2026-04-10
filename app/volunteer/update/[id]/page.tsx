import { getBenevoleById } from "@/app/volunteer/update/action";
import UpdateVolunteerForm from "@/components/volunteer/UpdateVolunteerForm";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";

type Benevole = {
  id: number;
  documentId: string;
  name: string;
  firstName: string;
  email: string;
  role: "Admin" | "Référent" | "Responsable-adoption";
};

export default async function UpdateVolunteerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const benevole: Benevole = await getBenevoleById(id);

  if (!benevole) return notFound();

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      <header className="bg-[var(--color-tertiary)]">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-quaternary)]">
                Modifier le bénévole
              </h1>
              <div className="w-12 h-1 bg-[var(--color-tertiary)] rounded-full"></div>
            </div>
            <UpdateVolunteerForm benevole={benevole} />
            <Link
              href={`/volunteer/view/${benevole.documentId}`}
              className="text-center font-bold text-[var(--color-primary)] hover:underline text-sm"
            >
              &larr; Retour au profil
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}