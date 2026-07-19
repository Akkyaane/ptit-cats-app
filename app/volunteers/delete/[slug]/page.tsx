import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getBenevoleById } from "@/app/volunteers/update/action";
import VolunteerDeleteConfirm from "@/components/volunteer/VolunteerDeleteConfirm";

export default async function DeleteVolunteerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Seul un administrateur peut supprimer un compte bénévole.
  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/account");

  const { slug } = await params;
  const volunteer = await getBenevoleById(slug);

  if (!volunteer) notFound();

  return <VolunteerDeleteConfirm volunteer={volunteer} />;
}
