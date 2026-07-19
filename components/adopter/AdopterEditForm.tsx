"use client";

import IAdopter from "@/interfaces/IAdopter";
import AdopterFormWizard from "@/components/adopter/AdopterFormWizard";
import { mapAdopterToFormValues } from "@/helpers/adopterPayloadHelper";

export default function AdopterEditForm({
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
