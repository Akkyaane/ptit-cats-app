import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { serverApiData } from "@/helpers/apiHelper";
import IVolunteer from "@/interfaces/IVolunteer";
import VolunteerDeleteConfirm from "@/components/volunteer/VolunteerDeleteConfirm";

export default async function DeleteVolunteerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/account");

  const { slug } = await params;
  const volunteer = await serverApiData<IVolunteer | null>(
    `/api/volunteers/${slug}`,
    null,
  );

  if (!volunteer) notFound();

  return <VolunteerDeleteConfirm volunteer={volunteer} />;
}
