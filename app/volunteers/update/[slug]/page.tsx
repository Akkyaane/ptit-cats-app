import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function VolunteerUpdateRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/");

  const { id } = await params;
  redirect(`/volunteers/view/${id}`);
}
