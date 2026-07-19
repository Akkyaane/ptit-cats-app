"use client";

import PasswordChangeForm from "@/components/account/PasswordChangeForm";

export default function VolunteerPasswordChangeForm({
  documentId,
}: {
  documentId: string;
}) {
  return (
    <PasswordChangeForm
      action={async (formData) => {
        const res = await fetch(`/api/volunteers/${documentId}/password`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newPassword: formData.get("newPassword"),
            confirmPassword: formData.get("confirmPassword"),
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          return {
            error: data?.error ?? "Erreur lors de la mise à jour du mot de passe.",
          };
        }
        return { success: true };
      }}
    />
  );
}
