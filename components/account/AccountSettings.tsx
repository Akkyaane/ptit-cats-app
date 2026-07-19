"use client";

import { AccountUser } from "./types";
import Heading from "@/components/ui/Heading";
import AdopterProfileForm from "@/components/adopter/AdopterProfileForm";
import UpdateVolunteerForm from "@/components/volunteer/UpdateVolunteerForm";
import VolunteerPasswordChangeForm from "@/components/volunteer/VolunteerPasswordChangeForm";
import PasswordChangeForm from "@/components/account/PasswordChangeForm";

export default function AccountSettings({ user }: { user: AccountUser }) {
  return (
    <div className="flex flex-col gap-6">

      <section className="flex flex-col gap-6">
        <Heading type="h3" headingVariant="quaternary" underlineVariant="tertiary">
          Mes informations
        </Heading>
        {user.kind === "adopter" ? (
          <AdopterProfileForm adopter={user.adopter} />
        ) : (
          <UpdateVolunteerForm
            benevole={user.volunteer}
            canChangeRole={false}
            redirectTo="/account"
          />
        )}
      </section>

      <section className="flex flex-col gap-6">
        <Heading type="h3" headingVariant="quaternary" underlineVariant="tertiary">
          Changer mon mot de passe
        </Heading>
        {user.kind === "adopter" ? (
          <PasswordChangeForm
            action={async (formData) => {
              const res = await fetch(
                `/api/adopters/${user.adopter.documentId}/password`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    newPassword: formData.get("newPassword"),
                    confirmPassword: formData.get("confirmPassword"),
                  }),
                },
              );
              if (!res.ok) {
                const data = await res.json().catch(() => null);
                return {
                  error:
                    data?.error ??
                    "Erreur lors de la mise à jour du mot de passe.",
                };
              }
              return { success: true };
            }}
          />
        ) : (
          <VolunteerPasswordChangeForm documentId={user.volunteer.documentId} />
        )}
      </section>
    </div>
  );
}
