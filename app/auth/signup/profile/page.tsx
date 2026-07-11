import { redirect } from "next/navigation";

export default async function RegisterProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  redirect(id ? "/adopter/profile" : "/adopter/profile");
}
