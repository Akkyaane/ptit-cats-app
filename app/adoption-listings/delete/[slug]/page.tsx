"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IAdoptionListing from "@/interfaces/IAdoptionListing";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

async function fetchListing(documentId: string): Promise<IAdoptionListing> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/adoption-listings/${documentId}`,
  );
  if (!res.ok) throw new Error(`[adoption-listings] ${res.status}`);
  const data = await res.json();
  return data.data;
}

async function deleteAnimal(documentId: string): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/animals/delete`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId }),
    },
  );
  if (!res.ok)
    throw new Error(`[animals/delete] ${res.status} - ${await res.text()}`);
}



async function deleteListing(documentId: string): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/adoption-listings/delete`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId }),
    },
  );
  if (!res.ok)
    throw new Error(
      `[adoption-listings/delete] ${res.status} - ${await res.text()}`,
    );
}

export default function DeleteAdoptionListing({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();

  const [listing, setListing] = useState<IAdoptionListing | null>(null);
  const [documentId, setDocumentId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { slug } = await params;
        setDocumentId(slug);
        const data = await fetchListing(slug);
        setListing(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [params]);

  async function handleConfirm() {
    if (!listing) return;
    setIsDeleting(true);
    setError(null);

    try {
      for (const animal of listing.animals) {
        await deleteAnimal(animal.documentId);
      }
      await deleteListing(documentId);
      router.push("/adoption-listings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="font-bold text-quaternary">Chargement…</p>
      </div>
    );
  }

  const animalNames = listing?.animals.map((a) => a.name).join(" & ") ?? "";

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
                Supprimer l'annonce
              </Heading>
              <span className="text-xl">
                {animalNames ? `${animalNames}` : ""}
              </span>
            </div>

            <p className="text-sm text-quaternary/80">
              Êtes-vous sûr de vouloir supprimer cette annonce d'adoption ? <br />
              {listing && listing.animals.length > 0 && (
                <>
                  {" "}
                  <strong className="text-primary">
                    {listing.animals.length === 1
                      ? "L'animal associé sera également supprimé."
                      : "Les animaux associés seront également supprimés."}
                  </strong>
                </>
              )} <br />
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
              router.push(`/adoption-listings/view/${documentId}`)
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
