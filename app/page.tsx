"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";
import Button from "@/components/ui/Button";
import AdoptionPostCard from "@/components/adoptionPost/AdoptionPostCard";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import ArticleCard from "@/components/ArticleCard";

export default function displayIndex() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const endValues = [10, 5, 18];
  const suffixes = [
    "ans d'engagement",
    "animaux sauvés",
    "tonnes de croquettes distribuées",
  ];

  return (
    <div>
      <header className="bg-[url('/assets/img/background-1.jpg')] bg-center">
        <div className="container">
          <Navbar />
          <section className="flex flex-col items-start justify-center gap-6 py-24 md:py-32 max-w-xl md:max-w-2xl lg:py-48 lg:max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Chaque animal porte une histoire. <br /> Et si vous écriviez la
              suite avec lui ?
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-[var(--color-secondary)]/90 leading-relaxed max-w-sm md:max-w-md lg:max-w-lg">
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
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 size-12 rounded-xl cursor-pointer bg-[var(--color-primary)] fill-[var(--color-secondary)] border border-2 border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:fill-[var(--color-primary)] transition-colors duration-200 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-[25px] h-[25px]"
          >
            <path d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z" />
          </svg>
        </button>
      </header>

      <main className="flex flex-col items-center justify-center">
        <section className="container flex flex-col gap-12">
          <HeadingSecondary
            headingVariant="primary"
            underlineVariant="primary"
            children="Nos dernières annonces d'adoption"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AdoptionPostCard
              imageUrl="./assets/animals/animal-1.jpg"
              title="Minou et Coco"
              description="Deux chatons adorables, pleins de vie et de tendresse, cherchent une famille aimante pour les accueillir."
              attributes={[{ age: "13 ans | 1 an" }, { sex: "M | F" }]}
              tags={["Atypique", "Duo", "Senior"]}
              followUp={[
                "✓ Vaccinés",
                "✓ Castrés",
                "✓ Déparasités",
                "✓ Identifiés",
              ]}
              price="120€"
              link="/adoption-posts/view/1"
            />
            <AdoptionPostCard
              imageUrl="./assets/animals/animal-2.jpg"
              title="Tigrou"
              description="Tigrou est un chat très affectueux qui adore les câlins. Il est parfait pour une famille avec enfants."
              attributes={[{ age: "2 ans" }, { sex: "M" }]}
              tags={[]}
              followUp={[
                "✓ Vaccinés",
                "✓ Castrés",
                "✓ Déparasités",
                "✓ Identifiés",
              ]}
              price="80€"
              link="/adoption-posts/view/2"
            />
            <AdoptionPostCard
              imageUrl="./assets/animals/animal-3.jpg"
              title="Max et Luna"
              description="Max et Luna sont inséparables. Ces deux chats adorables rêvent d'une maison chaleureuse où vivre ensemble."
              attributes={[{ age: "1 mois | 3 ans" }, { sex: "M | F" }]}
              tags={["Chaton", "Duo"]}
              followUp={[
                "✓ Vaccinés",
                "✓ Castrés",
                "✓ Déparasités",
                "✓ Identifiés",
              ]}
              price="140€"
              link="/adoption-posts/view/3"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center">
            <Button href="/adoption-posts" variant="primary" size="lg">
              Voir toutes les annonces
            </Button>
          </div>
        </section>
        <section className="container flex flex-col gap-12">
          <HeadingSecondary
            headingVariant="primary"
            underlineVariant="primary"
            children="Qui sommes-nous ?"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
            <div className="flex flex-col gap-6">
              <div className="space-y-6 leading-relaxed text-lg text-[var(--color-quaternary)]">
                <p>
                  Sans Croquettes Fixes est une association à but non lucratif
                  basée à Lyon, engagée dans une grande partie de la région
                  Auvergne-Rhône-Alpes et parfois au-delà. Notre mission est de{" "}
                  {""}
                  <strong>venir en aide aux animaux en détresse</strong>, tout
                  en soutenant les personnes qui en prennent soin au quotidien.
                </p>
                <p>
                  Nos actions s'articulent autour de plusieurs axes : l'
                  <strong>accompagnement des propriétaires d'animaux</strong> en
                  difficulté, la {""}
                  <strong>prise en charge de chats</strong> sans solution,
                  l'organisation de {""}
                  <strong>campagnes de stérilisation</strong>, ainsi que la{" "}
                  <strong>distribution gratuite de croquettes</strong>.
                </p>
                <p>
                  N'hésitez pas à nous soutenir en{" "}
                  <strong>faisant un don</strong>, en{" "}
                  <strong>devenant bénévole</strong> ou en{" "}
                  <strong>devenant un foyer d'accueil</strong> pour nos
                  compagnons à quatre pattes. Chaque geste compte pour nous
                  aider à poursuivre notre mission et à offrir une vie meilleure
                  aux animaux dans le besoin.
                </p>
                <p className="border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 px-6 py-4 rounded-r-xl font-semibold text-[var(--color-quaternary)]">
                  Nous sommes une asso 100 % bénévole : ici, chaque don sert
                  directement à soigner et protéger les animaux les plus
                  fragiles. Ce sont vos dons qui nous permettent de changer leur
                  quotidien.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/about" variant="secondary" size="lg">
                  En savoir plus
                </Button>
                <Button href="/donation" variant="primary" size="lg">
                  Nous soutenir
                </Button>
              </div>
            </div>
            <img
              src="assets/img/background-2.jpg"
              alt=""
              className="rounded-xl object-cover"
            />
          </div>
        </section>
        <section className="container flex flex-col gap-12">
          <HeadingSecondary
            headingVariant="primary"
            underlineVariant="primary"
            children="Nos derniers articles"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ArticleCard
              imageUrl="assets/articles/article-1.jpg"
              title="Un lieu pour les chats oubliés : l'appel aux dons de Sans Croquettes Fixes"
              date="25 juillet 2025"
              description="À l'abri des regards, certains chats errants n'ont plus aucune solution : trop âgés, malades ou trop craintifs pour être adoptés. C'est pour eux que l'association Sans Croquettes Fixes lance le projet Les Félins de l'Ombre..."
              link=""
            />
            <ArticleCard
              imageUrl="assets/articles/article-2.jpg"
              title="Sans Croquettes Fixes : les distributions continuent même pendant l'été"
              date="25 juillet 2025"
              description="Même en plein cœur de l'été, l'association Sans Croquettes Fixes ne baisse pas les bras. Chaque semaine, ses bénévoles poursuivent leurs distributions de nourriture..."
              link=""
            />
            <ArticleCard
              imageUrl="assets/articles/article-3.jpg"
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
        <section className="container">
          <div className="grid md:grid-cols-[0.95fr_1.05fr] items-center">
            <img
              src="assets/img/background-4.jpg"
              alt="Les félins de l'ombre"
              className="hidden md:block object-cover rounded-tl-xl rounded-bl-xl md:h-[500px]"
            />
            <div className="bg-[var(--color-quaternary)] px-6 py-12 md:px-16 md:py-32 rounded-xl flex flex-col gap-12 items-center justify-center">
              <HeadingSecondary
                headingVariant="secondary"
                underlineVariant="primary"
                children="Les félins de l'ombre"
              />
              <p className="md:text-2xl text-center md:text-left leading-relaxed text-xl">
                En 2025, à l’occasion de nos 10 ans, nous nous lançons dans une
                toute nouvelle aventure. Ce projet prend la forme d’un{" "}
                <strong>lieu de vie pour les chats</strong> trop souvent
                oubliés, qui n’ont malheureusement pas la possibilité d’être
                adoptés, mais qui ne sont pas en mesure de vivre en totale
                liberté. Pour plus d’informations sur le projet, nous vous
                invitons à vous rendre directement sur le page de notre levée de
                fonds en cliquant {""}
                <a
                  href="https://www.helloasso.com/associations/sans-croquettes-fixes/collectes/aidez-nous-a-batir-un-lieu-pour-des-chats-oublies"
                  className="text-[var(--color-tertiary)] hover:underline font-bold"
                >
                  ici
                </a>
                .
              </p>
            </div>
          </div>
        </section>
        <section className="bg-[var(--color-tertiary)]/10 rounded-xl text-[var(--color-quaternary)] w-full">
          <div className="container">
            <div className="flex flex-col items-center justify-center gap-8">
              <HeadingSecondary
                headingVariant="primary"
                underlineVariant="secondary"
                children="Comment vous remercier ?"
              />

              <p className="text-lg md:text-xl text-center">
                Grâce à votre aide, notre association a pu apporter une aide
                significative à des milliers d'animaux et leurs humains et
                continue de le faire chaque jour.
              </p>

              <ul className="flex gap-12 md:gap-24 flex-col md:flex-row">
                {endValues.map((endValue, i) => (
                  <li
                    key={i}
                    className="flex flex-col items-center text-lg"
                    ref={ref}
                  >
                    <span>
                      {i !== 0 ? "+" : ""}
                      {isInView ? <CountUp end={endValue} duration={2} /> : 0}
                      {i !== 0 ? "K" : ""}
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
    </div>
  );
}