import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import MatchmakerWizard from "@/components/matching/MatchmakerWizard";
import {
  deriveHouseholdFromAdopter,
  HouseholdValues,
} from "@/components/matching/matchmakerConfig";
import { serverApiData } from "@/helpers/api";
import IAdopter from "@/interfaces/IAdopter";
import IAdoptionListing from "@/interfaces/IAdoptionListing";

export default async function PetMatchmakerPage() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("user_role")?.value;
  const adopterId = cookieStore.get("adopter_id")?.value;
  const volunteerId = cookieStore.get("volunteer_id")?.value;

  if (volunteerId) redirect("/");

  const [listings, traits] = await Promise.all([
    serverApiData<IAdoptionListing[]>(
      `/api/adoption-listings?status=${encodeURIComponent("adoption pending")}&deep=true`,
      [],
    ),
    serverApiData<{ documentId: string; label: string }[]>(
      "/api/animal-personality-traits",
      [],
    ),
  ]);

  let prefill: HouseholdValues | null = null;
  const isAuthenticated = userRole === "adopter" && Boolean(adopterId);
  if (isAuthenticated && adopterId) {
    const adopter = await serverApiData<IAdopter | null>(
      `/api/adopters/${adopterId}`,
      null,
    );
    if (adopter) prefill = deriveHouseholdFromAdopter(adopter);
  }

  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <section className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
          <div className="flex flex-col gap-3">
            <Heading
              type="h2"
              headingVariant="quaternary"
              underlineVariant="tertiary"
            >
              Trouver mon compagnon idéal
            </Heading>
            <p className="text-quaternary/70">
              Veuillez remplir le formulaire ci-dessous en nous indiquant votre
              situation et vos préférences. Nous comparerons vos réponses aux
              profils de nos compagnons afin de vous proposer les chats qui vous
              correspondent le mieux.
            </p>
            <p className="text-quaternary/70">
              Ces informations ne sont pas conservées : elles servent uniquement
              à calculer votre correspondance pendant ce test.
            </p>
          </div>

          <div className="w-full">
            <MatchmakerWizard
              isAuthenticated={isAuthenticated && Boolean(prefill)}
              prefill={prefill}
              listings={listings}
              traits={traits}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
