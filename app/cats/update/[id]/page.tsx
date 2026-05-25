import { getCatById, getAllAnimalRequirements } from "@/app/cats/update/action";
import UpdateCatForm from "@/components/adoptionPost/UpdateCatForm";
import DeleteCatButton from "@/components/adoptionPost/DeleteCatButton";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UpdateCatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [cat, animalRequirements] = await Promise.all([
    getCatById(id),
    getAllAnimalRequirements(),
  ]);

  if (!cat) return notFound();

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      <header className="bg-[var(--color-tertiary)]">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-quaternary)]">
                Modifier la fiche de {cat.name}
              </h1>
              <div className="w-12 h-1 bg-[var(--color-tertiary)] rounded-full"></div>
            </div>

            <UpdateCatForm cat={cat} animalRequirements={animalRequirements} />

            <div className="border-t border-gray-100 pt-4">
              <DeleteCatButton documentId={cat.documentId} />
            </div>

            <Link
              href="/adoption-posts"
              className="text-center font-bold text-[var(--color-primary)] hover:underline text-sm"
            >
              &larr; Retour aux annonces
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
