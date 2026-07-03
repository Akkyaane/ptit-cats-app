"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IArticle from "@/interfaces/IArticle";
import DynamicEditor from "@/components/blocknote/DynamicEditor";
import Button from "@/components/ui/Button";
import {
  CATEGORY_LABELS,
  extractTitle,
} from "@/utils/articleHelper";

async function fetchArticle(documentId: string): Promise<IArticle> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/view/${documentId}`,
  );
  if (!res.ok) throw new Error(`[articles] ${res.status}`);
  const data = await res.json();
  return data.data;
}

export default function ViewArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [article, setArticle] = useState<IArticle | null>(null);
  const [documentId, setDocumentId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
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
          <Button variant="secondary" size="md" onClick={() => router.push("/blog")}>
            Retour au blog
          </Button>
        </div>
      </div>
    );
  }

  const title = extractTitle(article.content);
  const category = CATEGORY_LABELS[article.category] ?? article.category;
  const date = new Date(article.publicationDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* En-tête */}
      <header className="bg-tertiary h-28" />

      <main className="container max-w-3xl mx-auto flex flex-col gap-8 py-12">
        {/* Métadonnées */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold bg-primary text-secondary px-3 py-1 rounded-xl shadow-sm">
              {category}
            </span>
            <span className="text-sm text-quaternary/70">{date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-quaternary">
            {title}
          </h1>
        </div>

        {/* Contenu BlockNote en lecture seule */}
        <div className="border-2 border-tertiary rounded-xl overflow-hidden">
          <DynamicEditor
            initialContent={article.content}
            editable={false}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-3 justify-between pt-4 border-t-2 border-tertiary">
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push("/blog")}
          >
            ← Retour au blog
          </Button>
          <div className="flex gap-2">
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
          </div>
        </div>
      </main>
    </div>
  );
}
