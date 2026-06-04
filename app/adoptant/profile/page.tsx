import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/adoptant/LogoutButton";
import AdoptantProfileForm from "@/components/adoptant/AdoptantProfileForm";
import { getAdoptantById } from "@/app/adoptant/update/action";

export default async function AdoptantProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string }>;
}) {
  const cookieStore = await cookies();
  const adoptantId = cookieStore.get("adoptant_id")?.value;
  const userRole = cookieStore.get("user_role")?.value;
  const params = await searchParams;

  if (!adoptantId || userRole !== "adoptant") {
    redirect("/login");
  }

  const adoptant = await getAdoptantById(adoptantId);

  if (!adoptant) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
          <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">Mon profil adoptant</h1>
              <p className="text-sm md:text-base text-quaternary/70 leading-relaxed">
                Mettez à jour vos informations pour que l'équipe puisse vous proposer un suivi plus juste et un futur matching plus pertinent.
              </p>
              <div className="w-12 h-1 bg-tertiary rounded-full" />
            </div>

            {(params.created || params.updated) && (
              <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
                {params.created
                  ? "Votre compte a bien été créé. Vous pouvez ajuster vos informations si besoin."
                  : "Vos modifications ont bien été enregistrées."}
              </div>
            )}

            <AdoptantProfileForm adoptant={adoptant} />
          </section>

          <aside className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 flex flex-col gap-5 sticky top-28">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Compte</h2>
              <p className="text-sm text-quaternary/70">
                Gardez vos coordonnées à jour pour faciliter les échanges.
              </p>
            </div>
            <div className="rounded-xl bg-tertiary/10 px-4 py-3 text-sm text-quaternary/80">
              <p className="font-bold text-quaternary">{adoptant.firstName} {adoptant.name}</p>
              <p>{adoptant.email}</p>
            </div>
            <LogoutButton />
          </aside>
        </div>
      </main>
    </div>
  );
}