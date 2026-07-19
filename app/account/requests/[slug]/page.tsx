import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import RequestReview from "@/components/account/RequestReview";
import { getAdoptionRequestById } from "@/app/adoption-requests/action";
import { getAdopterById } from "@/app/adopters/update/action";
import {
  householdTypeOptions,
  householdPresenceOptions,
  housingTypeOptions,
  livingEnvironmentOptions,
} from "@/components/adopter/AdopterForm";

const VOLUNTEER_ROLES = ["admin", "manager", "referent"];

type Option = { value: string; label: string };

// Traduit une valeur d'enum Strapi (anglais) en libellé français.
function labelOf(options: Option[], value: unknown) {
  if (value == null || value === "") return null;
  return options.find((o) => o.value === value)?.label ?? String(value);
}

const LISTING_STATUS_LABELS: Record<string, string> = {
  "adoption pending": "En cours",
  "adoption completed": "Adopté",
};

function listingStatusLabel(value: string | null | undefined) {
  if (!value) return null;
  return LISTING_STATUS_LABELS[value] ?? value;
}

function line(label: string, value: string | number | null | undefined) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-bold uppercase tracking-wide text-quaternary/40">
        {label}
      </dt>
      <dd
        className={
          value === null || value === undefined || value === ""
            ? "text-quaternary/40 italic"
            : "font-semibold"
        }
      >
        {value === null || value === undefined || value === ""
          ? "Non renseigné"
          : value}
      </dd>
    </div>
  );
}

export default async function ReviewRequestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const role = cookieStore.get("user_role")?.value;
  const volunteerId = cookieStore.get("volunteer_id")?.value;
  const adopterId = cookieStore.get("adopter_id")?.value;

  if (!role) redirect("/account");

  const request = await getAdoptionRequestById(slug);
  if (!request) redirect("/account?tab=demandes");

  const isVolunteer = VOLUNTEER_ROLES.includes(role) && !!volunteerId;
  const isAdopter = role === "adopter" && !!adopterId;

  // Autorisation :
  //  - bénévole assigné / responsable ayant transféré / admin → accès + action
  //  - adoptant propriétaire de la demande → accès en lecture seule
  let canView = false;
  let canAct = false;
  if (isVolunteer) {
    const isAssignee = request.volunteer?.documentId === volunteerId;
    const isTransferrer = request.transferredBy === volunteerId;
    const isAdmin = role === "admin";
    canView = isAssignee || isTransferrer || isAdmin;
    canAct = isAssignee;
  } else if (isAdopter) {
    canView = request.adopter?.documentId === adopterId;
  }
  if (!canView) redirect("/account?tab=demandes");

  // Profil complet de l'adoptant (la relation n'expose pas tous les champs).
  const adopter = request.adopter?.documentId
    ? await getAdopterById(request.adopter.documentId)
    : null;

  const listing = request.adoption_listing;
  const catNames = (listing?.animals ?? []).map((a) => a.name).join(" & ");

  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <section className="flex flex-col gap-8 max-w-4xl w-full mx-auto">
          <div className="flex justify-start">
            <Button href="/account/requests" variant="secondary" size="sm">
              ← Retour
            </Button>
          </div>

          <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">
            Demande d&apos;adoption{catNames ? ` — ${catNames}` : ""}
          </Heading>

          <RequestReview
            request={request}
            viewerDocumentId={volunteerId ?? ""}
            canAct={canAct}
            readOnly={isAdopter}
          />

          {/* Annonce */}
          <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold">Annonce concernée</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {line("Titre", listing?.title)}
              {line("Chat(s)", catNames)}
              {line("Frais d'adoption", listing?.price ? `${listing.price} €` : null)}
              {line("Statut de l'annonce", listingStatusLabel(listing?.entityStatus))}
            </dl>
            {listing?.documentId && (
              <Link
                href={`/adoption-listings/view/${listing.documentId}`}
                className="text-sm font-bold text-primary hover:underline w-fit"
              >
                Voir l&apos;annonce →
              </Link>
            )}
          </div>

          {/* Adoptant */}
          <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold">Adoptant</h2>
            {adopter ? (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {line("Prénom", adopter.firstName)}
                {line("Nom", adopter.lastName)}
                {line("Email", adopter.email)}
                {line("Téléphone", adopter.phoneNumber)}
                {line(
                  "Adresse",
                  adopter.address
                    ? `${adopter.address}, ${adopter.postalCode} ${adopter.city}`
                    : null,
                )}
                {line("Type de foyer", labelOf(householdTypeOptions, adopter.householdType))}
                {line("Composition du foyer", adopter.householdComposition)}
                {line("Présence au foyer", labelOf(householdPresenceOptions, adopter.householdPresence))}
                {line("Enfants", adopter.hasChildren ? "Oui" : "Non")}
                {line("Type de logement", labelOf(housingTypeOptions, adopter.housingType))}
                {line(
                  "Surface",
                  adopter.housingSurface ? `${adopter.housingSurface} m²` : null,
                )}
                {line("Environnement", labelOf(livingEnvironmentOptions, adopter.livingEnvironment))}
                {line(
                  "Autres animaux",
                  adopter.hasOtherAnimals ? "Oui" : "Non",
                )}
                {line(
                  "Engagement de responsabilité",
                  adopter.hasAcceptedResponsibility ? "Accepté" : "Non accepté",
                )}
              </dl>
            ) : (
              <p className="text-sm text-quaternary/50 italic">
                Informations de l&apos;adoptant indisponibles.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
