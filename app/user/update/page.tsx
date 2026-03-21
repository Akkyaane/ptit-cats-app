import { getAllBenevoles } from "@/app/user/update/action";
import Link from "next/link";

type Benevole = {
  id: number;
  documentId: string;
  name: string;
  firstName: string;
  email: string;
  role: "Admin" | "Référent" | "Responsable-adoption";
};

export default async function BenevoleListPage() {
  const benevoles: Benevole[] = await getAllBenevoles();

  return (
    <div>
      <h1>Liste des bénévoles</h1>
      {benevoles.length === 0 && <p>Aucun bénévole trouvé.</p>}
      <ul>
        {benevoles.map((b: Benevole) => (
          <li key={b.id}>
            {b.firstName} {b.name} - {b.role}
            <Link href={`/user/view/${b.documentId}`}> Voir le profil</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}