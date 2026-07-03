"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IArticle from "@/interfaces/IArticle";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { extractTitle } from "@/utils/articleHelper";

async function fetchArticle(documentId: string): Promise<IArticle> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/view/${documentId}`,
  );
  if (!res.ok) throw new Error(`[articles] ${res.status}`);
  const data = await res.json();
  return data.data;
}

async function deleteArticle(documentId: string): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/delete/${documentId}`,
    { method: "DELETE" },
  );
  if (!res.ok) {
    throw new Error(
      `[articles/delete] ${res.status} - ${await res.text()}`,
    );
  }
}

export default function DeleteArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [article, setArticle] = useState<IArticle | null>(null);
  const [documentId, setDocumentId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { slug } = await params;
        setDocumentId(slug);
        const data = await fetchArticle(slug);
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [params]);

  async function handleConfirm() {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteArticle(documentId);
      router.push("/blog");
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

  const title = article ? extractTitle(article.content) : "";

  return (
    <div className="layout-header-spacing">
      <div className="container">
        <div className="max-w-lg mx-auto flex flex-col gap-6 p-6">
          {/* Icône d'avertissement */}
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

          {/* Texte de confirmation */}
          <div className="flex flex-col gap-4 text-center">
            <div className="flex flex-col gap-1">
              <Heading type="h2" headingVariant="quaternary">
                Supprimer l&apos;article
              </Heading>
              {title && (
                <span className="text-xl font-bold text-quaternary">
                  &laquo; {title} &raquo;
                </span>
              )}
            </div>
            <p className="text-sm text-quaternary/80">
              Êtes-vous sûr de vouloir supprimer cet article ?{" "}
              <strong className="text-primary">
                Cette action est irréversible.
              </strong>
            </p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-primary/10 border-2 border-primary text-primary font-bold text-sm">
              {error}
            </div>
          )}

          {/* Boutons */}
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              disabled={isDeleting}
              onClick={() => router.push(`/blog/view/${documentId}`)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              disabled={isDeleting}
              onClick={handleConfirm}
            >
              {isDeleting ? "Suppression…" : "Confirmer"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
