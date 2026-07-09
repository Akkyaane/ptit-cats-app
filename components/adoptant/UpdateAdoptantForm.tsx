"use client";

import { IAdoptant } from "@/interfaces/IAdoptant";
import AdoptantFormWizard from "./AdoptantFormWizard";
import { mapAdoptantToFormValues } from "@/helpers/adoptantForm";

export default function UpdateAdoptantForm({
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
