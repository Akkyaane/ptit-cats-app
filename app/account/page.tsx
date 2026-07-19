import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import AccountView from "@/components/account/AccountView";
import { AccountUser } from "@/components/account/types";
import { getAdopterById } from "@/app/adopters/update/action";
import { getBenevoleById } from "@/app/volunteers/update/action";
import { getAdoptionRequestsByAdopter } from "@/app/adoption-requests/action";
import IAdoptionRequest from "@/interfaces/IAdoptionRequest";

const VOLUNTEER_ROLES = ["admin", "manager", "referent"];

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string;
    created?: string;
    updated?: string;
    requested?: string;
  }>;
}) {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("user_role")?.value;
  const adopterId = cookieStore.get("adopter_id")?.value;
  const volunteerId = cookieStore.get("volunteer_id")?.value;
  const params = await searchParams;

  // Résolution de l'utilisateur connecté (adoptant ou bénévole).
  let user: AccountUser | null = null;

  if (userRole === "adopter" && adopterId) {
    const adopter = await getAdopterById(adopterId);
    if (adopter) user = { kind: "adopter", adopter };
  } else if (volunteerId && userRole && VOLUNTEER_ROLES.includes(userRole)) {
    const volunteer = await getBenevoleById(volunteerId);
    if (volunteer) user = { kind: "volunteer", volunteer };
  }

  if (!user) redirect("/auth/signin");

  // L'adoptant n'a qu'une action : ses demandes s'affichent directement dans
  // l'onglet dédié, on charge donc le tableau côté serveur.
  let adopterRequests: IAdoptionRequest[] = [];
  if (user.kind === "adopter" && adopterId) {
    adopterRequests = await getAdoptionRequestsByAdopter(adopterId);
  }

  const initialTab: "actions" | "compte" =
    params.tab === "actions" || params.tab === "demandes" ? "actions" : "compte";

  const bannerMessage =
    params.requested === "true"
      ? "Votre demande d'adoption a bien été soumise ! Nous vous contacterons prochainement."
      : params.created === "true"
        ? "Votre compte a bien été créé. Complétez votre profil pour faciliter le traitement de vos demandes."
        : params.updated === "true"
          ? "Vos modifications ont bien été enregistrées."
          : null;

  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <section className="flex flex-col gap-8">
          <Heading
            type="h2"
            headingVariant="quaternary"
            underlineVariant="tertiary"
          >
            Mon compte
          </Heading>

          <div className="w-full max-w-5xl mx-auto">
            <AccountView
              user={user}
              initialTab={initialTab}
              bannerMessage={bannerMessage}
              adopterRequests={adopterRequests}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
