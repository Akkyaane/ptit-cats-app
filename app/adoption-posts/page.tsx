import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AdoptionPostCard from "@/components/adoptionPost/AdoptionPostCard";
import Button from "@/components/ui/Button";
import HeadingSecondary from "@/components/ui/HeadingPrimary";
import HeadingTertiary from "@/components/ui/HeadingSecondary";
import { IAdoptionPost } from "@/interfaces/IAdoptionPost";
import { ICat } from "@/interfaces/ICat";

type AdoptionPostApi = IAdoptionPost & {
  documentId?: string;
};

async function getAdoptionPosts() {
  const res = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/api/adoption-posts?populate=*`,
    {
      next: { revalidate: 5 },
    },
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des annonces d'adoption.");
  }

  const response = (await res.json()) as { data: AdoptionPostApi[] };
  return response.data ?? [];
}

function getPhotoUrl(photoPath?: string) {
  if (!photoPath) {
    return "/assets/animals/animal-1.jpg";
  }

  if (photoPath.startsWith("http")) {
    return photoPath;
  }

  return `${process.env.STRAPI_PUBLIC_BASE_URL}${photoPath}`;
}

function formatAge(birthDate?: string) {
  if (!birthDate) {
    return "Inconnu";
  }

  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth() - birth.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
    years -= 1;
  }

  if (years >= 1) {
    return `${years} ${years > 1 ? "ans" : "an"}`;
  }

  const totalMonths =
    (today.getFullYear() - birth.getFullYear()) * 12 +
    (today.getMonth() - birth.getMonth());

  if (totalMonths >= 1) {
    return `${totalMonths} mois`;
  }

  return "< 1 mois";
}

function buildAttributes(cats: ICat[]) {
  const ages = cats.map((cat) => formatAge(cat.birthDate)).join(" | ");
  const sexes = cats.map((cat) => (cat.sex === "Male" ? "M" : "F")).join(" | ");

  const attributes: Record<string, string>[] = [];
  attributes.push({ age: ages });
  attributes.push({ sex: sexes });

  return attributes;
}

function buildFollowUp(cats: ICat[]) {
  const followUp: string[] = [];

  if (cats.length > 0 && cats.every((cat) => cat.isVaccinated)) {
    followUp.push("✓ Vaccinés");
  }
  if (cats.length > 0 && cats.every((cat) => cat.isSterilizedOrCastrated)) {
    followUp.push("✓ Castrés");
  }
  if (cats.length > 0 && cats.every((cat) => cat.isDewormed)) {
    followUp.push("✓ Déparasités");
  }
  if (cats.length > 0 && cats.every((cat) => cat.isIdentified)) {
    followUp.push("✓ Identifiés");
  }

  return followUp;
}

export default async function DisplayAdoptionPosts() {
  const posts = await getAdoptionPosts();

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
            <HeadingSecondary>Nos chats à l'adoption</HeadingSecondary>
          </div>
        </section>
        {/* <Button up={true} /> */}
      </header>

      <main className="">
        <section className="container flex flex-col gap-12">
          <HeadingTertiary headingVariant="primary" underlineVariant="primary">
            Nos annonces d'adoption
          </HeadingTertiary>

          {posts.length === 0 ? (
            <p className="text-center text-lg">
              Aucun chat n'est disponible pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: AdoptionPostApi) => (
                <AdoptionPostCard
                  key={post.id}
                  imageUrl={getPhotoUrl(post.photos?.[0]?.url)}
                  title={post.title}
                  description={post.shortDescription || post.slogan || ""}
                  attributes={buildAttributes(post.cats ?? [])}
                  tags={post.isDuo ? ["Duo"] : []}
                  followUp={buildFollowUp(post.cats ?? [])}
                  price={`${post.price}€`}
                  link={`/adoption-posts/${post.documentId ?? post.id}/view`}
                  fixedSize={true}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
