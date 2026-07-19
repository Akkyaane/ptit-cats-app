import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { serverApiData } from "@/helpers/apiHelper";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import IAdopter from "@/interfaces/IAdopter";
import {
  householdTypeOptions,
  householdPresenceOptions,
  childrenAgeGroupOptions,
  employmentStatusOptions,
  employmentArrangementOptions,
  housingTypeOptions,
  livingEnvironmentOptions,
} from "@/helpers/adopterPayloadHelper";

type Option = { value: string; label: string };

function labelOf(options: Option[], value: unknown) {
  if (value == null || value === "") return "—";
  return options.find((o) => o.value === value)?.label ?? String(value);
}

function yesNo(value: boolean | null | undefined) {
  if (value === true) return "Oui";
  if (value === false) return "Non";
  return "—";
}

function text(value: unknown) {
  if (value == null || value === "") return "—";
  return String(value);
}

function formatDate(value: Date | string | null | undefined) {
  return value ? new Date(value).toLocaleDateString("fr-FR") : "—";
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-quaternary/50 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="font-semibold break-words">{value}</p>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex flex-col gap-4">
      <Heading type="h3" headingVariant="quaternary" underlineVariant="tertiary">
        {title}
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default async function AdopterViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const adopter = await serverApiData<IAdopter | null>(
    `/api/adopters/${slug}`,
    null,
  );

  if (!adopter) notFound();

  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("user_role")?.value === "admin";

  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-quaternary">
              Profil de l&apos;adoptant
            </h1>
            <div className="flex flex-row flex-wrap gap-2 shrink-0">
              <Button href="/account/adopters" variant="secondary" size="sm">
                ← Retour
              </Button>
              <Button
                href={`/adopters/update/${adopter.documentId}`}
                variant="primary"
                size="sm"
              >
                Modifier
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex items-center gap-6">
            <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {adopter.firstName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold break-words">
                {adopter.firstName} {adopter.lastName}
              </h1>
              <p className="text-quaternary/60 break-words">{adopter.email}</p>
            </div>
          </div>

          <InfoCard title="Identité & coordonnées">
            <Field label="Prénom" value={text(adopter.firstName)} />
            <Field label="Nom" value={text(adopter.lastName)} />
            <Field
              label="Date de naissance"
              value={formatDate(adopter.birthDate)}
            />
            <Field label="Téléphone" value={text(adopter.phoneNumber)} />
            <Field label="Email" value={text(adopter.email)} />
            <Field label="Adresse" value={text(adopter.address)} />
            <Field label="Code postal" value={text(adopter.postalCode)} />
            <Field label="Ville" value={text(adopter.city)} />
          </InfoCard>

          <InfoCard title="Situation professionnelle">
            <Field
              label="Statut"
              value={labelOf(employmentStatusOptions, adopter.employmentStatus)}
            />
            <Field
              label="Organisation"
              value={labelOf(
                employmentArrangementOptions,
                adopter.employmentArrangement
              )}
            />
          </InfoCard>

          <InfoCard title="Foyer">
            <Field
              label="Type de foyer"
              value={labelOf(householdTypeOptions, adopter.householdType)}
            />
            <Field
              label="Composition"
              value={text(adopter.householdComposition)}
            />
            <Field label="Enfants" value={yesNo(adopter.hasChildren)} />
            {adopter.hasChildren && (
              <Field
                label="Âge des enfants"
                value={labelOf(
                  childrenAgeGroupOptions,
                  adopter.childrenAgeGroup
                )}
              />
            )}
            <Field
              label="Présence au foyer"
              value={labelOf(
                householdPresenceOptions,
                adopter.householdPresence
              )}
            />
            <Field
              label="Accord du foyer"
              value={yesNo(adopter.householdAgreement)}
            />
            {adopter.householdAgreement === false && (
              <Field
                label="Détails du désaccord"
                value={text(adopter.disagreementDetails)}
              />
            )}
          </InfoCard>

          <InfoCard title="Logement">
            <Field
              label="Type de logement"
              value={labelOf(housingTypeOptions, adopter.housingType)}
            />
            <Field
              label="Surface"
              value={
                adopter.housingSurface ? `${adopter.housingSurface} m²` : "—"
              }
            />
            <Field
              label="Étage"
              value={text(adopter.apartmentFloor)}
            />
            <Field
              label="Fenêtres sécurisées"
              value={yesNo(adopter.areWindowsSecuredOrWillBe)}
            />
            <Field
              label="Balcon / terrasse"
              value={yesNo(adopter.hasBalconyOrTerrace)}
            />
            {adopter.hasBalconyOrTerrace && (
              <Field
                label="Balcon sécurisé"
                value={yesNo(adopter.isBalconySecured)}
              />
            )}
            <Field label="Jardin" value={yesNo(adopter.hasGarden)} />
            {adopter.hasGarden && (
              <>
                <Field
                  label="Surface du jardin"
                  value={
                    adopter.gardenSurface
                      ? `${adopter.gardenSurface} m²`
                      : "—"
                  }
                />
                <Field
                  label="Hauteur de clôture"
                  value={
                    adopter.fenceHeight ? `${adopter.fenceHeight} m` : "—"
                  }
                />
              </>
            )}
            <Field
              label="Environnement"
              value={labelOf(
                livingEnvironmentOptions,
                adopter.livingEnvironment
              )}
            />
            <Field
              label="Route passante à proximité"
              value={yesNo(adopter.isNearBusyRoad)}
            />
            <Field
              label="Sorties extérieures possibles"
              value={yesNo(adopter.animalCanGoOutside)}
            />
          </InfoCard>

          <InfoCard title="Autres animaux & remarques">
            <Field
              label="Possède d'autres animaux"
              value={yesNo(adopter.hasOtherAnimals)}
            />
            {adopter.hasOtherAnimals && (
              <>
                <Field
                  label="Détails"
                  value={text(adopter.otherAnimalsDetails)}
                />
                <Field
                  label="Stérilisés / castrés"
                  value={yesNo(adopter.areOtherAnimalsSterilizedOrCastrated)}
                />
              </>
            )}
            <Field
              label="1ʳᵉ possession d'un animal"
              value={formatDate(adopter.firstAnimalOwnershipDate)}
            />
            <div className="sm:col-span-2">
              <Field label="Remarques" value={text(adopter.remarks)} />
            </div>
          </InfoCard>

          {isAdmin && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex flex-col gap-3">
              <Heading
                type="h3"
                headingVariant="quaternary"
                underlineVariant="tertiary"
              >
                Supprimer le compte
              </Heading>
              <p className="text-sm text-quaternary/70 text-center">
                La suppression du compte de cet adoptant est définitive.
              </p>
              <div className="flex justify-center">
                <Button
                  href={`/adopters/delete/${adopter.documentId}`}
                  variant="primary"
                  size="md"
                >
                  Supprimer le compte
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
