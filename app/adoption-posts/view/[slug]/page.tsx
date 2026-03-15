import AdoptionPost from "@/components/AdoptionPost";

interface Cat {
  name: string;
  sex: "Male" | "Female";
  birthdate: string;
  isDewormed: boolean;
  isVaccinated: boolean;
  isSterilizedOrCastrated: boolean;
  isIdentified: boolean;
  isDogFriendly: boolean;
  isCatFriendly: boolean;
  isChildFriendly: boolean;
  livingEnvironmentType: "Apartment" | "House" | "Other";
  keyPoints: string[];
}

interface AdoptionPostData {
  id: number;
  documentId: string;
  title: string;
  slogan: string;
  shortDescription: string;
  longDescription: string;
  photos: any;
  isDuo: boolean;
  price: number;
  cats: Cat[];
  showDetails: boolean;
}

async function getAdoptionPost(documentId: string) {
  const res = await fetch(`http://localhost:1337/api/adoption-posts/${documentId}?populate=*`, {
    next: { revalidate: 1800 }
  });

  if (!res.ok) return null;

  const response = await res.json();
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
            documentId={adoptionPost.documentId}
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