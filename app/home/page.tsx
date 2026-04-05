'use client'
import Navbar from '@/components/Navbar';
import DisplayAdoptionPosts from '../adoption-posts/page';

export default function displayIndex() {
  return (
    <div>
      <header className="bg-[url('/background.jpg')] bg-center">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
          <section className="flex flex-col items-start justify-center gap-6 py-24 px-4 md:py-32 md:max-w-xl lg:py-48 lg:max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Chaque animal porte une histoire. <br /> Et si vous écriviez la suite avec lui ?
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-secondary)]/80 leading-relaxed max-w-xl">
              Découvrez nos compagnons à quatre pattes qui attendent de rencontrer leur humain pour la vie.
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
      <main className="bg-white">
        <section className="max-w-[1200px] mx-auto px-4 py-12 md:py-16 lg:py-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 lg:mb-12">
            Nos dernières annonces d'adoption
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white border border-gray-100">
              <div className="relative w-full h-48 md:h-56 bg-gray-300 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-sm">Image du chat</span>
                </div>
                <span className="absolute top-3 left-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                  1 an
                </span>
                <span className="absolute top-10 left-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Mâle/Femelle
                </span>
                <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Duo
                </span>
              </div>
              <div className="flex flex-col gap-3 p-4 md:p-5 flex-grow">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">Minou et Coco</h3>
                  <p className="text-sm md:text-base text-[var(--color-secondary)] italic">Deux petits coquins cherchent leur foyer</p>
                </div>
                <p className="text-sm md:text-base text-gray-700 flex-grow">
                  Deux chatons adorables, pleins de vie et de tendresse, cherchent une famille aimante pour les accueillir.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">120€</span>
                  <a 
                    href="/adoption-posts/view/1"
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--color-quaternary)] text-white hover:bg-[var(--color-quaternary)]/90 transition-colors duration-200"
                  >
                    Voir plus
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white border border-gray-100">
              <div className="relative w-full h-48 md:h-56 bg-gray-300 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
                  <span className="text-white text-sm">Image du chat</span>
                </div>
                <span className="absolute top-3 left-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                  2 ans
                </span>
                <span className="absolute top-10 left-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Mâle
                </span>
              </div>
              <div className="flex flex-col gap-3 p-4 md:p-5 flex-grow">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">Tigrou</h3>
                  <p className="text-sm md:text-base text-[var(--color-secondary)] italic">Chat calin et affectueux</p>
                </div>
                <p className="text-sm md:text-base text-gray-700 flex-grow">
                  Tigrou est un chat très affectueux qui adore les câlins. Il est parfait pour une famille avec enfants.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">80€</span>
                  <a 
                    href="/adoption-posts/view/2"
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--color-quaternary)] text-white hover:bg-[var(--color-quaternary)]/90 transition-colors duration-200"
                  >
                    Voir plus
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white border border-gray-100">
              <div className="relative w-full h-48 md:h-56 bg-gray-300 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <span className="text-white text-sm">Image du chat</span>
                </div>
                <span className="absolute top-3 left-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                  3 ans
                </span>
                <span className="absolute top-10 left-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Mâle/Femelle
                </span>
                <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Duo
                </span>
              </div>
              <div className="flex flex-col gap-3 p-4 md:p-5 flex-grow">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">Max et Luna</h3>
                  <p className="text-sm md:text-base text-[var(--color-secondary)] italic text-gray-700">Inséparables, ils cherchent leur maison</p>
                </div>
                <p className="text-sm md:text-base text-gray-700 flex-grow">
                  Max et Luna sont inséparables. Ces deux chats adorables rêvent d'une maison chaleureuse où vivre ensemble.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">140€</span>
                  <a 
                    href="/adoption-posts/view/3"
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--color-quaternary)] text-white hover:bg-[var(--color-quaternary)]/90 transition-colors duration-200"
                  >
                    Voir plus
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 md:mt-10 lg:mt-12">
            <a 
              href="/adoption-posts"
              className="px-8 py-3 font-semibold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-colors duration-200"
            >
              Voir toutes les annonces
            </a>
          </div>
        </section>

      </main>




    </div>
  );
}



