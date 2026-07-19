import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllBenevoles } from "@/app/volunteers/update/action";
import VolunteersManager from "@/components/account/VolunteersManager";
import AccountSubLayout from "@/components/account/AccountSubLayout";
import Button from "@/components/ui/Button";

export default async function AccountVolunteersPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/account");

  const volunteers = await getAllBenevoles();

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
