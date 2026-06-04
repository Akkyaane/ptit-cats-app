import RegisterAdoptantForm from "@/components/adoptant/RegisterAdoptantForm";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function RegisterAdoptantPage() {
  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">Créer mon compte adoptant</h1>
            <p className="text-sm md:text-base text-quaternary/70 max-w-3xl leading-relaxed">
              Vous pouvez créer votre compte rapidement avec les informations de base, ou continuer directement vers le formulaire complet en plusieurs étapes.
            </p>
            <div className="w-12 h-1 bg-tertiary rounded-full"></div>
          </div>

          <RegisterAdoptantForm />

          <p className="text-center text-sm text-quaternary/70">
            Déjà un compte ?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
