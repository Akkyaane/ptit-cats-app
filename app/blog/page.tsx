"use client";

import { useState, useEffect } from "react";
import ArticleCard from "@/components/article/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import IArticle from "@/interfaces/IArticle";
import {
  CATEGORY_LABELS,
  extractTitle,
  extractDescription,
  extractImageUrl,
} from "@/helpers/articleHelper";

const ARTICLES_PER_PAGE = 9;

export default function BlogPage() {
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
    <div>
      <header className="bg-tertiary h-28">
        <section className="container hidden">
          <Heading type="h1" headingVariant="secondary">
            Blog
          </Heading>
        </section>
      </header>

      <main>
        <Breadcrumb />
        <section className="container flex flex-col gap-10">
          <Heading
            type="h2"
            headingVariant="quaternary"
            underlineVariant="tertiary"
          >
            Notre blog
          </Heading>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Grille d'articles */}
            <div className="flex-1 min-w-0 flex flex-col gap-8">
              {isLoading && (
                <p className="text-center font-bold text-quaternary">
                  Chargement…
                </p>
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
                    const date = new Date(
                      article.publicationDate,
                    ).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border-2 border-tertiary text-sm font-bold text-quaternary disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
                  >
                    ←
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-lg border-2 text-sm font-bold transition-colors ${
                          currentPage === page
                            ? "bg-primary border-primary text-secondary"
                            : "border-tertiary text-quaternary hover:border-primary hover:text-primary"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border-2 border-tertiary text-sm font-bold text-quaternary disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar droite */}
            <aside className="w-full lg:w-52 shrink-0 flex flex-col gap-4">
              {/* Catégories */}
              {!isLoading && usedCategories.length > 0 && (
                <div className="flex flex-col gap-0.5">
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

                            <Button href="/blog/create" variant="primary" size="md">
                Écrire un article
              </Button>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}