"use client";

import { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import IAbsence from "@/interfaces/IAbsence";
import { deleteAbsence } from "@/app/absences/action";

const PER_PAGE = 8;

function formatDate(value: Date | string | null | undefined) {
  return value ? new Date(value).toLocaleDateString("fr-FR") : "—";
}

export default function AbsencesManager({
  absences: initial,
}: {
  absences: IAbsence[];
}) {
  const [absences, setAbsences] = useState(initial);
  const [page, setPage] = useState(1);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(absences.length / PER_PAGE);
  const paginated = absences.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  async function handleDelete(documentId: string) {
    setDeletingId(documentId);
    setError(null);
    const result = await deleteAbsence(documentId);
    setDeletingId(null);

    if (result?.error) {
      setError(result.error);
      return;
    }

    setConfirmingId(null);
    const next = absences.filter((a) => a.documentId !== documentId);
    setAbsences(next);

    const newTotal = Math.max(1, Math.ceil(next.length / PER_PAGE));
    if (page > newTotal) setPage(newTotal);
  }

  return (
    <section className="flex flex-col gap-4">
      {error && (
        <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      {absences.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-quaternary/60">
          Aucune absence enregistrée.
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead className="bg-tertiary/10 text-left">
                <tr>
                  <th className="px-6 py-3 font-bold">Bénévole</th>
                  <th className="px-6 py-3 font-bold">Du</th>
                  <th className="px-6 py-3 font-bold">Au</th>
                  <th className="px-6 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((a) => {
                  const isConfirming = confirmingId === a.documentId;
                  const isDeleting = deletingId === a.documentId;
                  return (
                    <tr
                      key={a.documentId}
                      className="hover:bg-secondary/40 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold">
                        {a.volunteer
                          ? `${a.volunteer.firstName} ${a.volunteer.lastName}`
                          : "—"}
                      </td>
                      <td className="px-6 py-4">{formatDate(a.startDate)}</td>
                      <td className="px-6 py-4">{formatDate(a.endDate)}</td>
                      <td className="px-6 py-4">
                        {isConfirming ? (
                          <div className="flex items-center justify-end gap-3">
                            <span className="text-xs text-quaternary/60 hidden sm:inline">
                              Confirmer ?
                            </span>
                            <button
                              onClick={() => handleDelete(a.documentId)}
                              disabled={isDeleting}
                              className="text-xs font-bold text-white bg-primary border-2 border-primary px-3 py-1.5 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-60 whitespace-nowrap"
                            >
                              {isDeleting ? "Suppression…" : "Confirmer"}
                            </button>
                            <button
                              onClick={() => setConfirmingId(null)}
                              disabled={isDeleting}
                              className="text-xs font-bold text-quaternary/60 hover:text-quaternary transition-colors disabled:opacity-60"
                            >
                              Annuler
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-4">
                            <Link
                              href={`/absences/update/${a.documentId}`}
                              className="text-xs font-bold text-quaternary hover:underline whitespace-nowrap"
                            >
                              Modifier
                            </Link>
                            <button
                              onClick={() => {
                                setError(null);
                                setConfirmingId(a.documentId);
                              }}
                              className="text-xs font-bold text-primary hover:underline whitespace-nowrap"
                            >
                              Supprimer
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={absences.length}
            itemLabel="absence"
          />
        </>
      )}
    </section>
  );
}
