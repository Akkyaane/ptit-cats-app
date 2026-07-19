"use client";

import { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import IAdoptionListing from "@/interfaces/IAdoptionListing";

const PER_PAGE = 8;

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  "adoption pending": {
    label: "En cours",
    className: "bg-tertiary/30 text-quaternary",
  },
  "adoption completed": {
    label: "Adopté",
    className: "bg-primary/10 text-primary",
  },
};

export default function AdoptionListingsManager({
  listings,
}: {
  listings: IAdoptionListing[];
}) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(listings.length / PER_PAGE);
  const paginated = listings.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section className="flex flex-col gap-4">
      {listings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-quaternary/60">
          Aucune annonce pour le moment.
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead className="bg-tertiary/10 text-left">
                <tr>
                  <th className="px-6 py-3 font-bold">Annonce</th>
                  <th className="px-6 py-3 font-bold">Statut</th>
                  <th className="px-6 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((l) => {
                  const status = STATUS_CONFIG[l.entityStatus] ?? {
                    label: l.entityStatus,
                    className: "bg-quaternary/10 text-quaternary",
                  };
                  return (
                    <tr
                      key={l.documentId}
                      className="hover:bg-secondary/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-bold">{l.title}</p>
                        {l.isDuo && (
                          <span className="text-xs text-quaternary/50">Duo</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-4">
                          <Link
                            href={`/adoption-listings/view/${l.documentId}`}
                            className="text-xs font-bold text-quaternary hover:underline whitespace-nowrap"
                          >
                            Consulter
                          </Link>
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
            totalItems={listings.length}
            itemLabel="annonce"
          />
        </>
      )}
    </section>
  );
}
