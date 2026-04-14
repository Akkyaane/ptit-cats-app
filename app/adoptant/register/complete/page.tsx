import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function RegisterCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      <header className="bg-[var(--color-tertiary)]">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-quaternary)]">
                Compte créé avec succès !
              </h1>
              <div className="w-12 h-1 bg-[var(--color-tertiary)] rounded-full"></div>
            </div>
            <p className="text-[var(--color-quaternary)]/80 leading-relaxed">
              Voulez-vous compléter votre profil pour que nous puissions vous
              trouver le chat parfait ?
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href={`/adoptant/register/profile?id=${id}`}
                className="w-full px-6 py-3 font-bold rounded-xl bg-[var(--color-quaternary)] border-2 border-[var(--color-quaternary)] text-white hover:bg-[var(--color-quaternary)]/10 hover:text-[var(--color-quaternary)] transition-colors duration-200 text-center"
              >
                Oui, compléter mon profil
              </Link>
              <Link
                href="/"
                className="w-full px-6 py-3 font-bold rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)]/70 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200 text-center"
              >
                Non, continuer
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
