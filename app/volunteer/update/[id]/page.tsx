import { getBenevoleById } from "@/app/volunteer/update/action";
import UpdateVolunteerForm from "@/components/volunteer/UpdateVolunteerForm";
import { notFound } from "next/navigation";

type Benevole = {
  id: number;
  documentId: string;
  name: string;
  firstName: string;
  email: string;
  role: "Admin" | "Référent" | "Responsable-adoption";
};

export default async function UpdateVolunteerPage({
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
      <UpdateVolunteerForm benevole={benevole} />
    </div>
  );
}