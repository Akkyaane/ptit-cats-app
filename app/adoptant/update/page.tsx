import { getAllAdoptants } from "@/app/adoptant/update/action";
import { IAdoptant } from "@/interfaces/IAdoptant";
import Link from "next/link";

export default async function AdoptantListPage() {
  const adoptants: IAdoptant[] = await getAllAdoptants();

  return (
    <div>
      <h1>Liste des adoptants</h1>
      {adoptants.length === 0 && <p>Aucun adoptant trouvé.</p>}
      <ul>
        {adoptants.map((a) => (
          <li key={a.id}>
            {a.firstName} {a.name} — {a.email}
            <Link href={`/adoptant/view/${a.documentId}`}> Voir le profil</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
