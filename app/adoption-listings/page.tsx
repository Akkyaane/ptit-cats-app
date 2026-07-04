import ALFilteredList from "@/components/adoptionListing/ALFilteredList";
import Breadcrumb from "@/components/Breadcrumb";
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
      <header className="bg-tertiary h-28" />

      <main>
        <Breadcrumb />
        <section className="container flex flex-col gap-12 items-center">
          <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">Nos annonces d'adoption</Heading>

          {adoptionListings.length === 0 ? (
            <p className="text-center text-lg">
              Aucun animal n'est disponible pour le moment.
            </p>
          ) : (
            <ALFilteredList listings={adoptionListings} />
          )}
        </section>
      </main>
    </div>
  );
}
