"use client";

import { useState, useEffect } from "react";
import ArticleCard from "@/components/article/ArticleCard";
import Pagination from "@/components/ui/Pagination";
import IArticle from "@/interfaces/IArticle";
import {
  CATEGORY_LABELS,
  extractTitle,
  extractDescription,
  extractImageUrl,
} from "@/helpers/articleHelper";

const ARTICLES_PER_PAGE = 9;

export default function ArticleList() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`,
        );
        if (!res.ok) throw new Error(`[articles] ${res.status}`);
        const data = await res.json();
        setArticles(data.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const usedCategories = [...new Set(articles.map((a) => a.category))].sort(
    (a, b) =>
      (CATEGORY_LABELS[a] ?? a).localeCompare(CATEGORY_LABELS[b] ?? b, "fr"),
  );

  const filtered =
    activeCategory === null
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );

  function handleCategoryChange(cat: string) {
    setActiveCategory((prev) => (prev === cat ? null : cat));
    setCurrentPage(1);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">

      <aside className="w-full lg:w-56 shrink-0">
        {!isLoading && usedCategories.length > 0 && (
          <div className="flex flex-col gap-0.5 border-2 border-tertiary rounded-xl p-4">
            <span className="font-bold text-quaternary text-sm uppercase tracking-wide px-1 mb-1">
              Catégories
            </span>
            {usedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-150 ${
                  activeCategory === cat
                    ? "bg-primary text-secondary"
                    : "text-quaternary hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>
        )}
      </aside>

      <div className="flex-1 min-w-0 flex flex-col gap-8">
        {isLoading && (
          <p className="text-center font-bold text-quaternary">Chargement…</p>
        )}

        {error && (
          <p className="text-center text-primary font-bold">{error}</p>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <p className="text-center text-lg">Aucun article disponible.</p>
        )}

        {!isLoading && paginated.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginated.map((article) => {
              const title = extractTitle(article.content);
              const description = extractDescription(article.content);
              const imageUrl = extractImageUrl(article.content);
              const date = new Date(article.publicationDate).toLocaleDateString(
                "fr-FR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              );
              return (
                <ArticleCard
                  key={article.documentId}
                  title={title}
                  date={date}
                  description={description}
                  imageUrl={imageUrl}
                  link={`/blog/view/${article.documentId}`}
                />
              );
            })}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filtered.length}
          itemLabel="article"
        />
      </div>
    </div>
  );
}
