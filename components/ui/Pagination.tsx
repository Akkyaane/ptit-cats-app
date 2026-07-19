"use client";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Nombre total d'éléments de la liste (toutes pages confondues). */
  totalItems?: number;
  /** Libellé au singulier (par défaut « résultat »). */
  itemLabel?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemLabel = "résultat",
}: PaginationProps) {
  // Rien à afficher : ni compteur, ni pagination multi-pages.
  if (totalItems === undefined && totalPages <= 1) return null;

  const count =
    totalItems !== undefined ? (
      <p className="text-sm font-bold text-quaternary/60 text-center">
        {totalItems} {itemLabel}
        {totalItems > 1 ? "s" : ""}
      </p>
    ) : null;

  return (
    <div className="flex flex-col items-center gap-3">
      {count}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Page précédente"
            className="px-3 py-2 rounded-lg border-2 border-tertiary text-sm font-bold text-quaternary disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={`w-9 h-9 rounded-lg border-2 text-sm font-bold transition-colors ${
                currentPage === page
                  ? "bg-primary border-primary text-secondary"
                  : "border-tertiary text-quaternary hover:border-primary hover:text-primary"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Page suivante"
            className="px-3 py-2 rounded-lg border-2 border-tertiary text-sm font-bold text-quaternary disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
