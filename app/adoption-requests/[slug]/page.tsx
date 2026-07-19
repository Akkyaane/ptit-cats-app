import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { getAdopterById } from "@/app/adopters/update/action";
import { getAdoptionRequestsByAdopter } from "@/app/adoption-requests/action";
import SubmitAdoptionRequestButton from "@/components/adopter/SubmitAdoptionRequestButton";
import IAdopter from "@/interfaces/IAdopter";
import IAdoptionListing from "@/interfaces/IAdoptionListing";

// Champs requis pour soumettre une demande
type RequiredField = { key: keyof IAdopter; label: string };

const REQUIRED_FIELDS: RequiredField[] = [
  { key: "birthDate", label: "Date de naissance" },
  { key: "phoneNumber", label: "Téléphone" },
  { key: "address", label: "Adresse" },
  { key: "postalCode", label: "Code postal" },
  { key: "city", label: "Ville" },
  { key: "householdComposition", label: "Composition du foyer" },
  { key: "employmentStatus", label: "Situation professionnelle" },
  { key: "housingType", label: "Type de logement" },
  { key: "housingSurface", label: "Surface du logement" },
  { key: "livingEnvironment", label: "Environnement de vie" },
  { key: "isNearBusyRoad", label: "Proximité route passante" },
  { key: "hasGarden", label: "Présence d'un jardin" },
];

async function getCatListing(documentId: string): Promise<IAdoptionListing | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/adoption-listings/${documentId}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function AdoptionRequestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Auth
  const cookieStore = await cookies();
  const adopterId = cookieStore.get("adopter_id")?.value;
  const userRole = cookieStore.get("user_role")?.value;

  if (!adopterId || userRole !== "adopter") {
    redirect(`/auth/signin?redirect=/adoption-requests/${slug}`);
  }

  // Fetch data
  const [listing, adopter, existingRequests] = await Promise.all([
    getCatListing(slug),
    getAdopterById(adopterId),
    getAdoptionRequestsByAdopter(adopterId),
  ]);

  if (!listing || !adopter) redirect("/adoption-listings");

  // Vérifie doublon
  const alreadyRequested = existingRequests.some(
    (r) => r.adoption_listing?.documentId === slug
  );

  // Champs manquants
  const missingFields = REQUIRED_FIELDS.filter(
    (f) => !adopter[f.key] && adopter[f.key] !== false
  );
  const responsibilityMissing = !adopter.hasAcceptedResponsibility;
  const canSubmit = missingFields.length === 0 && !responsibilityMissing;

  const catNames = listing.animals.map((a: { name: any; }) => a.name).join(" & ");
  const firstMedia = listing.media?.[0];
  const imageUrl = firstMedia
    ? firstMedia.url.startsWith("http")
      ? firstMedia.url
      : `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${firstMedia.url}`
    : null;

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">

          {/* Fil d'Ariane */}
          <Link
            href={`/adoption-listings/view/${slug}`}
            className="text-sm font-bold text-quaternary/60 hover:text-quaternary transition-colors duration-200 w-fit"
          >
            ← Retour à la fiche de {catNames}
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold">Demande d'adoption</h1>
            <div className="w-12 h-1 bg-tertiary rounded-full" />
          </div>

          {/* Déjà demandé */}
          {alreadyRequested && (
            <div className="rounded-2xl bg-yellow-50 border border-yellow-200 px-6 py-5 flex flex-col gap-2">
              <p className="font-bold text-yellow-800">
                Vous avez déjà soumis une demande pour {catNames}.
              </p>
              <p className="text-sm text-yellow-700">
                Vous pouvez suivre son statut dans votre profil.
              </p>
              <Link
                href="/account?tab=demandes"
                className="text-sm font-bold text-yellow-800 underline hover:no-underline w-fit mt-1"
              >
                Voir mes demandes →
              </Link>
            </div>
          )}

          {!alreadyRequested && (
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 items-start">

              {/* Carte du chat */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
                {imageUrl && (
                  <div className="relative h-52 w-full">
                    <Image
                      src={imageUrl}
                      alt={catNames}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col gap-3">
                  <div>
                    <p className="font-bold text-xl">{catNames}</p>
                    <p className="text-sm text-quaternary/60 mt-0.5">{listing.title}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-primary">{listing.price}</span>
                    <span className="text-lg font-bold text-primary/70">€</span>
                    <span className="text-sm text-quaternary/50 ml-1">de frais</span>
                  </div>
                </div>
              </div>

              {/* Panel droit */}
              <div className="flex flex-col gap-5">

                {/* Checklist profil */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
                  <div>
                    <h2 className="text-lg font-bold">Vérification de votre profil</h2>
                    <p className="text-sm text-quaternary/60 mt-1">
                      Ces informations seront transmises à l'équipe lors de votre demande.
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {REQUIRED_FIELDS.map((f) => {
                      const filled = !!adopter[f.key] || adopter[f.key] === false;
                      return (
                        <li key={f.key} className="flex items-center gap-3 text-sm">
                          <span
                            className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold flex-shrink-0 ${
                              filled
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {filled ? "✓" : "✗"}
                          </span>
                          <span className={filled ? "text-gray-700" : "text-red-600 font-semibold"}>
                            {f.label}
                            {!filled && " — manquant"}
                          </span>
                        </li>
                      );
                    })}
                    {/* Engagement */}
                    <li className="flex items-center gap-3 text-sm">
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold flex-shrink-0 ${
                          adopter.hasAcceptedResponsibility
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {adopter.hasAcceptedResponsibility ? "✓" : "✗"}
                      </span>
                      <span
                        className={
                          adopter.hasAcceptedResponsibility
                            ? "text-gray-700"
                            : "text-red-600 font-semibold"
                        }
                      >
                        Engagement de responsabilité accepté
                        {!adopter.hasAcceptedResponsibility && " — manquant"}
                      </span>
                    </li>
                  </ul>

                  {!canSubmit && (
                    <div className="rounded-xl bg-orange-50 border border-orange-200 px-4 py-3 text-sm text-orange-800">
                      <p className="font-bold mb-1">Profil incomplet</p>
                      <p>
                        Complétez les champs manquants dans votre profil avant de soumettre
                        votre demande.
                      </p>
                      <Link
                        href="/account?tab=compte"
                        className="inline-block mt-2 font-bold underline hover:no-underline"
                      >
                        Compléter mon profil →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Récap adopter */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
                  <h2 className="text-lg font-bold">Vos coordonnées</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                      { label: "Prénom", value: adopter.firstName },
                      { label: "Nom", value: adopter.lastName },
                      { label: "Email", value: adopter.email },
                      { label: "Téléphone", value: adopter.phoneNumber },
                      { label: "Adresse", value: adopter.address },
                      { label: "Ville", value: adopter.city ? `${adopter.postalCode} ${adopter.city}` : null },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs font-bold text-quaternary/40 uppercase tracking-wide mb-0.5">
                          {label}
                        </p>
                        <p className={value ? "font-semibold" : "text-quaternary/40 italic"}>
                          {value ?? "Non renseigné"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bouton de soumission */}
                <SubmitAdoptionRequestButton
                  adopterDocumentId={adopterId}
                  listingDocumentId={slug}
                  disabled={!canSubmit}
                />

                {!canSubmit && (
                  <p className="text-xs text-center text-quaternary/50">
                    Le bouton sera activé une fois tous les champs obligatoires renseignés.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
