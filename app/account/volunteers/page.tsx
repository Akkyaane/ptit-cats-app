import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverApiData } from "@/helpers/api";
import IVolunteer from "@/interfaces/IVolunteer";
import VolunteersManager from "@/components/account/VolunteersManager";
import AccountSubLayout from "@/components/account/AccountSubLayout";
import Button from "@/components/ui/Button";

export default async function AccountVolunteersPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/account");

  const volunteers = await serverApiData<IVolunteer[]>("/api/volunteers", []);

  return (
    <AccountSubLayout
      title="Bénévoles"
      action={
        <Button href="/volunteers/create" size="sm" variant="primary">
          Ajouter +
        </Button>
      }
    >
      <VolunteersManager volunteers={volunteers} />
    </AccountSubLayout>
  );
}
