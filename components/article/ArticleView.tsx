"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IArticle from "@/interfaces/IArticle";
import DynamicEditor from "@/components/blocknote/DynamicEditor";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/ui/Button";
import { CATEGORY_LABELS, formatAuthor } from "@/helpers/articleHelper";

async function fetchArticle(documentId: string): Promise<IArticle> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/view/${documentId}`,
  );
  if (!res.ok) throw new Error(`[articles] ${res.status}`);
  const data = await res.json();
  return data.data;
}

export default function ArticleView({
  documentId,
  userRole,
  currentVolunteerId,
}: {
  documentId: string;
  userRole?: string;
  currentVolunteerId?: string;
}) {
  const router = useRouter();
  const [article, setArticle] = useState<IArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchArticle(documentId);
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [documentId]);

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="font-bold text-quaternary">Chargement…</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="layout-header-spacing">
        <div className="container max-w-3xl mx-auto flex flex-col gap-4">
          <p className="text-primary font-bold">
            {error ?? "Article introuvable."}
          </p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push("/blog")}
          >
            Retour au blog
          </Button>
        </div>
      </div>
    );
  }

  const category = CATEGORY_LABELS[article.category] ?? article.category;
  const date = new Date(article.publicationDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const author = formatAuthor(article.volunteer);

  // Modifier / Supprimer : admin (tous les articles) ou auteur de l'article
  // (manager / référent uniquement sur les leurs).
  const canManage =
    userRole === "admin" ||
    (!!currentVolunteerId &&
      article.volunteer?.documentId === currentVolunteerId);

  return (
    <div className="max-w-5xl mx-auto">
      {/* En-tête */}
      <header className="bg-tertiary h-28" />

      <Breadcrumb />
      <main className="container py-12">
        <div className="flex flex-col gap-8">
          {/* Actions */}
          <div className="flex flex-row flex-wrap gap-2 justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push("/blog")}
            >
              ← Retour
            </Button>
            {canManage && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => router.push(`/blog/update/${documentId}`)}
                >
                  Modifier
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push(`/blog/delete/${documentId}`)}
                >
                  Supprimer
                </Button>
              </>
            )}
          </div>

          {/* Métadonnées */}
          <div className="flex flex-col gap-4 border-b-2 border-tertiary/40 pb-6">
            <span className="w-fit text-xs font-bold uppercase tracking-wider bg-primary text-secondary px-3.5 py-1.5 rounded-full shadow-sm">
              {category}
            </span>
            <div className="flex items-center gap-5 text-sm text-quaternary/60 flex-wrap">
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time>{date}</time>
              </span>
              {author && (
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Par{" "}
                  <span className="font-semibold text-quaternary/80">
                    {author}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Contenu BlockNote en lecture seule */}
          <div className="article-view-content">
            <DynamicEditor initialContent={article.content} editable={false} />
          </div>

          {/* Actions */}
          <div className="flex flex-row flex-wrap gap-3 pt-4">
            <Button
              variant="secondary"
              size="md"
              onClick={() => router.push("/blog")}
            >
              ← Retour
            </Button>
            {canManage && (
              <>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => router.push(`/blog/update/${documentId}`)}
                >
                  Modifier
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => router.push(`/blog/delete/${documentId}`)}
                >
                  Supprimer
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
