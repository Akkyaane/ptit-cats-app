"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/Pagination";
import IAdoptionRequest from "@/interfaces/IAdoptionRequest";
import { volunteerStatusBadge } from "@/components/account/adoptionRequestStatus";
import {
  setAdoptionRequestStatus,
  transferRequest,
} from "@/app/adoption-requests/action";

const PER_PAGE = 8;

function formatDate(value: string | null | undefined) {
  return value
    ? new Date(value).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";
}

export default function AdoptionRequestsManager({
  requests,
  viewerDocumentId,
  viewerRole,
}: {
  requests: IAdoptionRequest[];
  viewerDocumentId: string;
  viewerRole: string;
}) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(requests.length / PER_PAGE);
  const paginated = requests.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function runAction(id: string, action: () => Promise<{ error?: string }>) {
    setError(null);
    setPendingId(id);
    startTransition(async () => {
      const result = await action();
      setPendingId(null);
      if (result?.error) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <section className="flex flex-col gap-4">
      {error && (
        <p className="px-4 py-3 rounded-xl bg-primary/10 border-2 border-primary text-primary font-bold text-sm">
          {error}
        </p>
      )}

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-quaternary/60">
          Aucune demande ne vous est attribuée pour le moment.
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-tertiary/10 text-left">
                <tr>
                  <th className="px-6 py-3 font-bold">Adoptant</th>
                  <th className="px-6 py-3 font-bold">Annonce</th>
                  <th className="px-6 py-3 font-bold">Date</th>
                  <th className="px-6 py-3 font-bold">Statut</th>
                  <th className="px-6 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((r) => {
                  const badge = volunteerStatusBadge(r, viewerDocumentId);
                  const transferredByMe =
                    !!r.transferredBy && r.transferredBy === viewerDocumentId;
                  const busy = pendingId === r.documentId && isPending;

                  const canTransfer =
                    viewerRole === "manager" &&
                    r.entityStatus === "to be processed" &&
                    !transferredByMe;
                  const canComplete = r.entityStatus === "pending";

                  return (
                    <tr
                      key={r.documentId}
                      className="hover:bg-secondary/40 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold">
                        {r.adopter
                          ? `${r.adopter.firstName} ${r.adopter.lastName}`
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-quaternary/70">
                        {r.adoption_listing?.title ?? "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(r.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              router.push(`/account/requests/${r.documentId}`)
                            }
                            className="text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-quaternary/30 text-quaternary hover:bg-quaternary/5 whitespace-nowrap"
                          >
                            Consulter
                          </button>
                          {canTransfer && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() =>
                                runAction(r.documentId, () =>
                                  transferRequest(
                                    r.documentId,
                                    viewerDocumentId,
                                  ),
                                )
                              }
                              className="text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-blue-500 text-blue-600 hover:bg-blue-50 disabled:opacity-50 whitespace-nowrap"
                            >
                              {busy ? "…" : "Transférer"}
                            </button>
                          )}
                          {canComplete && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() =>
                                runAction(r.documentId, () =>
                                  setAdoptionRequestStatus(
                                    r.documentId,
                                    "done",
                                  ),
                                )
                              }
                              className="text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-green-600 text-green-700 hover:bg-green-50 disabled:opacity-50 whitespace-nowrap"
                            >
                              {busy ? "…" : "Terminer"}
                            </button>
                          )}
                        </div>
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
            totalItems={requests.length}
            itemLabel="demande"
          />
        </>
      )}
    </section>
  );
}
