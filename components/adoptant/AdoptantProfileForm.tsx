"use client";

import { IAdoptant } from "@/interfaces/IAdoptant";
import AdoptantFormWizard from "./AdoptantFormWizard";
import { mapAdoptantToFormValues } from "@/utils/adoptantForm";

export default function AdoptantProfileForm({
  adoptant,
}: {
  adoptant: IAdoptant;
}) {
  return (
    <AdoptantFormWizard
      mode="edit"
      documentId={adoptant.documentId}
      initialValues={mapAdoptantToFormValues(adoptant)}
    />
  );
}
