import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Donation() {
  return (
    <div>
      <header className="bg-[url('/assets/img/background-1.jpg')] bg-center bg-no-repeat bg-cover">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
          <section className="flex flex-col items-start justify-center gap-6 py-24 px-4 md:py-32 md:max-w-xl lg:py-48 lg:max-w-2xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
              Faire un don
            </h1>
            <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
              Aidez-nous à soutenir les animaux et leurs propriétaires en difficulté.
            </p>
          </section>
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-12 text-[var(--color-quaternary)]">
        <section className="bg-[var(--color-tertiary)] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Faites un don pour nos pensionnaires</h2>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Soutenez notre projet en faisant un don : chaque contribution, même
            modeste, nous permet d’avancer. Les dons financiers nous servent à
            couvrir les frais vétérinaires de nos animaux, à financer du
            matériel, à organiser des actions locales et à faire vivre notre
            engagement au quotidien. En nous soutenant, vous nous aidez à rester
            indépendants, réactifs et engagés sur le long terme.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            Les dons se font via la plateforme HelloAsso et sont entièrement
            sécurisés. Votre reçu fiscal est automatiquement généré par la
            plateforme. L’association Sans Croquettes Fixes est reconnue
            d’intérêt général, tous vos dons peuvent potentiellement vous donner
            droit à une déduction fiscale.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Et les dons matériels ?</h2>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            Vous avez du matériel inutilisé ou en bon état que vous souhaitez
            transmettre ? On en a peut-être besoin ! Pour nous faire un don
            matériel, contactez-nous par mail à <a href="mailto:dons@sanscroquettesfixes.fr" className="text-[var(--color-primary)] hover:underline">dons@sanscroquettesfixes.fr</a>. Nous
            reviendrons vers vous rapidement pour organiser la récupération ou
            l’envoi (Lyon et alentours seulement).
          </p>
          <p className="text-lg font-semibold mb-4">Nous avons notamment besoin de :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-primary)] text-xl">•</span>
              <span>Nourriture humide chats et chiens (non périmée)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-primary)] text-xl">•</span>
              <span>Croquettes pour chats et chiens (dans des paquets fermés)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-primary)] text-xl">•</span>
              <span>Friandises</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-primary)] text-xl">•</span>
              <span>Accessoires chiens (harnais, muselière, laisses, etc.)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-primary)] text-xl">•</span>
              <span>Produits de soins (shampoing, nettoyant oreille, etc.)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-primary)] text-xl">•</span>
              <span>Jeux et jouets</span>
            </div>
          </div>
        </section>

        <section className="text-center">
          <a href="https://www.helloasso.com/associations/sans-croquettes-fixes/formulaires/1" target="_blank" rel="noopener noreferrer" className="bg-[var(--color-primary)] text-white py-4 px-8 rounded-full text-lg font-semibold hover:bg-[var(--color-tertiary)] transition-colors duration-300 shadow-lg hover:shadow-xl">
            Faire un don financier
          </a>
          <p className="mt-4 text-sm text-gray-600">Sécurisé via HelloAsso • Reçu fiscal automatique</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
