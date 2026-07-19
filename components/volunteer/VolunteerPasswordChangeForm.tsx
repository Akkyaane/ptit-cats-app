"use client";

import { changeVolunteerPassword } from "@/app/volunteers/update/action";
import PasswordChangeForm from "@/components/account/PasswordChangeForm";

export default function VolunteerPasswordChangeForm({
  documentId,
}: {
  documentId: string;
}) {
  return (
    <PasswordChangeForm
      action={(formData) => changeVolunteerPassword(documentId, formData)}
    />
  );
}
