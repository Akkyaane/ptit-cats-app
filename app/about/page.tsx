import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import Heading from "@/components/ui/Heading";

export default function About() {
  return (
    <>
      <header className="bg-[url('/assets/img/backgrounds/background-2.jpg')] bg-cover bg-center">
        <div className="container relative">
          <div className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 lg:py-40">
            <Heading type="h1" headingVariant="secondary">
              À propos de nous
            </Heading>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-12 md:gap-16 lg:gap-24">
        <Breadcrumb />
        <section className="container flex flex-col gap-12" aria-label="A propos de nous" >
          <blockquote className="mx-auto max-w-2xl text-center">
            <span
              aria-hidden="true"
              className="block text-[7rem] leading-[1] text-primary -mb-4"
            >
              &ldquo;
            </span>
            <p className="text-2xl md:text-3xl font-bold italic leading-snug">
              Parce que l'abandon ne devrait jamais être une solution
            </p>
          </blockquote>
          <div className="leading-loose text-lg mx-auto max-w-4xl flex flex-col gap-6">
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
              Sans Croquettes Fixes est une{" "}
              <strong>association à but non lucratif (loi 1901)</strong> portant
              secours aux animaux en difficulté. Placés en famille d'accueil,
              les animaux reçoivent les soins nécessaires et un environnement
              sécurisé. Une fois qu'ils sont prêts, aussi bien physiquement que
              psychologiquement, ils sont proposés à l'adoption. Pour le moment,
              nos prises en charge concernent uniquement les chats. Toutes nos
              actions sont faites bénévolement. Nous ne sommes ni un refuge, ni
              une entreprise, mais une équipe engagée pour le bien-être des
              humains et de leurs compagnons.
            </p>
          </div>
        </section>

        <section className="bg-quaternary" aria-label="Notre vision">
          <div className="container flex flex-col gap-6 py-16 md:py-24">
            <Heading type="h2" headingVariant="secondary" underlineVariant="tertiary">
              Notre vision
            </Heading>
            <p className="leading-loose text-lg mx-auto max-w-4xl text-secondary">
              Chez Sans Croquettes Fixes, nous croyons que la protection animale
              passe aussi par la solidarité humaine. C'est pourquoi nous
              accompagnons celles et ceux qui n'arrivent plus à subvenir aux
              besoins de leur compagnon, en leur apportant du soutien et des
              conseils. Notre mission ne se limite pas à donner quelques
              croquettes ou prendre en charge des animaux, elle vise aussi à
              redonner espoir et à s'inscrire dans une vision long terme.
            </p>
          </div>
        </section>

        <section className="container flex flex-col gap-12" aria-label="Nos actions" >
          <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">
            Nos actions
          </Heading>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <article className="rounded-xl border border-gray-100 p-6 flex flex-col items-center gap-4">
              <Image
                src="/assets/img/icons/icon-1.png"
                alt="Prise en charge"
                width={64}
                height={64}
                className="w-16 h-auto"
              />
              <p className="text-center leading-relaxed text-quaternary/90">
                Les chats malades, âgés ou abandonnés sont recueillis et soignés
                par l’association, qui leur offre sécurité et parfois une
                seconde chance.
              </p>
            </article>

            <article className="rounded-xl border border-gray-100 p-6 flex flex-col items-center gap-4">
              <Image
                src="/assets/img/icons/icon-2.png"
                alt="Distribution"
                width={64}
                height={64}
                className="w-16 h-auto"
              />
              <p className="text-center leading-relaxed text-quaternary/90">
                Chaque vendredi, une distribution gratuite de croquettes aide
                les familles en difficulté à nourrir leurs animaux.
              </p>
            </article>

            <article className="rounded-xl border border-gray-100 p-6 flex flex-col items-center gap-4">
              <Image
                src="/assets/img/icons/icon-3.png"
                alt="Stérilisation"
                width={64}
                height={64}
                className="w-16 h-auto"
              />
              <p className="text-center leading-relaxed text-quaternary/90">
                Toute l’année, nous menons des campagnes de stérilisation avec
                les communes afin de limiter la prolifération des chats errants
                et d’améliorer leur qualité de vie.
              </p>
            </article>

            <article className="rounded-xl border border-gray-100 p-6 flex flex-col items-center gap-4">
              <Image
                src="/assets/img/icons/icon-4.png"
                alt="Accompagnement"
                width={64}
                height={64}
                className="w-16 h-auto"
              />
              <p className="text-center leading-relaxed text-quaternary/90">
                Nous accompagnons les propriétaires d'animaux en difficulté en
                leur apportant du soutien, des conseils et des solutions
                adaptées.
              </p>
            </article>

            <article className="rounded-xl border border-gray-100 p-6 flex flex-col items-center gap-4">
              <Image
                src="/assets/img/icons/icon-5.png"
                alt="Sensibilisation"
                width={64}
                height={64}
                className="w-16 h-auto"
              />
              <p className="text-center leading-relaxed text-quaternary/90">
                Nous participons régulièrement à des événements pour
                sensibiliser le public à la cause animale et au bien-être de
                tous les animaux.
              </p>
            </article>
          </div>
        </section>
        <section className="container flex flex-col gap-12" aria-label="Les débuts de Sans Croquettes Fixes" >

          <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">
            Les débuts de Sans Croquettes Fixes
          </Heading>
          <div className="leading-loose text-lg mx-auto max-w-4xl flex flex-col gap-6">
            <p>
              Tout a commencé en 2015 à la suite d’échanges avec des
              associations effectuant des maraudes auprès des personnes
              sans-abri. Une question s'est alors posée : qui prend soin des
              animaux des personnes à la rue ? Face à l'absence de réponse,
              Hélène et Anaïs ont décidé d'agir. Aux côtés de l’association{" "}
              <strong>La Main Tendue</strong>, elles ont lancé les premières
              distributions grâce au soutien de vétérinaires, de particuliers et
              de commerces locaux. Ces actions ont permis non seulement
              d’apporter de la nourriture, mais aussi de créer un lien de
              confiance avec les bénéficiaires et leurs animaux. <br /> Au fil
              des années, nos actions se sont élargies. La distribution hebdomadaire de croquettes reste au
              cœur de notre mission, mais la prise en charge de chats en difficulté a pris une
              place grandissante. Depuis nos débuts, nous avons toujours fait le
              choix de garder une dimension profondément humaine. Derrière un
              animal en souffrance, il y a souvent une personne en détresse.
              L’association s’attache ainsi à accompagner les deux, avec
              bienveillance, écoute et respect.
            </p>
            <figure className="flex flex-col items-center">
              <Image
                src="/assets/img/signature.png"
                alt=""
                width={250}
                height={100}
                className="w-[250px] h-auto"
              />
              <figcaption className="text-lg font-semibold">
                Anaïs Hillion, co-fondatrice de Sans Croquettes Fixes
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="container flex flex-col gap-12 ">
          <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">
            Derrière chaque sauvetage, une rencontre inoubliable
          </Heading>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <article className="overflow-hidden rounded-xl border border-gray-200 flex flex-row shadow-sm">
              <div className="min-h-48 sm:min-h-0 flex-1 relative">
                <Image
                  src="/assets/img/animals/mambo.jpg"
                  alt="Mambo"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex-1 p-5 md:p-6 flex flex-col gap-2">
                <h3 className="text-lg font-semibold md:text-xl">Mambo</h3>
                <p className="text-sm inline-block self-start bg-tertiary px-3 py-1 rounded-full font-medium">
                  En famille d'accueil
                </p>
                <p className="leading-relaxed ">
                  Atteint d'une malformation très rare, Mambo a eu besoin
                  d'importantes chirurgies financées grâce à votre soutien.
                </p>
              </div>
            </article>
            <article className="overflow-hidden rounded-xl border border-gray-200 flex flex-row shadow-sm">
              <div className="min-h-48 sm:min-h-0 flex-1 relative">
                <Image
                  src="/assets/img/animals/puppy.jpg"
                  alt="Puppy"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex-1 p-5 md:p-6 flex flex-col gap-2">
                <h3 className="text-lg font-semibold md:text-xl">Puppy</h3>
                <p className="text-sm inline-block self-start bg-tertiary px-3 py-1 rounded-full font-medium">
                  En soin
                </p>
                <p className="leading-relaxed ">
                  Trouvée à 500gr avec un prolapsus et deux fémurs cassés,
                  aucune autre association n'a voulu tenter de la prendre en
                  charge, mais grâce à vous, elle a pu être sauvée.
                </p>
              </div>
            </article>
            <article className="overflow-hidden rounded-xl border border-gray-200 flex flex-row shadow-sm">
              <div className="min-h-48 sm:min-h-0 flex-1 relative">
                <Image
                  src="/assets/img/animals/kiki.jpeg"
                  alt="Kiki"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex-1 p-5 md:p-6 flex flex-col gap-2">
                <h3 className="text-lg font-semibold md:text-xl">Kiki</h3>
                <p className="text-sm inline-block self-start bg-tertiary px-3 py-1 rounded-full font-medium">
                  En famille d'accueil
                </p>
                <p className="leading-relaxed ">
                  Suite à l'hospitalisation longue durée de son humain, Kiki
                  s'est retrouvé sans solution. Nous l'avons récupéré et placé
                  en famille d'accueil.
                </p>
              </div>
            </article>
            <article className="overflow-hidden rounded-xl border border-gray-200 flex flex-row shadow-sm">
              <div className="min-h-48 sm:min-h-0 flex-1 relative">
                <Image
                  src="/assets/img/animals/pepinette.jpg"
                  alt="Pépinette"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex-1 p-5 md:p-6 flex flex-col gap-2">
                <h3 className="text-lg font-semibold md:text-xl">Pépinette</h3>
                <p className="text-sm inline-block self-start bg-tertiary px-3 py-1 rounded-full font-medium">
                  En famille d'accueil
                </p>
                <p className="leading-relaxed ">
                  Après un long traitement PIF, Pépinette est enfin en rémission
                  et s'adapte peu à peu à la vie de famille.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-tertiary/10 " aria-label="Vous avez besoin d'aide ?">
          <div className="container flex flex-col items-center gap-6 py-16 md:py-24">
            <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">
              Vous avez besoin d'aide ?
            </Heading>
            <p className="text-lg max-w-3xl text-center">
              Vous faites face à une situation compliquée et vous avez besoin
              d'un coup de main pour prendre soin de vos animaux ? Vous êtes
              témoin d'une situation d'urgence pour un animal en danger ?
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Contactez-nous
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
