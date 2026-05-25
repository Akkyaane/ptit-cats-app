import { IAdoptionPost } from "@/interfaces/IAdoptionPost";
import { calculateAge } from "@/utils/dateHelper";
import Link from "next/link";

export default function AdoptionPost({
  title,
  slogan,
  shortDescription,
  longDescription,
  photos,
  price,
  cats,
  showDetails,
  isAdmin = false,
}: IAdoptionPost & { isAdmin?: boolean }) {
  return (
    <div className="border border-gray-300 p-6 bg-white">
      <h2 className="text-2xl font-bold text-black mt-4">{title}</h2>
      <p className="text-gray-600 mt-2">{slogan}</p>
      <p className="text-gray-900 mt-4">{shortDescription}</p>
      {showDetails && <p className="text-gray-900 mt-4">{longDescription}</p>}
      {photos.map((photo, index) => (
        <img
          src={"http://192.168.1.77:1337" + photo.url}
          alt=""
          key={index}
          className="w-full h-48 object-cover mt-4"
        />
      ))}
      {cats.map((cat, index) => (
        <div key={index} className="mt-6">
          {/** Ensure we always work with an array even if API omits this relation */}
          {(() => {
            const animalRequirements = Array.isArray(cat.animal_requirements)
              ? cat.animal_requirements
              : [];

            return (
              <>
          {showDetails && (
            <h3 className="text-xl font-semibold text-black">{cat.name}</h3>
          )}
          <p className="text-gray-900 mt-2">
            Sexe : {cat.sex === "Male" ? "Mâle" : "Femelle"}
          </p>
          <p className="text-gray-900 mt-2">
            Date de naissance :{" "}
            {cat.birthDate ? (
              <>
                {new Date(cat.birthDate).toLocaleDateString("fr-FR")}{" "}
                {calculateAge(new Date(cat.birthDate))}
              </>
            ) : (
              "N/C"
            )}
          </p>
          {showDetails && (
            <>
              <p className="text-gray-900 mt-2">
                {cat.isDewormed ? "Déparasité" : "Non déparasité"}
              </p>
              <p className="text-gray-900 mt-2">
                {cat.isVaccinated ? "Vacciné" : "Non vacciné"}
              </p>
              <p className="text-gray-900 mt-2">
                {cat.isSterilizedOrCastrated
                  ? "Stérilisé ou castré"
                  : "Non stérilisé ou castré"}
              </p>
              <p className="text-gray-900 mt-2">
                {cat.isIdentified ? "Identifié" : "Non identifié"}
              </p>
              <p className="text-gray-900 mt-2">
                Ententes avec les chiens : {cat.dogAffinity === "Yes" ? "Oui" : cat.dogAffinity === "No" ? "Non" : "Inconnu"}
              </p>
              <p className="text-gray-900 mt-2">
                Ententes avec les chats : {cat.catAffinity === "Yes" ? "Oui" : cat.catAffinity === "No" ? "Non" : "Inconnu"}
              </p>
              <p className="text-gray-900 mt-2">
                Ententes avec les enfants : {cat.childAffinity === "Yes" ? "Oui" : cat.childAffinity === "No" ? "Non" : "Inconnu"}
              </p>
              <p className="text-gray-900 mt-2">
                Type de lieu de vie :{" "}
                {cat.livingEnvironmentType === "Apartment"
                  ? "Appartement"
                  : cat.livingEnvironmentType === "House"
                    ? "Maison"
                    : "Autre"}
              </p>
              {animalRequirements.length > 0 && (
                <div>
                  <p className="text-gray-900 mt-2">Points clés : </p>
                  {animalRequirements.map((requirement, index) => (
                    <p className="text-gray-900 mt-2" key={index}>
                      {requirement.label}
                    </p>
                  ))}
                </div>
              )}
            </>
          )}
              </>
            );
          })()}
          {isAdmin && cat.documentId && (
            <div className="mt-4">
              <Link
                href={`/cats/update/${cat.documentId}`}
                className="inline-block px-4 py-2 text-sm font-bold rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200"
              >
                Modifier
              </Link>
            </div>
          )}
        </div>
      ))}
      <p className="font-semibold mt-4 text-black">{price} €</p>
      <button className="bg-black text-white px-4 py-2 mt-4 border border-black hover:bg-white hover:text-black transition-colors duration-200">
        Voir
      </button>
    </div>
  );
}
