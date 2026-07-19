"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function SubmitAdoptionRequestButton({
  adopterDocumentId,
  listingDocumentId,
  disabled,
}: {
  adopterDocumentId: string;
  listingDocumentId: string;
  disabled?: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/adoption-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adopterDocumentId, listingDocumentId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(
          data?.error ??
            "Erreur lors de la création de la demande. Veuillez réessayer.",
        );
        return;
      }
      router.push("/account?tab=demandes&requested=true");
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
