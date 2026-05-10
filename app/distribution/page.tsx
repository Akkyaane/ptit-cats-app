"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import HeadingTertiary from "@/components/ui/HeadingTertiary";
import Button from "@/components/ui/Button";

export default function Distribution() {
  return (
    <div className="bg-[var(--color-secondary)]">
      <header className="bg-[url('/assets/img/background-1.jpg')]">
        <div className="container relative overflow-hidden">
          <img
            src="/assets/img/icone-10.svg"
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute top-20 right-8 xl:right-24 w-72 xl:w-96"
          />
          <Navbar />
          <section className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 lg:py-40">
            <HeadingSecondary>Distribution de croquettes</HeadingSecondary>
          </section>
        </div>
        <Button up={true} />
      </header>

      <main className="relative bg-[var(--color-secondary)] text-[var(--color-quaternary)]">
        <div className="container relative py-12 md:py-16 lg:py-20 space-y-10 md:space-y-12">
          <section className="relative bg-[var(--color-secondary)] overflow-visible px-6 py-8 md:px-8 md:py-10 lg:px-10">
            <HeadingTertiary
              headingVariant="primary"
              underlineVariant="primary"
              children="Notre mission"
            />

            <div className="mt-8 space-y-8 md:space-y-10">
              <p className="text-base md:text-lg leading-relaxed md:leading-8">
                <strong>Chaque vendredi</strong>, les bénévoles de l'association Sans Croquettes
                Fixes se mobilisent pour <strong>distribuer gratuitement</strong> de la
                nourriture aux animaux appartenant à des personnes en situation
                de précarité.
              </p>
              <p className="text-base md:text-lg leading-relaxed md:leading-8">
                À l'origine, l'association Sans Croquettes Fixes a été créée
                pour <strong>soutenir les personnes sans domicile</strong> dans la prise en
                charge de leurs animaux. Nous avons débuté en accompagnant des
                associations de maraude, en intervenant chaque semaine dans les
                rues de Lyon afin de distribuer des repas chauds ainsi que de la
                nourriture pour leurs compagnons à quatre pattes.
              </p>
              <p className="text-base md:text-lg leading-relaxed md:leading-8">
                Au fil du temps, nos actions se sont développées. Nous
                poursuivons toutefois notre <strong>engagement initial</strong> en assurant une
                <strong> distribution gratuite de croquettes</strong> pour chiens et chats tous
                les vendredis.
              </p>
            </div>
          </section>

          <section className="relative bg-[var(--color-secondary)] overflow-visible px-6 py-8 md:px-8 md:py-10 lg:px-10">
            <HeadingTertiary
              headingVariant="primary"
              underlineVariant="primary"
              children="Informations pratiques"
            />

            <div className="mt-8 space-y-8 md:space-y-10">
              <div>
                <h3 className="inline-block border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/6 px-3 py-1.5 text-sm md:text-base text-[var(--color-primary)] font-semibold mb-3">
                  A qui est destinée cette aide ?
                </h3>
                <p className="text-base md:text-lg leading-relaxed md:leading-8 text-[var(--color-quaternary)]">
                  Cette aide est destinée à <mark className="bg-[var(--color-primary)]/15 px-1 no-underline rounded">toute personne en situation de précarité</mark>, pas seulement aux personnes sans domicile fixe contrairement à certaines idées reçues.
                </p>
              </div>

              <div>
                <h3 className="inline-block border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/6 px-3 py-1.5 text-sm md:text-base text-[var(--color-primary)] font-semibold mb-3">
                  Comment bénéficier de cette aide ?
                </h3>
                <p className="text-base md:text-lg leading-relaxed md:leading-8 text-[var(--color-quaternary)]">
                  Si vous n'avez jamais bénéficié de ce service et avant toute première venue, merci de nous contacter à <mark className="bg-[var(--color-primary)]/15 px-1 no-underline rounded">distribution@sanscroquettesfixes.fr</mark>. Lors de votre première visite, nos bénévoles évalueront les besoins de vos animaux afin de leur proposer une alimentation adaptée.
                </p>
              </div>

              <div>
                <h3 className="inline-block border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/6 px-3 py-1.5 text-sm md:text-base text-[var(--color-primary)] font-semibold mb-3">
                  Comment se rendre à la distribution ?
                </h3>
                <p className="text-base md:text-lg leading-relaxed md:leading-8 text-[var(--color-quaternary)]">
                  Nos bénévoles vous accueillent <mark className="bg-[var(--color-primary)]/15 px-1 no-underline rounded">tous les vendredis de 17h30 à 19h</mark>. Rendez-vous <mark className="bg-[var(--color-primary)]/15 px-1 no-underline rounded">rue Desaix, dans le 3ᵉ arrondissement de Lyon</mark>, au niveau de la station Vélo'v (à proximité du restaurant Shawerman).
                </p>
              </div>

              <div>
                <h3 className="inline-block border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/6 px-3 py-1.5 text-sm md:text-base text-[var(--color-primary)] font-semibold mb-3">
                  Les croquettes sont-elles réservées à certains animaux ?
                </h3>
                <p className="text-base md:text-lg leading-relaxed md:leading-8 text-[var(--color-quaternary)]">
                  Les croquettes sont destinées aux <mark className="bg-[var(--color-primary)]/15 px-1 no-underline rounded">chiens et chats</mark> seulement. Il n'est pas possible de choisir la marque des croquettes fournies.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
