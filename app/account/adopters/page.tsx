import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllAdopters } from "@/app/adopters/update/action";
import AdoptersManager from "@/components/account/AdoptersManager";
import AccountSubLayout from "@/components/account/AccountSubLayout";

export default async function AccountAdoptersPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/account");

  const adopters = await getAllAdopters();

  return (
    <AccountSubLayout title="Adoptants">
      <AdoptersManager adopters={adopters} />
    </AccountSubLayout>
  );
}
