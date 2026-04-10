import { getBenevoleById } from "@/app/user/update/action";
import UpdateUserForm from "@/components/user/UpdateUserForm";
import { notFound } from "next/navigation";

type Benevole = {
  id: number;
  documentId: string;
  name: string;
  firstName: string;
  email: string;
  role: "Admin" | "Référent" | "Responsable-adoption";
};

export default async function UpdateUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const benevole: Benevole = await getBenevoleById(id);

  if (!benevole) return notFound();

  return (
    <div>
      <h1>Modifier le bénévole</h1>
      <UpdateUserForm benevole={benevole} />
    </div>
  );
}