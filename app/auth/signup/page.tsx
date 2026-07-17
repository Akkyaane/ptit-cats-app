import RegisterAdopterForm from "@/components/adopter/RegisterAdoptantForm";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Heading from "@/components/ui/Heading";

export default function RegisterAdopterPage() {
  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>

      <main className="layout-header-spacing">
        <div className="container">
          <div className="mx-auto w-full max-w-3xl flex flex-col gap-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">
                Créer mon compte adopter
              </Heading>
              <p className="text-sm md:text-base text-quaternary/70 max-w-2xl leading-relaxed">
                Renseignez le formulaire en quelques étapes. À la fin, vous pourrez
                soit compléter votre profil, soit accéder directement aux annonces.
              </p>
            </div>

            <div className="border-2 border-tertiary rounded-2xl p-6 md:p-8">
              <RegisterAdopterForm />
            </div>

            <p className="text-center text-sm text-quaternary/70">
              Déjà un compte ?{" "}
              <Link
                href="/auth/signin"
                className="font-bold text-primary hover:underline"
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
