"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import HeadingTertiary from "@/components/ui/HeadingTertiary";
import Button from "@/components/ui/Button";

export default function About() {
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
            <HeadingSecondary>À propos de nous</HeadingSecondary>
          </div>
        </section>
        <Button up={true} />
      </header>

      <main>
        <section className="container flex flex-col gap-12 text-[var(--color-quaternary)]">
          <div className="relative">
            <span className="absolute md:left-[1rem] lg:left-[9rem] xl:left-[17rem] top-[-3rem]">
              &ldquo;
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Parce que l'abandon ne devrait jamais être une solution
            </h2>
            <span className="absolute right-0 md:right-[1rem] lg:right-[9rem] xl:right-[17rem] top-0">
              &rdquo;
            </span>
          </div>
          <div className="leading-10 text-lg mx-auto max-w-4xl flex flex-col gap-6">
            <p>
              L’association Sans Croquettes Fixes est née autour de cette
              conviction. À l'origine, c'était quelques mains tendues pour
              distribuer gratuitement de la nourriture aux animaux des
              sans-abri. Avec le temps, l'association est devenue un refuge au
              sens large : un lieu sûr pour les animaux qui n'avaient plus nul
              part où aller, et un soutien pour ceux qui, malgré les
              difficultés, refusaient de baisser les bras.
            </p>
            <p>
              Nous sommes une association à but non lucratif (loi 1901) qui
              porte secours aux animaux en difficulté, en les plaçant dans des
              familles d'accueil. Une fois qu'ils sont prêts, aussi bien
              physiquement que psychologiquement, nous les proposons à
              l'adoption. Pour le moment, nos prises en charge concernent
              uniquement les chats. Toutes nos actions sont faites bénévolement.
              Nous ne sommes ni un refuge, ni une entreprise, mais une équipe
              engagée pour le bien-être des humains et de leurs compagnons.
            </p>
          </div>
          <div className="leading-10 text-lg mx-auto max-w-4xl flex flex-col gap-6">
            <HeadingTertiary
              headingVariant="primary"
              underlineVariant="primary"
              children="Les débuts de Sans Croquettes Fixes"
            />
            <p>
              Tout a commencé en <strong>2015</strong> à la suite d’échanges
              avec des associations effectuant des maraudes auprès des personnes
              sans-abri. Une question s'est alors posée :{" "}
              <strong>
                qui prend soin des animaux des personnes à la rue ?
              </strong>{" "}
              Face à l'absence de réponse, Hélène et Anaïs ont décidé d'agir.
              Aux côtés de l’association <strong>La Main Tendue</strong>, elles
              ont lancé les premières distributions grâce au soutien de
              vétérinaires, de particuliers et de commerces locaux. Ces actions
              ont permis non seulement d’apporter de la nourriture, mais aussi
              de créer un lien de confiance avec les bénéficiaires et leurs
              animaux. <br /> Au fil des années, nos actions se sont élargies.
              La <strong>distribution hebdomadaire de croquettes à Lyon</strong>{" "}
              reste au cœur de notre mission, mais la{" "}
              <strong>prise en charge de chats en difficulté</strong> a pris une
              place grandissante. Depuis nos débuts, nous avons toujours fait le
              choix de garder une{" "}
              <strong>dimension profondément humaine</strong>. Derrière un
              animal en souffrance, il y a souvent une personne en détresse.
              L’association s’attache ainsi à accompagner les deux, avec
              bienveillance, écoute et respect.
            </p>
            <div className="flex flex-col items-center">
              <img
                src="/assets/img/signature.png"
                alt="Signature Anaïs Hillion"
                className="w-[250px]"
              />
              <p className="text-lg font-semibold">
                Anaïs Hillion, co-fondatrice de Sans Croquettes Fixes
              </p>
            </div>
          </div>
        </section>

        <section className="container bg-[var(--color-quaternary)] flex flex-col gap-6">
          <HeadingTertiary
            headingVariant="secondary"
            underlineVariant="primary"
            children="Notre vision"
          />
          <p className="leading-10 text-lg mx-auto max-w-4xl">
            Chez Sans Croquettes Fixes, nous croyons que la protection animale
            passe aussi par la solidarité humaine. C'est pourquoi nous
            accompagnons celles et ceux qui n'arrivent plus à subvenir aux
            besoins de leur compagnon, en leur apportant soutien, conseils et
            présence. Notre mission ne se limite pas à donner quelques
            croquettes ou faire une prise en charge, elle vise aussi à redonner
            espoir et à s'inscrire dans une vision long terme.
          </p>
        </section>

        <section className="container flex flex-col gap-12">
          <HeadingTertiary
            headingVariant="primary"
            underlineVariant="primary"
            children="Nos actions"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
            <article className="rounded-xl border border-gray-100 p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/assets/img/icone-1.png"
                  alt="Prise en charge"
                  className="w-16"
                />
                <h3 className="text-xl font-semibold">Prise en charge</h3>
              </div>
              <p className="text-center leading-relaxed text-[var(--color-quaternary)]/75">
                Les chats malades, âgés ou abandonnés sont recueillis et soignés
                par l’association, qui leur offre sécurité et parfois une
                seconde chance.
              </p>
            </article>

            <article className="rounded-xl border border-gray-100 p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/assets/img/icone-2.png"
                  alt="Distribution"
                  className="w-16"
                />
                <h3 className="text-xl font-semibold">Distribution</h3>
              </div>
              <p className="text-center leading-relaxed text-[var(--color-quaternary)]/75">
                Chaque vendredi, une distribution gratuite de croquettes aide
                les familles en difficulté à nourrir leurs animaux.
              </p>
            </article>

            <article className="rounded-xl border border-gray-100 p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/assets/img/icone-3.png"
                  alt="Stérilisation"
                  className="w-16"
                />
                <h3 className="text-xl font-semibold">Stérilisation</h3>
              </div>
              <p className="text-center leading-relaxed text-[var(--color-quaternary)]/75">
                Toute l’année, nous menons des campagnes de stérilisation avec
                les communes afin de limiter la prolifération des chats errants
                et d’améliorer leur qualité de vie.
              </p>
            </article>

            <article className="rounded-xl border border-gray-100 p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/assets/img/icone-4.png"
                  alt="Accompagnement"
                  className="w-16"
                />
                <h3 className="text-xl font-semibold">Accompagnement</h3>
              </div>
              <p className="text-center leading-relaxed text-[var(--color-quaternary)]/75">
                Nous accompagnons les particuliers confrontés à des difficultés
                avec leurs animaux grâce à une écoute, des conseils et des
                solutions adaptées, afin d'éviter les abandons et ne recourir à
                une prise en charge qu'en dernier recours.
              </p>
            </article>

            <article className="rounded-xl border border-gray-100 p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/assets/img/icone-5.png"
                  alt="Sensibilisation"
                  className="w-16"
                />
                <h3 className="text-xl font-semibold">Sensibilisation</h3>
              </div>
              <p className="text-center leading-relaxed text-[var(--color-quaternary)]/75">
                Nous participons régulièrement à des événements pour
                sensibiliser le public à la cause animale et au bien-être de
                tous les animaux.
              </p>
            </article>
          </div>
        </section>

        <section className="container flex flex-col gap-12 text-[var(--color-quaternary)]">
          <HeadingTertiary
            headingVariant="primary"
            underlineVariant="primary"
            children="Derrière chaque sauvetage, une rencontre inoubliable"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <article className="overflow-hidden rounded-xl border border-gray-100 flex flex-wrap">
              <div className="flex sm:flex-row">
                <div className="flex-1">
                  <img
                    src="/assets/animals/animal-6.jpg"
                    alt="Mambo"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 p-5 md:p-6 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold md:text-xl">Mambo</h3>
                  <p className="text-sm">En famille d'accueil</p>
                  <p className="leading-relaxed text-[var(--color-quaternary)]">
                    Atteint d'une malformation très rare, Mambo a eu besoin
                    d'importantes chirurgies que nous avons pu financer grâce à
                    votre soutien.
                  </p>
                </div>
              </div>
            </article>
            <article className="overflow-hidden rounded-xl border border-gray-100 flex flex-wrap">
              <div className="flex sm:flex-row">
                <div className="flex-1">
                  <img
                    src="/assets/animals/animal-7.jpg"
                    alt="Puppy"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 p-5 md:p-6 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold md:text-xl">Puppy</h3>
                  <p className="text-sm">En soin</p>
                  <p className="leading-relaxed text-[var(--color-quaternary)]">
                    Trouvée à 500gr avec un prolapsus et deux fémurs cassés,
                    aucune association n'a voulu tenter de la prendre en charge,
                    mais grâce à vous, elle a pu être sauvée.
                  </p>
                </div>
              </div>
            </article>
            <article className="overflow-hidden rounded-xl border border-gray-100 flex flex-wrap">
              <div className="flex sm:flex-row">
                <div className="flex-1">
                  <img
                    src="/assets/animals/animal-8.jpeg"
                    alt="Kiki"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 p-5 md:p-6 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold md:text-xl">Kiki</h3>
                  <p className="text-sm">En famille d'accueil</p>
                  <p className="leading-relaxed text-[var(--color-quaternary)]">
                    Suite à l'hospitalisation longue durée de son humain, Kiki
                    s'est retrouvé sans solution. Nous l'avons récupéré et placé
                    en famille d'accueil.
                  </p>
                </div>
              </div>
            </article>
            <article className="overflow-hidden rounded-xl border border-gray-100 flex flex-wrap">
              <div className="flex sm:flex-row">
                <div className="flex-1">
                  <img
                    src="/assets/animals/animal-9.jpg"
                    alt="Pépinette"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 p-5 md:p-6 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold md:text-xl">
                    Pépinette
                  </h3>
                  <p className="text-sm">En famille d'accueil</p>
                  <p className="leading-relaxed text-[var(--color-quaternary)]">
                    Après un long traitement PIF, Pépinette est enfin en
                    rémission et s'adapte peu à peu à la vie en famille.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-[var(--color-tertiary)] p-8 flex flex-col items-center gap-6">
          <h3 className="text-2xl md:text-3xl font-bold">
            Vous avez besoin d'aide ?
          </h3>
          <p className="text-lg max-w-3xl text-center">
            Vous faites face à une situation compliquée et vous avez besoin d'un
            coup de main pour prendre soin de vos animaux ? Vous êtes témoin
            d'une situation d'urgence pour un animal en danger ?
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Contactez-nous
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
