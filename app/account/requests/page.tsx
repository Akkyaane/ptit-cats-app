import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAdoptionRequestsByAdopter,
  getAdoptionRequestsForVolunteer,
} from "@/app/adoption-requests/action";
import MyRequestsManager from "@/components/account/MyRequestsManager";
import AdoptionRequestsManager from "@/components/account/AdoptionRequestsManager";
import AccountSubLayout from "@/components/account/AccountSubLayout";

export default async function AccountRequestsPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("user_role")?.value;

  // Adoptant : ses propres demandes.
  if (role === "adopter") {
    const adopterId = cookieStore.get("adopter_id")?.value;
    if (!adopterId) redirect("/auth/signin");
    const requests = await getAdoptionRequestsByAdopter(adopterId);
    return (
      <AccountSubLayout title="Mes demandes d'adoption">
        <MyRequestsManager requests={requests} />
      </AccountSubLayout>
    );
  }

  // Responsable / référent : demandes attribuées + celles qu'il a transférées.
  if (role === "manager" || role === "referent") {
    const volunteerId = cookieStore.get("volunteer_id")?.value;
    if (!volunteerId) redirect("/auth/signin");
    const requests = await getAdoptionRequestsForVolunteer(volunteerId);
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
