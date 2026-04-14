import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function displayKibbleDistribution() {
  return (
    <div>
      <header className="bg-[url('/assets/img/background-1.jpg')] bg-center bg-no-repeat">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
          <section className="flex flex-col items-start justify-center gap-6 py-24 px-4 md:py-32 md:max-w-xl lg:py-48 lg:max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Distribution gratuite de croquettes
            </h1>
          </section>
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-6 text-[var(--color-quaternary)]">
        <p className="text-base md:text-lg leading-relaxed">
          Chaque vendredi, les bénévoles de l'association Sans Croquettes Fixes
          se mobilisent pour distribuer gratuitement de la nourriture aux
          animaux appartenant à des personnes en situation de précarité.
        </p>
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
          suivante : <span className="font-bold">distribution@sanscroquettesfixes.fr</span>. Lors de votre premier
          passage, nos bénévoles prendront le temps d'évaluer les besoins de vos
          animaux afin de leur proposer une alimentation adaptée.
        </p>
        <p className="border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 px-6 py-4 rounded-r-xl md:text-lg font-semibold text-[var(--color-quaternary)]">
          Attention, les croquettes sont uniquement destinées aux chiens et
          chats. Il n'est pas possible de choisir la marque des croquettes
          fournies.
        </p>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Comment se rendre à la distribution ?
          </h2>
          <div className="w-16 h-1 bg-[var(--color-tertiary)] mx-auto rounded-full"></div>
        </div>
        <p className="text-base md:text-lg leading-relaxed">
          Nos bénévoles vous accueillent tous les vendredis de 17h30 à 19h.
        </p>
        <p className="border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 px-6 py-4 rounded-r-xl md:text-lg font-semibold text-[var(--color-quaternary)]">
          Attention, le lieu de distribution a changé. Nous vous donnons
          désormais rendez-vous rue Desaix, dans le 3ᵉ arrondissement de Lyon,
          au niveau de la station Vélo’v (à proximité du restaurant Shawerman).
        </p>
      </main>
      <Footer />
    </div>
  );
}
