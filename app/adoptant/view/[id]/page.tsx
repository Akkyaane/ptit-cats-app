import { getAdoptantById } from "@/app/adoptant/update/action";
import Navbar from "@/components/Navbar";
import ToastSuccess from "@/components/adoptant/ToastSuccess";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AdoptantProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ updated?: string }>;
}) {
  const { id } = await params;
  const { updated } = await searchParams;
  const adoptant = await getAdoptantById(id);

  if (!adoptant) return notFound();

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      {updated === "true" && (
        <ToastSuccess message="Profil mis à jour avec succès !" />
      )}
      <header className="bg-[var(--color-tertiary)]">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="size-16 rounded-full bg-[var(--color-tertiary)] flex items-center justify-center text-2xl font-bold text-white">
                {adoptant.firstName.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-quaternary)]">
                {adoptant.firstName} {adoptant.name}
              </h1>
              <div className="w-12 h-1 bg-[var(--color-tertiary)] rounded-full"></div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[var(--color-quaternary)]/50 text-sm font-bold w-24">Email</span>
                <span className="text-[var(--color-quaternary)] font-bold">{adoptant.email}</span>
              </div>
              {adoptant.housingType && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[var(--color-quaternary)]/50 text-sm font-bold w-24">Logement</span>
                  <span className="text-[var(--color-quaternary)] font-bold capitalize">{adoptant.housingType}</span>
                </div>
              )}
              {adoptant.hasGarden !== null && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[var(--color-quaternary)]/50 text-sm font-bold w-24">Jardin</span>
                  <span className="text-[var(--color-quaternary)] font-bold">{adoptant.hasGarden ? "Oui" : "Non"}</span>
                </div>
              )}
            </div>

            <Link
              href={`/adoptant/update/${adoptant.documentId}`}
              className="w-full px-6 py-3 font-bold rounded-xl bg-[var(--color-quaternary)] border-2 border-[var(--color-quaternary)] text-white hover:bg-[var(--color-quaternary)]/10 hover:text-[var(--color-quaternary)] transition-colors duration-200 text-center"
            >
              Modifier mon profil
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
