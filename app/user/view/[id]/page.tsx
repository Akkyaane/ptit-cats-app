import { getBenevoleById } from "@/app/user/update/action";
import Link from "next/link";
import { notFound } from "next/navigation";

type Benevole = {
  id: number;
  documentId: string;
  name: string;
  firstName: string;
  email: string;
  role: "Admin" | "Référent" | "Responsable-adoption";
};

export default async function BenevoleProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const benevole: Benevole = await getBenevoleById(id);

  if (!benevole) return notFound();

  return (
    <div>
      <h1>Profil de {benevole.firstName} {benevole.name}</h1>
      <p>Email : {benevole.email}</p>
      <p>Rôle : {benevole.role}</p>
      <Link href={`/user/update/${benevole.documentId}`}>Modifier</Link>
    </div>
  );
}