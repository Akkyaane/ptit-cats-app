import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverApiData } from "@/helpers/apiHelper";
import IAdoptionListing from "@/interfaces/IAdoptionListing";
import AdoptionListingsManager from "@/components/account/AdoptionListingsManager";
import AccountSubLayout from "@/components/account/AccountSubLayout";
import Button from "@/components/ui/Button";

export default async function AccountListingsPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("user_role")?.value;
  if (role !== "admin" && role !== "manager") redirect("/account");

  const listings = await serverApiData<IAdoptionListing[]>(
    "/api/adoption-listings",
    [],
  );

  return (
    <AccountSubLayout
      title="Annonces d'adoption"
      action={
        <Button href="/adoption-listings/create" size="sm" variant="primary">
          Ajouter +
        </Button>
      }
    >
      <AdoptionListingsManager listings={listings} />
    </AccountSubLayout>
  );
}
