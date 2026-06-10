import ALCard from "@/components/adoptionListing/ALCard";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import IAdoptionListing from "@/interfaces/IAdoptionListing";

async function getAll(): Promise<IAdoptionListing[] | []> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/adoption-listings`,
    );

    if (!res.ok) {
      console.error(
        `[adoption-listings] getAll: ${res.status} - ${res.statusText} - ${await res.text()}`,
      );

      return [];
    }

    const data = await res.json();

    return data.data;
  } catch (err) {
    console.error(`[adoption-listings] getAll: ${err}`);

    return [];
  }
}

export default async function displayAll() {
  const adoptionListings = await getAll();

  return (
    <div>
      <header className="bg-tertiary h-28">
        <section className="container hidden">
          <Heading type="h1" headingVariant="secondary">Nos annonces d'adoption</Heading>
        </section>
      </header>

      <main>
        <section className="container flex flex-col gap-12 items-center">
          <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">Nos annonces d'adoption</Heading>

          {adoptionListings.length === 0 ? (
            <p className="text-center text-lg">
              Aucun chat n'est disponible pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adoptionListings.map((adoptionListing: IAdoptionListing) => (
                <ALCard
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
                  entityStatus={adoptionListing.entityStatus}
                />
              ))}
            </div>
          )}
          <Button href="/adoption-listings/create">Ajouter une annonce</Button>
        </section>
      </main>
    </div>
  );
}
