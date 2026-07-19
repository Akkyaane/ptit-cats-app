"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

type Adopter = {
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export default function AdopterDeleteConfirm({
  adopter,
}: {
  adopter: Adopter;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setIsDeleting(true);
    setError(null);

    const res = await fetch(`/api/adopters/${adopter.documentId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Erreur lors de la suppression de l'adoptant.");
      setIsDeleting(false);
      return;
    }
    router.push("/account/adopters");
  }

  return (
    <div className="layout-header-spacing">
      <div className="container">
        <div className="max-w-lg mx-auto flex flex-col gap-6 p-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-center">
            <div className="flex flex-col">
              <Heading type="h2" headingVariant="quaternary">
                Supprimer l&apos;adoptant
              </Heading>
              <span className="text-xl">
                {adopter.firstName} {adopter.lastName}
              </span>
            </div>

            <p className="text-sm text-quaternary/80">
              Êtes-vous sûr de vouloir supprimer le compte de{" "}
              <strong className="text-primary">
                {adopter.firstName} {adopter.lastName}
              </strong>{" "}
              ({adopter.email}) ? <br />
              Cette action est irréversible.
            </p>
          </div>

          {error && (
            <div className="max-w-2xl mx-auto w-full px-4 py-3 rounded-xl bg-primary/10 border-2 border-primary text-primary font-bold text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between gap-2">
            <Button
              type="button"
              onClick={() =>
                router.push(`/adopters/view/${adopter.documentId}`)
              }
              disabled={isDeleting}
              variant="secondary"
              size="md"
            >
              Annuler
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isDeleting}
              variant="primary"
              size="md"
            >
              {isDeleting ? "Suppression…" : "Confirmer"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
