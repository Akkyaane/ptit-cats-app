import Heading from "@/components/ui/Heading";
import Image from "next/image";

export default function Distribution() {
  return (
    <div className="bg-secondary">
      <header className="bg-[url('/assets/img/background-1.jpg')]">
        <div className="container relative overflow-hidden">
          <Image
            src="/assets/img/icone-10.svg"
            alt=""
            aria-hidden={true}
            width={384}
            height={384}
            className="hidden lg:block absolute top-20 right-8 xl:right-24 w-72 xl:w-96"
          />
          <div className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 lg:py-40">
            <Heading type="h1" headingVariant="secondary">
              Distribution de croquettes
            </Heading>
          </div>
        </div>
      </header>

      <main className="relative bg-secondary">
        <div className="container relative flex flex-col gap-12 md:gap-16 lg:gap-24">
          <section
            aria-label="Notre mission"
            className="px-6 py-8 md:px-8 md:py-10 lg:px-10"
          >
            <Heading
              type="h2"
              headingVariant="quaternary"
              underlineVariant="tertiary"
            >
              Notre mission
            </Heading>

            <div className="mt-8 space-y-8 md:space-y-10">
              <p className="border-l-4 border-primary bg-primary/5 px-4 md:px-6 py-3 md:py-4 rounded-r-xl font-semibold text-base md:text-lg">
                Chaque vendredi, les bénévoles de l'association Sans Croquettes
                Fixes se mobilisent pour distribuer gratuitement de la
                nourriture aux animaux appartenant à des personnes en situation
                de précarité.
              </p>
              <p className="text-base md:text-lg leading-relaxed md:leading-8">
                À l'origine, l'association Sans Croquettes Fixes a été créée
                pour soutenir les personnes sans domicile dans la prise en
                charge de leurs animaux. Nous avons débuté en accompagnant des
                associations de maraude, en intervenant chaque semaine dans les
                rues de Lyon afin de distribuer des repas chauds ainsi que de la
                nourriture pour leurs compagnons à quatre pattes.
              </p>
              <p className="text-base md:text-lg leading-relaxed md:leading-8">
                Au fil du temps, nos actions se sont développées. Nous
                poursuivons toutefois notre engagement initial en assurant une
                distribution gratuite de croquettes pour chiens et chats tous
                les vendredis.
              </p>
            </div>
          </section>

          <section
            aria-label="Informations pratiques"
            className="px-6 py-8 md:px-8 md:py-10 lg:px-10"
          >
            <Heading
              type="h2"
              headingVariant="quaternary"
              underlineVariant="tertiary"
            >
              Informations pratiques
            </Heading>

            <ol className="mt-8 flex flex-col divide-y divide-primary/10 rounded-xl overflow-hidden list-none">
              <li className="flex items-start gap-5 px-6 py-6">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold flex items-center justify-center mt-0.5"
                >
                  1
                </span>
                <div>
                  <h3 className="font-bold text-sm md:text-base mb-1.5">
                    À qui est destinée cette aide ?
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed">
                    Cette aide est destinée à{" "}
                    <strong className="bg-primary/15 px-1 rounded font-normal">
                      toute personne en situation de précarité
                    </strong>
                    , pas seulement aux personnes sans domicile fixe
                    contrairement à certaines idées reçues.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-5 px-6 py-6">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold flex items-center justify-center mt-0.5"
                >
                  2
                </span>
                <div>
                  <h3 className="font-bold text-sm md:text-base mb-1.5">
                    Comment bénéficier de cette aide ?
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed">
                    Avant votre première venue, merci de nous contacter via
                    notre page de{" "}
                    <a
                      href="/contact"
                      className="text-primary underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                    >
                      contact
                    </a>
                    . Nos bénévoles évalueront ensuite les besoins de vos
                    animaux afin de leur proposer une alimentation adaptée.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-5 px-6 py-6">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold flex items-center justify-center mt-0.5"
                >
                  3
                </span>
                <div>
                  <h3 className="font-bold text-sm md:text-base mb-1.5">
                    Comment se rendre à la distribution ?
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed">
                    Nos bénévoles vous accueillent{" "}
                    <strong className="bg-primary/15 px-1 rounded font-normal">
                      tous les vendredis de 17h30 à 19h
                    </strong>
                    . Rendez-vous{" "}
                    <strong className="bg-primary/15 px-1 rounded font-normal">
                      rue Desaix, dans le 3ᵉ arrondissement de Lyon
                    </strong>
                    , au niveau de la station Vélo'v (à proximité du restaurant
                    Shawerman).
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-5 px-6 py-6">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold flex items-center justify-center mt-0.5"
                >
                  4
                </span>
                <div>
                  <h3 className="font-bold text-sm md:text-base mb-1.5">
                    Les croquettes sont-elles réservées à certains animaux ?
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed">
                    Les croquettes sont destinées aux{" "}
                    <strong className="bg-primary/15 px-1 rounded font-normal">
                      chiens et chats
                    </strong>{" "}
                    seulement. Il n'est pas possible de choisir la marque des
                    croquettes fournies.
                  </p>
                </div>
              </li>
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
}
