"use client";

import { AccountUser } from "./types";
import Heading from "@/components/ui/Heading";
import AdopterProfileForm from "@/components/adopter/AdopterProfileForm";
import UpdateVolunteerForm from "@/components/volunteer/UpdateVolunteerForm";
import VolunteerPasswordChangeForm from "@/components/volunteer/VolunteerPasswordChangeForm";
import PasswordChangeForm from "@/components/account/PasswordChangeForm";
import { changeAdopterPassword } from "@/app/adopters/update/action";

export default function AccountSettings({ user }: { user: AccountUser }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Informations */}
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

      {/* Mot de passe */}
      <section className="flex flex-col gap-6">
        <Heading type="h3" headingVariant="quaternary" underlineVariant="tertiary">
          Changer mon mot de passe
        </Heading>
        {user.kind === "adopter" ? (
          <PasswordChangeForm
            action={(formData) =>
              changeAdopterPassword(user.adopter.documentId, formData)
            }
          />
        ) : (
          <VolunteerPasswordChangeForm documentId={user.volunteer.documentId} />
        )}
      </section>
    </div>
  );
}
