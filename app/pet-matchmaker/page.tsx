import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import MatchmakerWizard from "@/components/matching/MatchmakerWizard";
import {
  deriveHouseholdFromAdopter,
  HouseholdValues,
} from "@/components/matching/MatchmakerForm";
import { getAdopterById } from "@/app/adopters/update/action";
import IAdoptionListing from "@/interfaces/IAdoptionListing";

// Chats candidats : uniquement ceux rattachés à une annonce "adoption pending",
// avec leurs traits de personnalité et besoins populés (nécessaires au scoring).
async function getPendingListings(): Promise<IAdoptionListing[]> {
  const params = new URLSearchParams();
  params.set("filters[entityStatus][$eq]", "adoption pending");
  params.set("populate[media]", "true");
  params.set("populate[animals][populate]", "*");
  params.set("pagination[pageSize]", "100");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-listings?${params.toString()}`,
      {
        cache: "no-store",
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      },
    );
    if (!res.ok) {
      console.error(
        `[pet-matchmaker] getPendingListings: ${res.status} - ${res.statusText}`,
      );
      return [];
    }
    const data = await res.json();
    return data.data ?? [];
  } catch (err) {
    console.error(`[pet-matchmaker] getPendingListings: ${err}`);
    return [];
  }
}

async function getPersonalityTraits(): Promise<
  { documentId: string; label: string }[]
> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/animal-personality-traits?sort=label:asc&pagination[pageSize]=100`,
      {
        cache: "no-store",
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data ?? []).map(
      (t: { documentId: string; label: string }) => ({
        documentId: t.documentId,
        label: t.label,
      }),
    );
  } catch {
    return [];
  }
}

export default async function PetMatchmakerPage() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("user_role")?.value;
  const adopterId = cookieStore.get("adopter_id")?.value;
  const volunteerId = cookieStore.get("volunteer_id")?.value;

  if (volunteerId) redirect("/");

  const [listings, traits] = await Promise.all([
    getPendingListings(),
    getPersonalityTraits(),
  ]);

  let prefill: HouseholdValues | null = null;
  const isAuthenticated = userRole === "adopter" && Boolean(adopterId);
  if (isAuthenticated && adopterId) {
    const adopter = await getAdopterById(adopterId);
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
