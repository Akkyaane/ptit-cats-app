"use client";

import { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import IArticle from "@/interfaces/IArticle";
import { CATEGORY_LABELS, extractTitle } from "@/helpers/articleHelper";

const PER_PAGE = 8;

function formatDate(value: Date | string | null | undefined) {
  return value
    ? new Date(value).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";
}

export default function ArticlesManager({
  articles,
}: {
  articles: IArticle[];
}) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(articles.length / PER_PAGE);
  const paginated = articles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section className="flex flex-col gap-4">
      {articles.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-quaternary/60">
          Vous n&apos;avez pas encore écrit d&apos;article.
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead className="bg-tertiary/10 text-left">
                <tr>
                  <th className="px-6 py-3 font-bold">Titre</th>
                  <th className="px-6 py-3 font-bold">Catégorie</th>
                  <th className="px-6 py-3 font-bold">Date</th>
                  <th className="px-6 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((a) => (
                  <tr
                    key={a.documentId}
                    className="hover:bg-secondary/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold">
                      {extractTitle(a.content)}
                    </td>
                    <td className="px-6 py-4 text-quaternary/70 whitespace-nowrap">
                      {CATEGORY_LABELS[a.category] ?? a.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(a.publicationDate)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/blog/view/${a.documentId}`}
                          className="text-xs font-bold text-quaternary hover:underline whitespace-nowrap"
                        >
                          Consulter
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={articles.length}
            itemLabel="article"
          />
        </>
      )}
    </section>
  );
}
