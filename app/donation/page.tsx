import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadingPrimary from "@/components/ui/HeadingPrimary";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
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
    <>
      <header className="bg-[url('/assets/img/background-1.jpg')]">
        <div className="container relative">
          <Image
            src="/assets/img/icone-10.svg"
            alt=""
            aria-hidden={true}
            width={384}
            height={384}
            className="hidden lg:block absolute top-20 right-8 xl:right-24 w-72 xl:w-96"
          />
          <Navbar />
          <div className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 lg:py-40">
            <HeadingPrimary>Nous soutenir</HeadingPrimary>
          </div>
        </div>
      </header>

      <main className="container flex flex-col gap-12 md:gap-16 lg:gap-24">
        <section aria-label="Faites un don pour nos pensionnaires" className="p-8 md:p-10 flex flex-col gap-12">
          <HeadingSecondary
            headingVariant="primary"
            underlineVariant="primary"
            children="Faites un don pour nos pensionnaires"
          />
          <div className="md:text-lg leading-relaxed md:leading-8 flex flex-col gap-6 ">
            <p>
              Soutenez notre projet en faisant un don : chaque contribution,
              même modeste, nous permet d’avancer. Les dons financiers nous
              servent à couvrir les frais vétérinaires de nos animaux, à
              financer du matériel, à organiser des actions locales et à faire
              vivre notre engagement au quotidien. En nous soutenant, vous nous
              aidez à rester indépendants, réactifs et engagés sur le long
              terme.
            </p>
            <p>
              Les dons se font via la plateforme <strong>HelloAsso</strong> et
              sont entièrement sécurisés. Votre reçu fiscal est automatiquement
              généré par la plateforme. L’association Sans Croquettes Fixes est
              reconnue d’<strong>intérêt général</strong>, tous vos dons peuvent
              potentiellement vous donner droit à une{" "}
              <strong>déduction fiscale</strong>.
            </p>
          </div>
        </section>

        <section aria-label="Et les dons matériels ?" className="p-4 md:p-8 flex flex-col gap-12">
          <HeadingSecondary
            headingVariant="primary"
            underlineVariant="primary"
            children="Et les dons matériels ?"
          />
          <div className="md:text-lg leading-relaxed md:leading-8 flex flex-col gap-6">
            <p>
              Vous avez du matériel inutilisé ou en bon état que vous souhaitez
              transmettre ? On en a peut-être besoin ! Pour nous faire un don
              matériel, contactez-nous via notre page de{" "}
              <a href="/contact" className="text-primary underline">
                contact
              </a>
              . Nous reviendrons vers vous rapidement pour organiser la
              récupération ou l’envoi (Lyon et alentours seulement).
            </p>
            <p className="text-lg font-semibold">
              Nous avons notamment besoin de :
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 list-none">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-primary/10 px-4 py-3"
                >
                  <span aria-hidden="true" className="mt-0.5 text-primary font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 md:p-8 flex flex-col items-center justify-center gap-6">
            <Button
              href="https://www.helloasso.com/associations/sans-croquettes-fixes/formulaires/1"
              variant="primary"
              size="lg"
            >
              Faire un don
            </Button>
            <p className="text-sm text-quaternary/80">
              Sécurisé via HelloAsso • Reçu fiscal automatique
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <Button up={true} />
    </>
  );
}
