import AdoptionPost from "../../../components/AdoptionPost";

async function getAdoptionPosts() {
  const res = await fetch("http://localhost:1337/api/adoption-posts?populate=*", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des annonces d'adoption");
  }

  return res.json();
}

export default async function displayAdoptionPosts() {
  const adoptionPosts = await getAdoptionPosts();
  console.log(adoptionPosts);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Nos chats à l'adoption</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adoptionPosts.data.map((post) => (
          <AdoptionPost
            key={post.id}
            name={post.title}
            slogan={post.slogan}
            shortDescription={post.shortDescription}
            longDescription={post.longDescription}
            photos={post.photos}
            isDuo={post.isDuo}
            price={post.price}
            cats={post.cats}
          />
        ))}
      </div>
    </main>
  );
}