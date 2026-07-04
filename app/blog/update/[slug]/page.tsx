"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import IArticle from "@/interfaces/IArticle";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleForm, { ArticleDraft } from "@/components/article/ArticleForm";

async function fetchArticle(documentId: string): Promise<IArticle> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/view/${documentId}`,
  );
  if (!res.ok) throw new Error(`[articles] ${res.status}`);
  const data = await res.json();
  return data.data;
}

async function updateArticle(
  documentId: string,
  draft: ArticleDraft,
): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/update/${documentId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        publicationDate: draft.publicationDate instanceof Date
          ? draft.publicationDate.toISOString()
          : draft.publicationDate,
        category: draft.category,
        content: JSON.stringify(draft.content),
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`[articles/update] ${res.status} - ${await res.text()}`);
  }
}

export default function UpdateArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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

  async function handleSubmit(draft: ArticleDraft) {
    setError(null);
    startTransition(async () => {
      try {
        await updateArticle(documentId, draft);
        router.push(`/blog/view/${documentId}`);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue.",
        );
      }
    });
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="font-bold text-quaternary">Chargement…</p>
      </div>
    );
  }

  if (!article && !isLoading) {
    return (
      <div className="layout-header-spacing container">
        <p className="text-primary font-bold">Article introuvable.</p>
      </div>
    );
  }

  const initialDraft: ArticleDraft = {
    publicationDate: article
      ? new Date(article.publicationDate)
      : new Date(),
    category: article?.category ?? "news",
    content: article?.content ?? [],
  };

  return (
    <div className="layout-header-spacing">
      <div className="container">
        <Breadcrumb />
      </div>
      <ArticleForm
        heading="Modifier l'article"
        submitLabel="Enregistrer"
        isSaving={isPending}
        error={error}
        initialDraft={initialDraft}
        onSubmit={handleSubmit}
        onCancel={() => router.push(`/blog/view/${documentId}`)}
      />
    </div>
  );
}
