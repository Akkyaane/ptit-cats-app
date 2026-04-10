import RegisterAdoptantForm from "@/components/adoptant/RegisterAdoptantForm";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function RegisterAdoptantPage() {
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
                Créer mon compte
              </h1>
              <div className="w-12 h-1 bg-[var(--color-tertiary)] rounded-full"></div>
            </div>
            <RegisterAdoptantForm />
            <p className="text-center text-sm text-[var(--color-quaternary)]/70">
              Déjà un compte ?{" "}
              <Link
                href="/login"
                className="font-bold text-[var(--color-primary)] hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
