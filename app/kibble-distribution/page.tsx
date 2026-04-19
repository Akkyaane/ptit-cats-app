"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import Button from "@/components/ui/Button";

export default function KibbleDistribution() {
  return (
    <div>
      <header className="bg-[url('/assets/img/background-1.jpg')] bg-cover bg-center">
        <div className="container">
          <Navbar />
          <section className="flex flex-col items-start justify-center gap-6 py-24 md:py-32 lg:py-44 max-w-3xl">
            <HeadingSecondary
              headingVariant="primary"
              underlineVariant="primary"
              children="Distribution de croquettes"
            />
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-[var(--color-quaternary)] max-w-2xl">
              Chaque vendredi, les bénévoles de l'association Sans Croquettes Fixes
              se mobilisent pour distribuer gratuitement de la nourriture aux
              animaux appartenant à des personnes en situation de précarité.
            </p>
          </section>
        </div>
        <Button up={true} />
      </header>

      <main className="container py-16 text-[var(--color-quaternary)]">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] items-start">
          <div className="space-y-10">
            <section className="space-y-8">
              <p className="text-base md:text-lg leading-relaxed">
                À l'origine, l'association Sans Croquettes Fixes a été créée pour
                soutenir les personnes sans domicile dans la prise en charge de leurs
                animaux. Nous avons débuté en accompagnant des associations de
                maraude, en intervenant chaque semaine dans les rues de Lyon afin de
                distribuer des repas chauds ainsi que de la nourriture pour leurs
                compagnons à quatre pattes.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Au fil du temps, nos actions se sont développées. Nous poursuivons
                toutefois notre engagement initial en assurant une distribution
                gratuite de croquettes pour chiens et chats tous les vendredis.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Cette aide est destinée à toute personne en situation de précarité,
                pas seulement aux personnes sans domicile fixe contrairement à
                certaines idées reçues. Si vous n'avez jamais bénéficié de ce service
                et avant toute première venue, merci de nous contacter à l'adresse
                suivante : <em className="font-bold">distribution@sanscroquettesfixes.fr</em>
                . Lors de votre premier passage, nos bénévoles prendront le temps
                d'évaluer les besoins de vos animaux afin de leur proposer une
                alimentation adaptée.
              </p>
            </section>

            <div className="rounded-[2rem] border border-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Comment se rendre à la distribution ?
                </h2>
                <div className="w-16 h-1 bg-[var(--color-tertiary)] mx-auto rounded-full"></div>
              </div>
              <p className="text-base md:text-lg leading-relaxed">
                Nos bénévoles vous accueillent tous les vendredis de 17h30 à 19h.
              </p>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-[2rem] border border-[var(--color-primary)] bg-[var(--color-primary)]/5 p-8 shadow-lg shadow-[rgba(0,0,0,0.05)]">
              <p className="md:text-lg font-semibold text-[var(--color-quaternary)]">
                Attention, les croquettes sont uniquement destinées aux chiens et
                chats. Il n'est pas possible de choisir la marque des croquettes
                fournies.
              </p>
            </div>
            <div className="rounded-[2rem] border border-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 p-8">
              <p className="border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 px-6 py-4 rounded-r-xl md:text-lg font-semibold text-[var(--color-quaternary)]">
                Attention, le lieu de distribution a changé. Nous vous donnons
                désormais rendez-vous rue Desaix, dans le 3ᵉ arrondissement de Lyon,
                au niveau de la station Vélo’v (à proximité du restaurant Shawerman).
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
