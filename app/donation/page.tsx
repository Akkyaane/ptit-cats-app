"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import HeadingTertiary from "@/components/ui/HeadingTertiary";
import Button from "@/components/ui/Button";

export default function Donation() {
  const items = [
    "Nourriture humide chats et chiens (non périmée)",
    "Croquettes pour chats et chiens (dans des paquets fermés)",
    "Friandises",
    "Accessoires chiens (harnais, muselière, laisses, etc.)",
    "Produits de soins (shampoing, nettoyant oreille, etc.)",
    "Jeux et jouets",
  ];
  return (
    <div>
      <header className="bg-[url('/assets/img/background-1.jpg')]">
        <section className="container relative">
          <img
            src="/assets/img/icone-10.svg"
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute top-20 right-8 xl:right-24 w-72 xl:w-96"
          />
          <Navbar />
          <div className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 lg:py-40">
            <HeadingSecondary>Faire un don</HeadingSecondary>
          </div>
        </section>
        <Button up={true} />
      </header>

      <main className="text-[var(--color-quaternary)]">
        <div className="container flex flex-col gap-12">
          <section className="p-8 md:p-10 flex flex-col gap-12">
            <HeadingTertiary
              headingVariant="primary"
              underlineVariant="primary"
              children="Faites un don pour nos pensionnaires"
            />
            <div className="md:text-lg leading-relaxed md:leading-8 flex flex-col gap-6">
              <p>
                Soutenez notre projet en faisant un don : chaque contribution,
                même modeste, nous permet d’avancer. Les dons financiers nous
                servent à couvrir les frais vétérinaires de nos animaux, à
                financer du matériel, à organiser des actions locales et à faire
                vivre notre engagement au quotidien. En nous soutenant, vous
                nous aidez à rester indépendants, réactifs et engagés sur le
                long terme.
              </p>
              <p>
                Les dons se font via la plateforme HelloAsso et sont entièrement
                sécurisés. Votre reçu fiscal est automatiquement généré par la
                plateforme. L’association Sans Croquettes Fixes est reconnue
                d’intérêt général, tous vos dons peuvent potentiellement vous
                donner droit à une déduction fiscale.
              </p>
            </div>
          </section>

          <section className="p-8 md:p-10 flex flex-col gap-12">
            <HeadingTertiary
              headingVariant="primary"
              underlineVariant="primary"
              children="Et les dons matériels ?"
            />
            <div className="md:text-lg leading-relaxed md:leading-8 flex flex-col gap-6">
              <p>
                Vous avez du matériel inutilisé ou en bon état que vous
                souhaitez transmettre ? On en a peut-être besoin ! Pour nous
                faire un don matériel, contactez-nous par mail à{" "}
                <a
                  href="mailto:dons@sanscroquettesfixes.fr"
                  className="text-[var(--color-primary)] font-semibold underline-offset-2 hover:underline"
                >
                  dons@sanscroquettesfixes.fr
                </a>
                . Nous reviendrons vers vous rapidement pour organiser la
                récupération ou l’envoi (Lyon et alentours seulement).
              </p>
              <p className="text-lg font-semibold">
                Nous avons notamment besoin de :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {items.map((item, i) => (
                  <p
                    key={i}
                    className="border-l-4 border-[var(--color-primary)] pl-3 text-[var(--color-quaternary)]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section className="p-8 md:p-10 flex flex-col items-center justify-center gap-6">
            <Button
              href="https://www.helloasso.com/associations/sans-croquettes-fixes/formulaires/1"
              variant="primary"
              size="lg"
            >
              Faire un don
            </Button>
            <p className="text-sm text-[var(--color-quaternary)]/80">
              Sécurisé via HelloAsso • Reçu fiscal automatique
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
