interface AdoptionPostProps {
  title: string;
  slogan: string;
  shortDescription: string;
  longDescription: string;
  photos: Array<any>;
  isDuo: boolean;
  price: number;
  cats: [
    {
      name: string;
      sex: "Male" | "Female";
      birthdate: Date;
      isDewormed: boolean;
      isVaccinated: boolean;
      isSterilizedOrCastrated: boolean;
      isIdentified: boolean;
      isDogFriendly: boolean;
      isCatFriendly: boolean;
      isChildFriendly: boolean;
      livingEnvironmentType: "Apartment" | "House" | "Other";
      keyPoints: string[];
    },
  ];
}

export default function AdoptionPost({
  title,
  slogan,
  shortDescription,
  longDescription,
  photos,
  isDuo,
  price,
  cats,
}: AdoptionPostProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="text-gray-500">{slogan}</p>
      <p className="text-gray-700 mt-2">{shortDescription}</p>
      <p className="text-gray-700 mt-2">{longDescription}</p>
      {photos.map((photo, index) => (
        <img
          src={"http://192.168.1.77:1337" + photo.url}
          alt=""
          key={index}
          className="w-full h-48 object-cover rounded mt-2"
        />
      ))}
      {cats.map((cat, index) => (
        <div key={index} className="mt-4">
          <h3 className="text-lg font-semibold">{cat.name}</h3>
          <p className="text-gray-700 mt-2">
            Sexe : {cat.sex === "Male" ? "Mâle" : "Femelle"}
          </p>
          <p className="text-gray-700 mt-2">
            Âge :{" "}
            {Math.floor(
              (new Date().getTime() - new Date(cat.birthdate).getTime()) /
                (1000 * 60 * 60 * 24 * 365),
            )}{" "}
            ans ({new Date(cat.birthdate).toLocaleDateString()})
          </p>
          <p className="text-gray-700 mt-2">
            {cat.isDewormed ? "Déparasité" : "Non déparasité"}
          </p>
          <p className="text-gray-700 mt-2">
            {cat.isVaccinated ? "Vacciné" : "Non vacciné"}
          </p>
          <p className="text-gray-700 mt-2">
            {cat.isSterilizedOrCastrated
              ? "Stérilisé ou castré"
              : "Non stérilisé ou castré"}
          </p>
          <p className="text-gray-700 mt-2">
            {cat.isIdentified ? "Non identifié" : "Identifié"}
          </p>
          <p className="text-gray-700 mt-2">
            Ententes avec les chiens : {cat.isDogFriendly ? "Oui" : "Non"}
          </p>
          <p className="text-gray-700 mt-2">
            Ententes avec les chats : {cat.isCatFriendly ? "Oui" : "Non"}
          </p>
          <p className="text-gray-700 mt-2">
            Ententes avec les enfants : {cat.isChildFriendly ? "Oui" : "Non"}
          </p>
          <p className="text-gray-700 mt-2">
            Type de lieu de vie :{" "}
            {cat.livingEnvironmentType === "Apartment"
              ? "Appartement"
              : cat.livingEnvironmentType === "House"
                ? "Maison"
                : "Autre"}
          </p>
          {cat.keyPoints.length > 0 && (
            <div>
              <p className="text-gray-700 mt-2">Points clés : </p>
              {cat.keyPoints.map((keyPoint, index) => (
                <p className="text-gray-700 mt-2" key={index}>
                  {keyPoint}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
      <p className="font-semibold mt-2 text-blue-600">{price} €</p>
      <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600">
        Adopter
      </button>
    </div>
  );
}
