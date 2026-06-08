"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IAdoptionListing from "@/interfaces/IAdoptionListing";

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
  if (!res.ok) throw new Error(`[animals/delete] ${res.status} - ${await res.text()}`);
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
  if (!res.ok) throw new Error(`[adoption-listings/delete] ${res.status} - ${await res.text()}`);
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
    <div>
      <header className="bg-tertiary py-6">
        <div className="container">
        </div>
      </header>

      <main className="min-h-[60dvh] flex items-center justify-center">
        <div className="container flex justify-center">
          <div className="w-full max-w-lg flex flex-col gap-6 p-8 md:p-10 rounded-2xl border-2 border-tertiary bg-white shadow-sm">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
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

            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl font-bold text-quaternary">
                Supprimer l&apos;annonce
                {animalNames ? ` — ${animalNames}` : ""}
              </h1>
              <p className="text-sm text-quaternary/70 leading-relaxed">
                Êtes-vous sûr de vouloir supprimer cette annonce d&apos;adoption ?
                {listing && listing.animals.length > 0 && (
                  <>
                    {" "}
                    <strong>
                      {listing.animals.length === 1
                        ? "L'animal associé sera également supprimé."
                        : "Les animaux associés seront également supprimés."}
                    </strong>
                  </>
                )}{" "}
                Cette action est irréversible.
              </p>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-bold text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() =>
                  router.push(`/adoption-listings/view/${documentId}`)
                }
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-quaternary text-quaternary font-bold hover:bg-quaternary hover:text-white transition-colors duration-200 disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-quaternary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Suppression…" : "Confirmer la suppression"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
