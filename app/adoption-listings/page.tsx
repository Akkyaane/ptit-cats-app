import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AdoptionListingCard from "@/components/adoptionPost/AdoptionListingCard";
import Button from "@/components/ui/Button";
import HeadingPrimary from "@/components/ui/HeadingPrimary";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import IAdoptionListing from "@/interfaces/IAdoptionListing";

async function getAll(): Promise<IAdoptionListing[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/adoption-listings`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      console.error(
        `[adoption-listings] getAll: ${res.status} - ${res.statusText} - ${await res.text()}`,
      );

      return [];
    }

    const data = await res.json();

    return data.data ?? [];
  } catch (err) {
    console.error(`[adoption-listings] getAll: ${err}`);

    return [];
  }
}

export default async function displayAdoptionListings() {
  const adoptionListings = await getAll();

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
            <HeadingPrimary>Nos chats à l'adoption</HeadingPrimary>
          </div>
        </section>
        <Button up={true} />
      </header>

      <main>
        <section className="container flex flex-col gap-12">
          <HeadingSecondary headingVariant="primary" underlineVariant="primary">
            Nos annonces d'adoption
          </HeadingSecondary>

          {adoptionListings.length === 0 ? (
            <p className="text-center text-lg">
              Aucun chat n'est disponible pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adoptionListings.map((adoptionListing: IAdoptionListing) => (
                <AdoptionListingCard
                  key={adoptionListing.documentId}
                  documentId={adoptionListing.documentId}
                  title={adoptionListing.title}
                  slogan={adoptionListing.slogan}
                  shortDescription={adoptionListing.shortDescription}
                  longDescription={adoptionListing.longDescription}
                  media={adoptionListing.media}
                  isDuo={adoptionListing.isDuo}
                  price={adoptionListing.price}
                  animals={adoptionListing.animals}
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
