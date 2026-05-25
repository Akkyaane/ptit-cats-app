"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";
import Button from "@/components/ui/Button";
import AdoptionPostCarousel from "@/components/adoptionPost/AdoptionPostCarousel";
import HeadingPrimary from "@/components/ui/HeadingPrimary";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import ArticleCard from "@/components/ArticleCard";
import Card from "@/components/ui/Card";
import Image from "next/image";

export default function Index() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "150px" });
  const endValues = [10, 5, 18];
  const suffixes = [
    "ans d'engagement",
    "animaux sauvés",
    "tonnes de croquettes distribuées",
  ];

  return (
    <>
      <header className="bg-[url('/assets/img/background-1.jpg')] bg-center">
        <div className="container">
          <Navbar />
          <section
            aria-label="Présentation"
            className="flex flex-col items-start justify-center gap-6 py-24 md:py-32 max-w-2xl md:max-w-3xl lg:py-48 lg:max-w-4xl"
          >
            <HeadingPrimary>
              Chaque animal porte une histoire. <br /> Et si vous écriviez la
              suite avec lui ?
            </HeadingPrimary>
            <p className="text-lg md:text-xl lg:text-2xl text-secondary/90 leading-relaxed max-w-lg md:max-w-xl lg:max-w-2xl">
              Découvrez nos compagnons à quatre pattes qui attendent de
              rencontrer leur humain pour la vie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button href="/adoption-posts" variant="secondary" size="lg">
                Découvrir nos compagnons
              </Button>
              <Button href="/pet-matchmaker" variant="primary" size="lg">
                Trouver mon compagnon idéal
              </Button>
            </div>
          </section>
        </div>
      </header>

      <main className="flex flex-col items-center gap-12 md:gap-16 lg:gap-24">
        <section aria-label="Nos dernières annonces d'adoption" className="container flex flex-col gap-12">
          <HeadingSecondary headingVariant="primary" underlineVariant="primary">
            Nos dernières annonces d'adoption
          </HeadingSecondary>
          <AdoptionPostCarousel
            items={[
              {
                imageUrl: "/assets/animals/animal-1.jpg",
                title: "Minou et Coco",
                description:
                  "Deux chatons adorables, pleins de vie et de tendresse, cherchent une famille aimante pour les accueillir.",
                attributes: [{ age: "13 ans | 1 an" }, { sex: "M | F" }],
                tags: ["Atypique", "Duo", "Senior"],
                followUp: [
                  "✓ Vaccinés",
                  "✓ Castrés",
                  "✓ Déparasités",
                  "✓ Identifiés",
                ],
                price: "120€",
                link: "/adoption-posts/view/1",
              },
              {
                imageUrl: "/assets/animals/animal-2.jpg",
                title: "Tigrou",
                description:
                  "Tigrou est un chat très affectueux qui adore les câlins. Il est parfait pour une famille avec enfants.",
                attributes: [{ age: "2 ans" }, { sex: "M" }],
                tags: [],
                followUp: [
                  "✓ Vaccinés",
                  "✓ Castrés",
                  "✓ Déparasités",
                  "✓ Identifiés",
                ],
                price: "80€",
                link: "/adoption-posts/view/2",
              },
              {
                imageUrl: "/assets/animals/animal-3.jpg",
                title: "Max et Luna",
                description:
                  "Max et Luna sont inséparables. Ces deux chats adorables rêvent d'une maison chaleureuse où vivre ensemble.",
                attributes: [{ age: "1 mois | 3 ans" }, { sex: "M | F" }],
                tags: ["Chaton", "Duo"],
                followUp: [
                  "✓ Vaccinés",
                  "✓ Castrés",
                  "✓ Déparasités",
                  "✓ Identifiés",
                ],
                price: "140€",
                link: "/adoption-posts/view/3",
              },
              {
                imageUrl: "/assets/animals/animal-3.jpg",
                title: "Max et Luna",
                description:
                  "Max et Luna sont inséparables. Ces deux chats adorables rêvent d'une maison chaleureuse où vivre ensemble.",
                attributes: [{ age: "1 mois | 3 ans" }, { sex: "M | F" }],
                tags: ["Chaton", "Duo"],
                followUp: [
                  "✓ Vaccinés",
                  "✓ Castrés",
                  "✓ Déparasités",
                  "✓ Identifiés",
                ],
                price: "140€",
                link: "/adoption-posts/view/3",
              },
              {
                imageUrl: "/assets/animals/animal-3.jpg",
                title: "Max et Luna",
                description:
                  "Max et Luna sont inséparables. Ces deux chats adorables rêvent d'une maison chaleureuse où vivre ensemble.",
                attributes: [{ age: "1 mois | 3 ans" }, { sex: "M | F" }],
                tags: ["Chaton", "Duo"],
                followUp: [
                  "✓ Vaccinés",
                  "✓ Castrés",
                  "✓ Déparasités",
                  "✓ Identifiés",
                ],
                price: "140€",
                link: "/adoption-posts/view/3",
              },
              {
                imageUrl: "/assets/animals/animal-3.jpg",
                title: "Max et Luna",
                description:
                  "Max et Luna sont inséparables. Ces deux chats adorables rêvent d'une maison chaleureuse où vivre ensemble.",
                attributes: [{ age: "1 mois | 3 ans" }, { sex: "M | F" }],
                tags: ["Chaton", "Duo"],
                followUp: [
                  "✓ Vaccinés",
                  "✓ Castrés",
                  "✓ Déparasités",
                  "✓ Identifiés",
                ],
                price: "140€",
                link: "/adoption-posts/view/3",
              },
            ]}
          />
          <div className="flex flex-col sm:flex-row justify-center">
            <Button href="/adoption-posts" variant="primary" size="lg">
              Voir toutes les annonces
            </Button>
          </div>
        </section>
        <section aria-label="Qui sommes-nous ?" className="container flex flex-col gap-12">
          <HeadingSecondary headingVariant="primary" underlineVariant="primary">
            Qui sommes-nous ?
          </HeadingSecondary>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-8">
            <div className="flex flex-col gap-6">
              <div className="space-y-4 md:space-y-6 leading-relaxed text-base md:text-lg ">
                <p>
                  Sans Croquettes Fixes est une association à but non lucratif
                  basée à Lyon, engagée dans une grande partie de la région
                  Auvergne-Rhône-Alpes et au-delà. Notre mission est de venir en
                  aide aux animaux en détresse, tout en soutenant les personnes
                  qui en prennent soin au quotidien.
                </p>
                <p>
                  Nos actions s'articulent autour de plusieurs axes :
                  l'accompagnement des propriétaires d'animaux en difficulté, la
                  prise en charge de chats sans solution, l'organisation de
                  campagnes de stérilisation, ainsi que la distribution gratuite
                  de croquettes.
                </p>
                <p className="border-l-4 border-primary bg-primary/5 px-4 md:px-6 py-3 md:py-4 rounded-r-xl font-semibold text-base md:text-lg ">
                  Nous sommes une asso 100 % bénévole : ici, chaque don sert
                  directement à soigner et protéger les animaux les plus
                  fragiles. Ce sont vos dons qui nous permettent de changer leur
                  quotidien.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button href="/about" variant="secondary" size="lg">
                  En savoir plus
                </Button>
                <Button href="/donation" variant="primary" size="lg">
                  Nous soutenir
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-xl w-full h-[800px] md:h-[600px] md:w-[500px] lg:mx-auto overflow-hidden">
                <Image
                  src="/assets/img/background-5.jpg"
                  alt="Photo de chats Sans Croquettes Fixes"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
              <div className="absolute inset-x-4 -bottom-12 md:bottom-4 grid gap-4 grid-cols-1 lg:grid-cols-3 text-center w-fit ml-auto">
                <Card
                  imageUrl="/assets/img/icone-7.png"
                  title="Faire un don"
                  description="Pour financer les soins de nos compagnons, nous avons
 besoin de dons."
                />
                <Card
                  imageUrl="/assets/img/icone-9.png"
                  title="Devenir un foyer d'accueil"
                  description="Nos compagnons sont hébergés temporairement dans des
 familles d'accueil avant d'être adoptés."
                />
                <Card
                  imageUrl="/assets/img/icone-8.png"
                  title="Devenir bénévole"
                  description="Toutes nos actions sont rendues possibles grâce à nos
 bénévoles."
                />
              </div>
            </div>
          </div>
        </section>
        <section aria-label="Nos derniers articles" className="container flex flex-col gap-12">
          <HeadingSecondary headingVariant="primary" underlineVariant="primary">
            Nos derniers articles
          </HeadingSecondary>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <ArticleCard
              imageUrl="/assets/articles/article-1.jpg"
              title="Un lieu pour les chats oubliés : l'appel aux dons de Sans Croquettes Fixes"
              date="25 juillet 2025"
              description="À l'abri des regards, certains chats errants n'ont plus aucune solution : trop âgés, malades ou trop craintifs pour être adoptés. C'est pour eux que l'association Sans Croquettes Fixes lance le projet Les Félins de l'Ombre..."
              link=""
            />
            <ArticleCard
              imageUrl="/assets/articles/article-2.jpg"
              title="Sans Croquettes Fixes : les distributions continuent même pendant l'été"
              date="25 juillet 2025"
              description="Même en plein cœur de l'été, l'association Sans Croquettes Fixes ne baisse pas les bras. Chaque semaine, ses bénévoles poursuivent leurs distributions de nourriture..."
              link=""
            />
            <ArticleCard
              imageUrl="/assets/articles/article-3.jpg"
              title="Comment protéger son chat du soleil ?"
              date="25 juillet 2025"
              description="Lorsque les températures montent, votre chat aussi peut souffrir du soleil. Contrairement à une idée reçue, son pelage ne le protège pas toujours totalement..."
              link=""
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center">
            <Button href="/blog" variant="primary" size="lg">
              Voir tous les articles
            </Button>
          </div>
        </section>
        <section aria-label="Les félins de l'ombre" className="container">
          <div className="grid md:grid-cols-[0.95fr_1.05fr] items-center">
            <div className="relative hidden md:block rounded-tl-xl rounded-bl-xl md:h-[500px] overflow-hidden">
              <Image
                src="/assets/img/background-4.jpg"
                alt="Les félins de l'ombre"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="bg-quaternary px-6 py-12 md:px-16 md:py-32 rounded-xl flex flex-col gap-12 items-center justify-center">
              <HeadingSecondary
                headingVariant="secondary"
                underlineVariant="primary"
              >
                Les félins de l'ombre
              </HeadingSecondary>
              <p className="text-xl md:text-2xl text-center md:text-left leading-relaxed text-secondary">
                En 2025, à l’occasion de nos 10 ans, nous nous lançons dans une
                toute nouvelle aventure : la création d’un{" "}
                <strong>lieu de vie dédié aux chats</strong> trop souvent
                oubliés, qui n’ont malheureusement pas la possibilité d’être
                adoptés et ne peuvent pas vivre en totale liberté. Pour plus
                d’informations sur ce projet, nous vous invitons à vous rendre
                directement sur la page HelloAsso de notre levée de fonds en
                cliquant {""}
                <a
                  href="https://www.helloasso.com/associations/sans-croquettes-fixes/collectes/aidez-nous-a-batir-un-lieu-pour-des-chats-oublies"
                  className="text-tertiary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary font-bold"
                >
                  ici
                </a>
                .
              </p>
            </div>
          </div>
        </section>
        <section aria-label="Comment vous remercier" className="bg-tertiary/10 w-full">
          <div className="container py-16 md:py-24">
            <div className="flex flex-col items-center justify-center gap-8">
              <HeadingSecondary
                headingVariant="primary"
                underlineVariant="secondary"
              >
                Comment vous remercier ?
              </HeadingSecondary>

              <p className="text-lg md:text-xl max-w-4xl text-center">
                Depuis 2015, grâce à votre aide, notre association a pu apporter
                une aide significative à des milliers d'animaux et leurs humains
                et continue de le faire chaque jour.
              </p>

              <ul
                aria-label="Statistiques clés"
                className="flex gap-12 md:gap-24 flex-col md:flex-row"
              >
                {endValues.map((endValue, i) => (
                  <li key={suffixes[i]} className="flex flex-col items-center text-lg">
                    <span
                      ref={ref}
                      aria-hidden="true"
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
                    >
                      {i !== 0 ? "+" : ""}
                      {isInView ? <CountUp end={endValue} duration={2} /> : 0}
                      {i !== 0 ? "K" : ""}
                    </span>
                    <span
                      className="sr-only"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {isInView
                        ? `${i !== 0 ? "+" : ""}${endValue}${i !== 0 ? "K" : ""} ${suffixes[i]}`
                        : ""}
                    </span>
                    {suffixes[i]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Button up={true} />
    </>
  );
}
