import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getAdopterById } from "@/app/adopters/update/action";
import AdopterDeleteConfirm from "@/components/adopter/AdopterDeleteConfirm";

export default async function DeleteAdopterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Seul un administrateur peut supprimer un compte adoptant.
  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/account");

  const { slug } = await params;
  const adopter = await getAdopterById(slug);

  if (!adopter) notFound();

  return <AdopterDeleteConfirm adopter={adopter} />;
}
