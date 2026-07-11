"use client";

import { IAdopter } from "@/interfaces/IAdopter";
import AdopterFormWizard from "@/components/adopter/AdopterFormWizard";
import { mapAdopterToFormValues } from "@/components/adopter/adopterForm";

export default function AdopterProfileForm({
  adopter,
}: {
  adopter: IAdopter;
}) {
  return (
    <AdopterFormWizard
      mode="edit"
      documentId={adopter.documentId}
      initialValues={mapAdopterToFormValues(adopter)}
    />
  );
}
