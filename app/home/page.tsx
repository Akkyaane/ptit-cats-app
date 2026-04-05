"use client";
import Navbar from "@/components/Navbar";

export default function displayIndex() {
  return (
    <div>
      <header className="bg-[url('/background.jpg')] bg-center">
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
      <main>
        {/* Section à travailler */}
        <section className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-quaternary)]">
            Nos dernières annonces d'adoption
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <div className="relative">
                <img
                  src="./assets/animals/animal-1.jpg"
                  alt=""
                  className="w-full"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    1 an & 3 ans
                  </span>
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    Mâle & Femelle
                  </span>
                </div>
                <span className="absolute top-3 right-3 bg-[var(--color-primary)] px-3 py-1 rounded-xl text-xs font-bold">
                  Duo
                </span>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 p-4 md:p-5 flex-grow text-[var(--color-quaternary)]">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg md:text-xl font-bold">
                    Minou et Coco
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--color-primary)] opacity-70">
                    Deux petits coquins cherchent leur foyer
                  </p>
                  <p className="text-sm md:text-base flex-grow">
                    Deux chatons adorables, pleins de vie et de tendresse,
                    cherchent une famille aimante pour les accueillir.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-quaternary)]/15">
                  <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">
                    120€
                  </span>
                  <a
                    href="/adoption-posts/view/1"
                    className="px-4 py-2 text-sm bg-[var(--color-quaternary)] text-[var(--color-secondary)] font-bold rounded-xl backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-quaternary)]/10 hover:text-[var(--color-quaternary)] transition-colors duration-200"
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
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    2 ans
                  </span>
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    Mâle
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 md:p-5 flex-grow text-[var(--color-quaternary)]">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg md:text-xl font-bold">Tigrou</h3>
                  <p className="text-xs md:text-sm text-[var(--color-primary)] opacity-70">
                    Chat calin et affectueux
                  </p>
                  <p className="text-sm md:text-base flex-grow">
                    Tigrou est un chat très affectueux qui adore les câlins. Il
                    est parfait pour une famille avec enfants.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-quaternary)]/15">
                  <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">
                    80€
                  </span>
                  <a
                    href="/adoption-posts/view/2"
                    className="px-4 py-2 text-sm bg-[var(--color-quaternary)] text-[var(--color-secondary)] font-bold rounded-xl backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-quaternary)]/10 hover:text-[var(--color-quaternary)] transition-colors duration-200"
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
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    3 ans
                  </span>
                  <span className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    Mâles
                  </span>
                </div>
                <span className="absolute top-3 right-3 bg-[var(--color-primary)] px-3 py-1 rounded-xl text-xs font-bold">
                  Duo
                </span>
              </div>
              <div className="flex flex-col gap-2 p-4 md:p-5 flex-grow text-[var(--color-quaternary)]">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg md:text-xl font-bold">Max et Luna</h3>
                  <p className="text-xs md:text-sm text-[var(--color-primary)] opacity-70">
                    Inséparables, ils cherchent leur maison
                  </p>
                  <p className="text-sm md:text-base flex-grow">
                    Max et Luna sont inséparables. Ces deux chats adorables
                    rêvent d'une maison chaleureuse où vivre ensemble.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-quaternary)]/15">
                  <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">
                    140€
                  </span>
                  <a
                    href="/adoption-posts/view/3"
                    className="px-4 py-2 text-sm bg-[var(--color-quaternary)] text-[var(--color-secondary)] font-bold rounded-xl backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-quaternary)]/10 hover:text-[var(--color-quaternary)] transition-colors duration-200"
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
              className="px-6 py-4 text-sm bg-[var(--color-primary)] text-[var(--color-secondary)] font-bold rounded-xl backdrop-blur-sm border border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              Voir toutes les annonces
            </a>
          </div>
        </section>

        <section className="text-[var(--color-quaternary)] max-w-[1200px] mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Sans Croquettes Fixes, qu'est-ce que c'est ?
            </h2>
            <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <p className="text-base md:text-lg leading-relaxed">
                  Sans Croquettes Fixes est une association basée à Lyon,
                  engagée dans une grande partie de la région
                  Auvergne-Rhône-Alpes et au-delà. Elle a pour mission de venir
                  en aide aux animaux en détresse, tout en soutenant les
                  personnes qui en prennent soin au quotidien.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  Nos actions s'articulent autour de plusieurs axes :
                  l'accompagnement des propriétaires d'animaux en difficulté, la
                  prise en charge de chats sans solution, l'organisation de
                  campagnes de stérilisation, ainsi que la distribution gratuite
                  de croquettes.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  À travers ces initiatives, nous œuvrons chaque jour pour
                  améliorer les conditions de vie des animaux et renforcer le
                  lien solidaire entre humains et compagnons à quatre pattes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/a-propos"
                  className="px-6 py-3 font-semibold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-center"
                >
                  En savoir plus
                </a>
                <a
                  href="/faire-un-don"
                  className="px-6 py-3 font-semibold rounded-xl border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 text-center"
                >
                  Nous soutenir
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-secondary)]/5 to-[var(--color-quaternary)]/10 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl md:text-7xl mb-4">🐱</div>
                  <div className="text-lg md:text-xl font-bold text-[var(--color-quaternary)] mb-2">
                    Notre mission
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    Aider les animaux en détresse
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">♥</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[var(--color-quaternary)] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏠</span>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 text-[var(--color-quaternary)] max-w-[1200px] mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Comment vous remercier ?
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Grâce à votre aide, notre association a pu apporter une aide
                significative à des milliers d'animaux et leurs humains.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                  <span className="font-semibold">10 ans d'engagement</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                  <span className="font-semibold">
                    Plus de 5.6K animaux sauvés
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                  <span className="font-semibold">
                    Plus de 18K tonnes de croquettes distribuées
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-quaternary)] rounded-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    5.6K+
                  </div>
                  <div className="text-lg md:text-xl">Animaux sauvés</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="text-[var(--color-quaternary)] max-w-[1200px] mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Nos derniers articles
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Découvrez notre blog pour plus d'actualités
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm">Image d'article</span>
              </div>
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
              <div className="aspect-video bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-white text-sm">Image d'article</span>
              </div>
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
              <div className="aspect-video bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-white text-sm">Image d'article</span>
              </div>
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
