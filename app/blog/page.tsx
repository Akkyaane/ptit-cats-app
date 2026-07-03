"use client";

import { useState, useEffect } from "react";
import ArticleCard from "@/components/ArticleCard";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import IArticle from "@/interfaces/IArticle";
import {
  CATEGORY_LABELS,
  extractTitle,
  extractDescription,
  extractImageUrl,
} from "@/utils/articleHelper";

export default function BlogPage() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
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

  const usedCategories = [...new Set(articles.map((a) => a.category))];
  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const filterBtnBase =
    "px-4 py-2 rounded-xl border-2 font-bold text-sm transition-colors duration-200";
  const filterBtnActive = "bg-primary border-primary text-secondary";
  const filterBtnInactive =
    "border-tertiary text-quaternary hover:border-primary hover:text-primary";

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
        <section className="container flex flex-col gap-12 items-center">
          <Heading
            type="h2"
            headingVariant="quaternary"
            underlineVariant="tertiary"
          >
            Notre blog
          </Heading>

          {/* Filtres par catégorie */}
          {!isLoading && usedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveCategory("all")}
                className={`${filterBtnBase} ${activeCategory === "all" ? filterBtnActive : filterBtnInactive}`}
              >
                Tous
              </button>
              {usedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${filterBtnBase} ${activeCategory === cat ? filterBtnActive : filterBtnInactive}`}
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </button>
              ))}
            </div>
          )}

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

          {!isLoading && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filtered.map((article) => {
                const title = extractTitle(article.content);
                const description = extractDescription(article.content);
                const imageUrl = extractImageUrl(article.content);
                const date = new Date(article.publicationDate).toLocaleDateString(
                  "fr-FR",
                  { year: "numeric", month: "long", day: "numeric" },
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

          <Button href="/blog/create">Écrire un article</Button>
        </section>
      </main>
    </div>
  );
}