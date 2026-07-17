"use client";

import IAdopter from "@/interfaces/IAdopter";
import AdopterFormWizard from "./AdopterFormWizard";
import { mapAdopterToFormValues } from "@/components/adopter/AdopterForm";

export default function UpdateAdopterForm({
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
