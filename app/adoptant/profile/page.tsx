import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/adoptant/LogoutButton";
import ProfileTabs from "@/components/adoptant/ProfileTabs";
import { getAdoptantById } from "@/app/adoptant/update/action";
import { getAdoptionRequestsByAdoptant } from "@/app/adoptant/adoption-request/action";

export default async function AdoptantProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string; requested?: string; tab?: string }>;
}) {
  const cookieStore = await cookies();
  const adoptantId = cookieStore.get("adoptant_id")?.value;
  const userRole = cookieStore.get("user_role")?.value;
  const params = await searchParams;

  if (!adoptantId || userRole !== "adoptant") {
    redirect("/login");
  }

  const [adoptant, adoptionRequests] = await Promise.all([
    getAdoptantById(adoptantId),
    getAdoptionRequestsByAdoptant(adoptantId),
  ]);

  if (!adoptant) redirect("/login");

  const initialTab: "profil" | "demandes" =
    params.tab === "demandes" ? "demandes" : "profil";

  const showBanner =
    params.created === "true" || params.updated === "true" || params.requested === "true";

  const bannerMessage = params.requested === "true"
    ? "Votre demande d'adoption a bien été soumise ! Nous vous contacterons prochainement."
    : params.created === "true"
    ? "Votre compte a bien été créé. Complétez votre profil pour faciliter le traitement de vos demandes."
    : "Vos modifications ont bien été enregistrées.";

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col gap-6">

        {/* Bannière succès */}
        {showBanner && (
          <div className="rounded-2xl bg-green-50 border border-green-200 px-6 py-4 text-sm text-green-800 font-medium">
            {bannerMessage}
          </div>
        )}

        {/* En-tête profil */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {adoptant.firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">
                {adoptant.firstName} {adoptant.name}
              </p>
              <p className="text-sm text-quaternary/60">{adoptant.email}</p>
            </div>
          </div>
          <div className="sm:w-44">
            <LogoutButton />
          </div>
        </div>

        {/* Tabs + contenu */}
        <ProfileTabs
          adoptant={adoptant}
          adoptionRequests={adoptionRequests}
          initialTab={initialTab}
        />
      </main>
    </div>
  );
}
