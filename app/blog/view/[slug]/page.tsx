"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IArticle from "@/interfaces/IArticle";
import DynamicEditor from "@/components/blocknote/DynamicEditor";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/ui/Button";
import {
  CATEGORY_LABELS,
} from "@/helpers/articleHelper";

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

  const category = CATEGORY_LABELS[article.category] ?? article.category;
  const date = new Date(article.publicationDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* En-tête */}
      <header className="bg-tertiary h-28" />

      <main className="container py-12">
        <Breadcrumb />
        <div className="flex flex-col gap-8">
        {/* Métadonnées */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-bold bg-primary text-secondary px-3 py-1 rounded-xl shadow-sm">
            {category}
          </span>
          <span className="text-sm text-quaternary/70">{date}</span>
        </div>

        {/* Contenu BlockNote en lecture seule */}
        <div className="article-view-content">
          <DynamicEditor
            initialContent={article.content}
            editable={false}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-row flex-wrap gap-3 pt-4">
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push("/blog")}
          >
            Retour
          </Button>
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
