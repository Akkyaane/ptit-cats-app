"use client";

import { useState, useTransition } from "react";
import { createAdoptionRequest } from "@/app/adoptant/adoption-request/action";

export default function SubmitAdoptionRequestButton({
  adoptantDocumentId,
  listingDocumentId,
  disabled,
}: {
  adoptantDocumentId: string;
  listingDocumentId: string;
  disabled?: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    setError(null);
    startTransition(async () => {
      const result = await createAdoptionRequest(adoptantDocumentId, listingDocumentId);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl text-center">
          {error}
        </p>
      )}
      <button
        onClick={handleClick}
        disabled={disabled || isPending}
        className="w-full px-6 py-4 font-bold rounded-xl bg-primary border-2 border-primary text-white hover:bg-primary/10 hover:text-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Envoi en cours..." : "Valider la demande d'adoption"}
      </button>
    </div>
  );
}
