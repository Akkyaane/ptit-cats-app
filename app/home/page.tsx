"use client";
import Navbar from "@/components/Navbar";

export default function displayIndex() {
  return (
    <div>
      <header className="bg-[url('/assets/img/background-1.jpg')] bg-center">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
          <section className="flex flex-col items-start justify-center gap-6 py-24 px-4 md:py-32 md:max-w-xl lg:py-48 lg:max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Chaque animal porte une histoire. <br /> Et si vous écriviez la
              suite avec lui ?
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-secondary)]/80 leading-relaxed max-w-xl">
              Découvrez nos compagnons à quatre pattes qui attendent de
              rencontrer leur humain pour la vie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="/adoption-posts"
                className="px-6 py-4 font-bold rounded-xl bg-[var(--color-quaternary)] backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-quaternary)]/10 hover:border-white transition-colors duration-200 text-center"
              >
                Découvrir nos compagnons
              </a>
              <a
                href="/pet-matchmaker"
                className="px-6 py-4 font-bold rounded-xl bg-[var(--color-primary)] backdrop-blur-sm border border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:border-white transition-colors duration-200 text-center"
              >
                Trouver mon compagnon idéal
              </a>
            </div>
          </section>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center">
        {/* Section à travailler */}
        <section className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-quaternary)] mb-4">
              Nos dernières annonces d'adoption
            </h2>
            <div className="w-16 h-1 bg-[var(--color-tertiary)] rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <div className="relative">
                <img
                  src="./assets/animals/animal-1.jpg"
                  alt=""
                  className="w-full"
                />
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap justify-start max-w-[50%]">
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    13 ans | 1 an
                  </span>
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    M | F
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2 flex-wrap justify-end max-w-[50%]">
                  <span className="bg-[var(--color-primary)] px-3 py-1 rounded-xl text-xs font-bold">
                    Atypique
                  </span>
                  <span className="bg-[var(--color-primary)] px-3 py-1 rounded-xl text-xs font-bold">
                    Duo
                  </span>
                  <span className="bg-[var(--color-primary)] px-3 py-1 rounded-xl text-xs font-bold">
                    Senior
                  </span>
                </div>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 p-4 md:p-5 flex-grow text-[var(--color-quaternary)]">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg md:text-xl font-bold">
                    Minou et Coco
                  </h3>
                  <p className="text-sm md:text-base flex-grow">
                    Deux chatons adorables, pleins de vie et de tendresse,
                    cherchent une famille aimante pour les accueillir.
                  </p>
                  <ul className="flex flex-row gap-2 text-xs md:text-sm text-[var(--color-primary)] opacity-70">
                    <li>✓ Vaccinés</li>
                    <li>✓ Castrés</li>
                    <li>✓ Déparasités</li>
                    <li>✓ Identifiés</li>
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-quaternary)]/15">
                  <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">
                    120€
                  </span>
                  <a
                    href="/adoption-posts/view/1"
                    className="px-4 py-2 text-sm bg-[var(--color-quaternary)] text-[var(--color-secondary)] font-bold rounded-xl backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-quaternary)] transition-colors duration-200"
                  >
                    Voir plus
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 bg-white">
              <div className="relative">
                <img
                  src="./assets/animals/animal-2.jpg"
                  alt=""
                  className="w-full"
                />
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap justify-start max-w-[50%]">
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    2 ans
                  </span>
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    M
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 md:p-5 flex-grow text-[var(--color-quaternary)]">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg md:text-xl font-bold">Tigrou</h3>
                  <p className="text-sm md:text-base flex-grow">
                    Tigrou est un chat très affectueux qui adore les câlins. Il
                    est parfait pour une famille avec enfants.
                  </p>
                  <ul className="flex flex-row gap-2 text-xs md:text-sm text-[var(--color-primary)] opacity-70">
                    <li>✓ Vaccinés</li>
                    <li>✓ Castrés</li>
                    <li>✓ Déparasités</li>
                    <li>✓ Identifiés</li>
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-quaternary)]/15">
                  <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">
                    80€
                  </span>
                  <a
                    href="/adoption-posts/view/2"
                    className="px-4 py-2 text-sm bg-[var(--color-quaternary)] text-[var(--color-secondary)] font-bold rounded-xl backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-quaternary)] transition-colors duration-200"
                  >
                    Voir plus
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 bg-white">
              <div className="relative">
                <img
                  src="./assets/animals/animal-3.jpg"
                  alt=""
                  className="w-full"
                />
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap justify-start max-w-[50%]">
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    1 mois | 3 ans
                  </span>
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    M | F
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2 flex-wrap justify-end max-w-[50%]">
                  <span className="bg-[var(--color-primary)] px-3 py-1 rounded-xl text-xs font-bold">
                    Chaton
                  </span>
                  <span className="bg-[var(--color-primary)] px-3 py-1 rounded-xl text-xs font-bold">
                    Duo
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 md:p-5 flex-grow text-[var(--color-quaternary)]">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg md:text-xl font-bold">Max et Luna</h3>
                  <p className="text-sm md:text-base flex-grow">
                    Max et Luna sont inséparables. Ces deux chats adorables
                    rêvent d'une maison chaleureuse où vivre ensemble.
                  </p>
                  <ul className="flex flex-row gap-2 text-xs md:text-sm text-[var(--color-primary)] opacity-70">
                    <li>✓ Vaccinés</li>
                    <li>✓ Castrés</li>
                    <li>✓ Déparasités</li>
                    <li>✓ Identifiés</li>
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-quaternary)]/15">
                  <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">
                    140€
                  </span>
                  <a
                    href="/adoption-posts/view/3"
                    className="px-4 py-2 text-sm bg-[var(--color-quaternary)] text-[var(--color-secondary)] font-bold rounded-xl backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-quaternary)] transition-colors duration-200"
                  >
                    Voir plus
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <a
              href="/adoption-posts"
              className="px-6 py-4 text-sm bg-[var(--color-primary)] text-[var(--color-secondary)] font-bold rounded-xl backdrop-blur-sm border border-2 border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              Voir toutes les annonces
            </a>
          </div>
        </section>

        <section className="text-[var(--color-quaternary)] max-w-[1200px] mx-auto px-4 py-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Qui sommes-nous ?
            </h2>
            <div className="w-16 h-1 bg-[var(--color-tertiary)] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col gap-6 z-10">
              <div className="space-y-4">
                <p className="text-base md:text-lg leading-relaxed">
                  Sans Croquettes Fixes est une association basée à Lyon,
                  engagée dans une grande partie de la région
                  Auvergne-Rhône-Alpes et parfois au-delà. Notre mission est de
                  venir en aide aux animaux en détresse, tout en soutenant les
                  personnes qui en prennent soin au quotidien.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  Nos actions s'articulent autour de plusieurs axes :
                  l'accompagnement des propriétaires d'animaux en difficulté, la
                  prise en charge de chats sans solution, l'organisation de
                  campagnes de stérilisation, ainsi que la distribution gratuite
                  de croquettes.
                </p>
                <div className="border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 px-6 py-4 rounded-r-xl">
                  <p className="text-base md:text-lg font-semibold text-[var(--color-quaternary)]">
                    Nous sommes une asso 100 % bénévole : ici, chaque don sert
                    directement à soigner et protéger les animaux les plus
                    fragiles. Ce sont vos dons qui nous permettent de changer
                    leur quotidien.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/a-propos"
                  className="px-6 py-4 text-sm bg-[var(--color-quaternary)] text-[var(--color-secondary)] font-bold rounded-xl backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-quaternary)] transition-colors duration-200"
                >
                  En savoir plus
                </a>
                <a
                  href="/faire-un-don"
                  className="px-6 py-4 text-sm bg-[var(--color-primary)] text-[var(--color-secondary)] font-bold rounded-xl backdrop-blur-sm border border-2 border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Nous soutenir
                </a>
              </div>
            </div>
            <div className="overflow-hidden -mr-8 relative">
              <img
                src="assets/img/background-2.jpg"
                alt=""
                className="md:h-[600px] object-cover rounded-xl"
              />
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `
           linear-gradient(to right, white, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 70%, white),
           linear-gradient(to bottom, white, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 70%, white)
         `,
                }}
              ></div>
            </div>
          </div>
        </section>
        <section className="text-[var(--color-quaternary)] max-w-[1200px] mx-auto px-4 py-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Nos derniers articles
            </h2>
            <div className="w-16 h-1 bg-[var(--color-tertiary)] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <article className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <img
                src="assets/articles/article-1.jpg"
                alt="Article 1"
                className="w-full sm: h-1/2 md:h-4/10 object-cover"
              />
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-3 leading-tight">
                  <a
                    href=""
                    className="text-[var(--color-quaternary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    Un lieu pour les chats oubliés : l'appel aux dons de Sans
                    Croquettes Fixes
                  </a>
                </h3>
                <span className="text-sm text-gray-500 mb-3 block">
                  25 juillet 2025
                </span>
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
                  À l'abri des regards, certains chats errants n'ont plus aucune
                  solution : trop âgés, malades ou trop craintifs pour être
                  adoptés. C'est pour eux que l'association Sans Croquettes
                  Fixes lance le projet Les Félins de l'Ombre...
                </p>
                <a
                  href=""
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/90 font-semibold text-sm"
                >
                  Lire la suite →
                </a>
              </div>
            </article>
            <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <img
                src="assets/articles/article-2.jpg"
                alt="Article 2"
                className="w-full h-4/10 object-cover"
              />
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-3 leading-tight">
                  <a
                    href=""
                    className="text-[var(--color-quaternary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    Sans Croquettes Fixes : les distributions continuent même
                    pendant l'été
                  </a>
                </h3>
                <span className="text-sm text-gray-500 mb-3 block">
                  25 juillet 2025
                </span>
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
                  Même en plein cœur de l'été, l'association Sans Croquettes
                  Fixes ne baisse pas les bras. Chaque semaine, ses bénévoles
                  poursuivent leurs distributions de nourriture...
                </p>
                <a
                  href=""
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/90 font-semibold text-sm"
                >
                  Lire la suite →
                </a>
              </div>
            </article>
            <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <img
                src="assets/articles/article-3.jpg"
                alt="Article 3"
                className="w-full h-4/10 object-cover"
              />
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-3 leading-tight">
                  <a
                    href=""
                    className="text-[var(--color-quaternary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    Comment protéger son chat du soleil ?
                  </a>
                </h3>
                <span className="text-sm text-gray-500 mb-3 block">
                  25 juillet 2025
                </span>
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
                  Lorsque les températures montent, votre chat aussi peut
                  souffrir du soleil. Contrairement à une idée reçue, son pelage
                  ne le protège pas toujours totalement...
                </p>
                <a
                  href=""
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/90 font-semibold text-sm"
                >
                  Lire la suite →
                </a>
              </div>
            </article>
          </div>
        </section>
        <section className="bg-[var(--color-tertiary)]/10 rounded-xl w-[calc(1400px)] text-[var(--color-quaternary)]">
          <div className="max-w-[1200px] mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-center gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Comment vous remercier ?
                </h2>
                <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
              </div>
              <p className="text-base md:text-lg leading-relaxed">
                Grâce à votre aide, notre association a pu apporter une aide
                significative à des milliers d'animaux et leurs humains et
                continue de le faire chaque jour.
              </p>
              <ul className="flex gap-24">
                <li className="flex flex-col items-center gap-3">
                  <span className="text-8xl text-[var(--color-primary)]">
                    10
                  </span>{" "}
                  ans d'engagement
                </li>
                <li className="flex flex-col items-center gap-3">
                  <span className="text-8xl text-[var(--color-primary)]">
                    5.6K
                  </span>{" "}
                  animaux sauvés
                </li>
                <li className="flex flex-col items-center gap-3">
                  <span className="text-8xl text-[var(--color-primary)]">
                    +18K
                  </span>{" "}
                  tonnes de croquettes distribuées
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[var(--color-quaternary)] text-white py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-6">
            <p className="text-sm md:text-base">
              &copy; 2026 Sans Croquettes Fixes © 2022 - Litl' Pal Theme
            </p>
          </div>
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
            <li>
              <a
                href="/adoption-posts"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                À l'adoption
              </a>
            </li>
            <li>
              <a
                href="/kibble-distribution"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                Distribution de croquettes
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                À propos
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/legal"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                Mentions légales
              </a>
            </li>
            <li>
              <a
                href="/donation"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                Faire un don
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
