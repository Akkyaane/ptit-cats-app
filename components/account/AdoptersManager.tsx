"use client";

import { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import IAdopter from "@/interfaces/IAdopter";

const PER_PAGE = 8;

export default function AdoptersManager({
  adopters,
}: {
  adopters: IAdopter[];
}) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(adopters.length / PER_PAGE);
  const paginated = adopters.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section className="flex flex-col gap-4">
      {adopters.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-quaternary/60">
          Aucun adoptant enregistré.
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm min-w-[360px]">
              <thead className="bg-tertiary/10 text-left">
                <tr>
                  <th className="px-6 py-3 font-bold">Email</th>
                  <th className="px-6 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((a) => (
                  <tr
                    key={a.documentId}
                    className="hover:bg-secondary/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold">{a.email}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/adopters/view/${a.documentId}`}
                        className="text-xs font-bold text-quaternary hover:underline whitespace-nowrap"
                      >
                        Consulter
                      </Link>
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
            totalItems={adopters.length}
            itemLabel="adoptant"
          />
        </>
      )}
    </section>
  );
}
