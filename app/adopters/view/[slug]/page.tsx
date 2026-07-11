import { getAllAdopters } from "@/app/adopters/update/action";
import { IAdopter } from "@/interfaces/IAdopter";
import Link from "next/link";

export default async function AdopterListPage() {
  const adopters: IAdopter[] = await getAllAdopters();

  return (
    <div>
      <h1>Liste des adopters</h1>
      {adopters.length === 0 && <p>Aucun adopter trouvé.</p>}
      <ul>
        {adopters.map((a) => (
          <li key={a.id}>
            {a.firstName} {a.name} — {a.email}
            <Link href={`/adopter/view/${a.documentId}`}> Voir le profil</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
