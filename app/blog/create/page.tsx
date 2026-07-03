"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ArticleForm, { ArticleDraft } from "@/components/blog/ArticleForm";

async function createArticle(draft: ArticleDraft): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        publicationDate: draft.publicationDate.toISOString(),
        category: draft.category,
        content: JSON.stringify(draft.content),
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`[articles/create] ${res.status} - ${await res.text()}`);
  }
}

export default function CreateArticlePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(draft: ArticleDraft) {
    setError(null);
    startTransition(async () => {
      try {
        await createArticle(draft);
        router.push("/blog");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue.",
        );
      }
    });
  }

  return (
    <div className="layout-header-spacing">
      <ArticleForm
        heading="Écrire un article"
        submitLabel="Publier"
        isSaving={isPending}
        error={error}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/blog")}
      />
    </div>
  );
}