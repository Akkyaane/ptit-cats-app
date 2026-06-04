import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function RegisterCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  await searchParams;

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold ">
                Compte créé avec succès !
              </h1>
              <div className="w-12 h-1 bg-tertiary rounded-full"></div>
            </div>
            <p className="text-quaternary/80 leading-relaxed">
              Souhaitez-vous compléter votre profil pour faciliter la démarche d'adoption ?
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/adoptant/profile"
                className="w-full px-6 py-3 font-bold rounded-xl bg-quaternary border-2 border-quaternary text-white hover:bg-quaternary/10 hover:text-quaternary transition-colors duration-200 text-center"
              >
                Oui, ouvrir mon profil
              </Link>
              <Link
                href="/"
                className="w-full px-6 py-3 font-bold rounded-xl border-2 border-tertiary text-quaternary/70 hover:border-primary hover:text-primary transition-colors duration-200 text-center"
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
