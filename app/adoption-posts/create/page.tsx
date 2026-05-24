import APForm from "@/components/adoptionPost/APForm";
import { IAnimalRequirement } from "@/interfaces/IAnimalRequirement";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadingPrimary from "@/components/ui/HeadingPrimary";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import Image from "next/image";

async function getAnimalRequirements(): Promise<IAnimalRequirement[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/animal-requirements`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[animal-requirements] fetch failed:", res.status, await res.text());
      return [];
    }
    const data = await res.json();
    return data.data ?? [];
  } catch (err) {
    console.error("[animal-requirements] fetch error:", err);
    return [];
  }
}

export default async function CreateAdoptionPost() {
  const animalRequirements = await getAnimalRequirements();

  return (
    <div>
      <header className="bg-[url('/assets/img/background-2.jpg')]">
        <div className="container relative">
          <Image
            src="/assets/img/icone-10.svg"
            alt=""
            aria-hidden="true"
            width={384}
            height={384}
            className="hidden lg:block absolute top-20 right-8 xl:right-24 w-72 xl:w-96"
          />
          <Navbar />
          <div className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 lg:py-40">
            <HeadingPrimary>Créer une annonce</HeadingPrimary>
          </div>
        </div>
      </header>

      <main className="text-[var(--color-quaternary)]">
        <div className="container flex flex-col gap-12">
          <section className="p-8 md:p-10 flex flex-col gap-12">
            <HeadingSecondary headingVariant="primary" underlineVariant="primary">
              Nouvelle annonce d&apos;adoption
            </HeadingSecondary>
            <APForm animalRequirements={animalRequirements} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
