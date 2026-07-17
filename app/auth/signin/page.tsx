import LoginAdopterForm from "@/components/adopter/LoginAdopterForm";
import Navbar from "@/components/Navbar";
import Heading from "@/components/ui/Heading";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  // Valide que le redirect est interne (pas d'open redirect)
  const redirectTo =
    params.redirect?.startsWith("/") ? params.redirect : undefined;

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>

      <main className="layout-header-spacing">
        <div className="container">
          <div className="mx-auto max-w-xl flex flex-col gap-8">
            <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">
              Se connecter
            </Heading>

            <div className="p-6 md:p-8">
              <LoginAdopterForm redirectTo={redirectTo} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
