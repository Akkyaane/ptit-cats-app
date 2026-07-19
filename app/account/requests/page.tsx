import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverApiData } from "@/helpers/api";
import IAdoptionRequest from "@/interfaces/IAdoptionRequest";
import MyRequestsManager from "@/components/account/MyRequestsManager";
import AdoptionRequestsManager from "@/components/account/AdoptionRequestsManager";
import AccountSubLayout from "@/components/account/AccountSubLayout";

export default async function AccountRequestsPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("user_role")?.value;

  if (role === "adopter") {
    const adopterId = cookieStore.get("adopter_id")?.value;
    if (!adopterId) redirect("/auth/signin");
    const requests = await serverApiData<IAdoptionRequest[]>(
      `/api/adoption-requests?adopter=${adopterId}`,
      [],
    );
    return (
      <AccountSubLayout title="Mes demandes d'adoption">
        <MyRequestsManager requests={requests} />
      </AccountSubLayout>
    );
  }

  if (role === "manager" || role === "referent") {
    const volunteerId = cookieStore.get("volunteer_id")?.value;
    if (!volunteerId) redirect("/auth/signin");
    const requests = await serverApiData<IAdoptionRequest[]>(
      `/api/adoption-requests?forVolunteer=${volunteerId}`,
      [],
    );
    return (
      <AccountSubLayout title="Demandes d'adoption">
        <AdoptionRequestsManager
          requests={requests}
          viewerDocumentId={volunteerId}
          viewerRole={role}
        />
      </AccountSubLayout>
    );
  }

  redirect("/account");
}
