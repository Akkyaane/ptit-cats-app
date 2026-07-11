import { cookies } from "next/headers";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryWithLightbox from "@/components/adoptionListing/GalleryWithLightbox";
import calculateAge from "@/helpers/dateHelper";
import IAdoptionListing from "@/interfaces/IAdoptionListing";
import Heading from "@/components/ui/Heading";

async function getOne(documentId: string): Promise<IAdoptionListing> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/adoption-listings/${documentId}`,
    );

    if (!res.ok) {
      throw new Error(
        `[adoption-listings] getOne: ${res.status} - ${res.statusText} - ${await res.text()}`,
      );
    }

    const data = await res.json();

    return data.data;
  } catch (err) {
    throw new Error(`[adoption-listings] getOne: ${err}`);
  }
}

export default async function displayOne(params: { params: { slug: string } }) {
  const param = await params.params;
  const documentId = param.slug;
  const adoptionListing = await getOne(documentId);

  // Détermine le comportement du bouton "Je suis intéressé·e"
  const cookieStore = await cookies();
  const adopterId = cookieStore.get("adopter_id")?.value;
  const volunteerId = cookieStore.get("volunteer_id")?.value;
  const userRole = cookieStore.get("user_role")?.value;
  const isAdopter = Boolean(adopterId && userRole === "adopter");
  const isVolunteerOrAdmin = Boolean(volunteerId || (userRole && userRole !== "adopter"));
  const interestHref = isAdopter
    ? `/adopter/adoption-request/${documentId}`
    : `/login?redirect=/adopter/adoption-request/${documentId}`;

  const birthDates: (string | null)[] = [];
  const ages: (string | null)[] = [];

  adoptionListing.animals.forEach((animal) => {
    (birthDates.push(
      animal.birthDate
        ? new Date(animal.birthDate).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : null,
    ),
      ages.push(
        animal.birthDate ? calculateAge(new Date(animal.birthDate)) : null,
      ));
  });

  const sexLabel: Record<string, string> = { male: "Mâle", female: "Femelle" };

  const care = [
    { key: "isDewormed", value: "Déparasité·e" },
    { key: "isVaccinated", value: "Vacciné·e" },
    { key: "isSterilizedOrCastrated", value: "Stérilisé·e / Castré·e" },
    { key: "isIdentified", value: "Identifié·e" },
  ];

  const affinityLabel: Record<string, string> = {
    yes: "Oui",
    no: "Non",
    unknown: "Inconnu",
  };

  const envLabel: Record<string, string> = {
    apartment: "Appartement",
    house: "Maison",
    other: "Autre",
  };

  const allRequirements = Array.from(
    new Map(
      adoptionListing.animals
        .flatMap((a) => a.animal_requirements ?? [])
        .filter((r) => r !== undefined)
        .map((r) => [r.label, r]),
    ).values(),
  );

  return (
    <>
      <header className="bg-tertiary h-28" />

      <main className="flex flex-col gap-12 md:gap-16 lg:gap-24">
        <Breadcrumb />
        <section className="container flex flex-col gap-6 py-8 md:py-12">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {adoptionListing.animals
                    .map((animal) => animal.name)
                    .join(" & ")}
                </h1>
                {adoptionListing.isDuo && (
                  <span className="text-xs font-bold bg-primary text-secondary px-3 py-1 rounded-xl shadow-sm">
                    Duo
                  </span>
                )}
              </div>
              {adoptionListing.slogan && (
                <p className="text-base md:text-lg text-quaternary/80">
                  {adoptionListing.slogan}
                </p>
              )}
            </div>

            {/* Top action buttons – right side */}
            <div className="flex flex-row flex-wrap gap-2 shrink-0">
              <Button href="/adoption-listings" variant="secondary" size="sm">
                ← Retour
              </Button>
              <Button
                href={`/adoption-listings/update/${adoptionListing.documentId}`}
                variant="primary"
                size="sm"
              >
                Modifier
              </Button>
              <Button
                href={`/adoption-listings/delete/${adoptionListing.documentId}`}
                variant="primary"
                size="sm"
              >
                Supprimer
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_520px] gap-6 lg:gap-10 items-start">
            <GalleryWithLightbox
              media={adoptionListing.media}
              title={adoptionListing.title}
            />

            <aside className="flex flex-col gap-0">
              <div className="py-5 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-quaternary/50 mb-3">
                  Informations
                </p>
                <div className="flex flex-col gap-3">
                  {adoptionListing.animals.map((animal) => {
                    const idx = adoptionListing.animals.indexOf(animal);
                    return (
                      <div key={animal.name} className="flex flex-col gap-0.5">
                        <span className="font-bold text-sm text-quaternary">
                          {animal.name}
                        </span>
                        <span className="text-sm text-quaternary/70">
                          {sexLabel[animal.sex]}
                          {birthDates[idx] && ` · ${birthDates[idx]}`}
                          {ages[idx] && ` (${ages[idx]})`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="py-5 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-quaternary/50 mb-3">
                  Soins effectués
                </p>
                <ul className="flex flex-col gap-2">
                  {care.map(({ key, value }) => {
                    const allDone = adoptionListing.animals.every(
                      (a) => a[key as keyof typeof a],
                    );
                    return (
                      <li key={key} className="flex items-center gap-2 text-sm">
                        <span
                          className={`inline-flex items-center justify-center w-4 h-4 rounded text-[10px] font-bold flex-shrink-0 ${
                            allDone
                              ? "bg-primary/10 text-primary"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {allDone ? "✓" : "✗"}
                        </span>
                        <span
                          className={
                            allDone
                              ? "text-gray-700"
                              : "text-gray-400 line-through"
                          }
                        >
                          {value}(s)
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {allRequirements && allRequirements.length > 0 && (
                <div className="py-5 border-b border-gray-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-quaternary/50 mb-3">
                    Conditions d&apos;adoption
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {allRequirements.map(
                      (req) =>
                        req && (
                          <li
                            key={req.documentId}
                            className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-xl"
                          >
                            {req.label}
                          </li>
                        ),
                    )}
                  </ul>
                </div>
              )}

              <div className="py-5 border-b border-gray-100 flex flex-col gap-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-quaternary/50">
                  Frais d&apos;adoption
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-primary">
                    {adoptionListing.price}
                  </span>
                  <span className="text-xl font-bold text-primary/70">€</span>
                </div>
              </div>

              <div className="pt-5">
                {isVolunteerOrAdmin ? (
                  <p className="text-sm text-quaternary/50 italic text-center">
                    Cette fonctionnalité est réservée aux adopters.
                  </p>
                ) : (
                  <Button href={interestHref} variant="primary" size="lg">
                    Je suis intéressé·e
                  </Button>
                )}
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-quaternary py-16 md:py-24">
          <div className="container flex flex-col gap-12 items-center text-center">
            <Heading type="h2" headingVariant="secondary" underlineVariant="tertiary">
              Quelques mots sur{" "}
              {adoptionListing.animals.map((animal) => animal.name).join(" & ")}
            </Heading>
            <div className="flex flex-col gap-4 text-left text-secondary">
              {adoptionListing.longDescription
                .split("\n\n")
                .map((content, i) => (
                  <p key={i} className="leading-loose max-w-5xl">
                    {content}
                  </p>
                ))}
            </div>
          </div>
        </section>

        <section className="container py-16 md:py-24 flex flex-col gap-12">
          <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">
            {adoptionListing.animals.length > 1
              ? "Profil des compagnons"
              : "Profil du compagnon"}
          </Heading>
          <div
            className={`${adoptionListing.animals.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid grid-cols-1 max-w-xl mx-auto w-full"}`}
          >
            {adoptionListing.animals.map((animal) => {
              const idx = adoptionListing.animals.indexOf(animal);
              return (
                <div
                  key={animal.name}
                  className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="px-6 py-5 bg-gradient-to-r from-primary/5 to-tertiary/20 border-b border-gray-100 flex items-center gap-3 flex-wrap">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-lg font-bold tracking-tight text-quaternary">
                        {animal.name}
                      </span>
                      <span className="text-sm text-quaternary/70">
                        {sexLabel[animal.sex]}
                        {birthDates[idx] && ` · ${birthDates[idx]}`}
                        {ages[idx] && ` (${ages[idx]})`}
                      </span>
                    </div>
                    {animal.isAtypical && (
                      <span className="ml-auto text-xs font-semibold bg-primary text-secondary px-3 py-1 rounded-xl shadow-sm">
                        Atypique
                      </span>
                    )}
                  </div>

                  <div className="px-6 py-5 flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-x-6 divide-x divide-gray-100">
                      <div className="flex flex-col gap-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-quaternary/50 mb-1">
                          Soins
                        </p>
                        {care.map(({ key, value }) => (
                          <div
                            key={key}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span
                              className={`inline-flex items-center justify-center w-4 h-4 rounded text-[10px] font-bold flex-shrink-0 ${
                                animal[key as keyof typeof animal]
                                  ? "bg-primary/10 text-primary"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {animal[key as keyof typeof animal] ? "✓" : "✗"}
                            </span>
                            <span
                              className={
                                animal[key as keyof typeof animal]
                                  ? "text-gray-700"
                                  : "text-gray-400 line-through"
                              }
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2.5 pl-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-quaternary/50 mb-1">
                          Affinités
                        </p>
                        {(
                          [
                            { label: "Chiens", key: animal.dogAffinity },
                            { label: "Chats", key: animal.catAffinity },
                            { label: "Enfants", key: animal.childAffinity },
                          ] as { label: string; key: string }[]
                        ).map(({ label, key }) => (
                          <div
                            key={label}
                            className="flex items-center justify-between text-sm gap-2"
                          >
                            <span className="text-gray-600">{label}</span>
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-xl ${
                                key === "yes"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {affinityLabel[key]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-quaternary/50 mb-1">
                        Lieu de vie
                      </p>
                      <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-xl w-fit">
                        {envLabel[animal.livingEnvironmentType]}
                      </span>
                    </div>

                    {animal.animal_personality_traits &&
                      animal.animal_personality_traits.length > 0 && (
                        <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-quaternary/50 mb-1">
                            Traits de personnalité
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {animal.animal_personality_traits.map((req) => (
                              <li
                                key={req.documentId}
                                className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-xl"
                              >
                                {req.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {animal.animal_requirements &&
                      animal.animal_requirements.length > 0 && (
                        <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-quaternary/50 mb-1">
                            Conditions d&apos;adoption
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {animal.animal_requirements.map((req) => (
                              <li
                                key={req.documentId}
                                className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-xl"
                              >
                                {req.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="container pb-16 md:pb-24 flex flex-col md:flex-row items-center gap-4">
          <Button href="/adoption-listings" variant="secondary" size="lg">
            ← Retour
          </Button>
          <Button href="/contact" variant="primary" size="lg">
            Je suis intéressé·e
          </Button>
          <Button
            href={`/adoption-listings/update/${adoptionListing.documentId}`}
            variant="primary"
            size="lg"
          >
            Modifier
          </Button>
          <Button
            href={`/adoption-listings/delete/${adoptionListing.documentId}`}
            variant="primary"
            size="lg"
          >
            Supprimer
          </Button>
        </div>
      </main>
    </>
  );
}
