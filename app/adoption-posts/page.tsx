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

interface AdoptionPost {
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

async function getAdoptionPosts() {
  const res = await fetch("http://localhost:1337/api/adoption-posts?populate=*", {
    next: { revalidate: 1800 }
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des annonces d'adoption.");
  }

  return res.json();
}

export default async function DisplayAdoptionPosts() {
  const response = await getAdoptionPosts();
  console.log("Response from API:", response);

  const posts = response.data;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Nos chats à l'adoption</h1>
      
      {posts.length === 0 ? (
        <p>Aucun chat n'est disponible pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: AdoptionPost) => (
            <AdoptionPost
              key={post.id}
              documentId={post.documentId}
              title={post.title}
              slogan={post.slogan}
              shortDescription={post.shortDescription}
              longDescription={post.longDescription}
              photos={post.photos}
              isDuo={post.isDuo}
              price={post.price}
              cats={post.cats}
              showDetails={false}
            />
          ))}
        </div>
      )}
    </main>
  );
}