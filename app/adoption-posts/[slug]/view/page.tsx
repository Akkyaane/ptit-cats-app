import { IAdoptionPost } from "@/interfaces/IAdoptionPost";
import AdoptionPost from "@/components/adoptionPost/AdoptionPost";

async function getAdoptionPost(documentId: string) {
  const res = await fetch(`http://localhost:1337/api/adoption-posts/${documentId}?populate[cats][populate][animal_requirements]=*&populate=photos`, {
  });

  if (!res.ok) return null;

  const response = await res.json();
  console.log("Adoption post data:", response.data
  );
  return response.data;
}

export default async function displayAdoptionPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const adoptionPost = await getAdoptionPost(slug);

    if (!adoptionPost) {
    return <div className="p-8">Annonce introuvable.</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Chat 1</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AdoptionPost
            key={adoptionPost.id}
            id={adoptionPost.id}
            title={adoptionPost.title}
            slogan={adoptionPost.slogan}
            shortDescription={adoptionPost.shortDescription}
            longDescription={adoptionPost.longDescription}
            photos={adoptionPost.photos}
            isDuo={adoptionPost.isDuo}
            price={adoptionPost.price}
            cats={adoptionPost.cats}
            showDetails={true}
          />
      </div>
    </main>
  );
}