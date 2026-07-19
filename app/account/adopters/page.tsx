import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverApiData } from "@/helpers/apiHelper";
import IAdopter from "@/interfaces/IAdopter";
import AdoptersManager from "@/components/account/AdoptersManager";
import AccountSubLayout from "@/components/account/AccountSubLayout";

export default async function AccountAdoptersPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/account");

  const adopters = await serverApiData<IAdopter[]>("/api/adopters", []);

  return (
    <AccountSubLayout title="Adoptants">
      <AdoptersManager adopters={adopters} />
    </AccountSubLayout>
  );
}
