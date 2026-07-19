import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { serverApiData } from "@/helpers/api";
import IAdopter from "@/interfaces/IAdopter";
import AdopterDeleteConfirm from "@/components/adopter/AdopterDeleteConfirm";

export default async function DeleteAdopterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/account");

  const { slug } = await params;
  const adopter = await serverApiData<IAdopter | null>(
    `/api/adopters/${slug}`,
    null,
  );

  if (!adopter) notFound();

  return <AdopterDeleteConfirm adopter={adopter} />;
}
