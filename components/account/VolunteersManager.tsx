"use client";

import { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import { AccountVolunteer } from "./types";
import { ROLE_LABELS, ROLE_BADGES } from "./roles";

const PER_PAGE = 8;

export default function VolunteersManager({
  volunteers,
}: {
  volunteers: AccountVolunteer[];
}) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(volunteers.length / PER_PAGE);
  const paginated = volunteers.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section className="flex flex-col gap-4">
      {volunteers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-quaternary/60">
          Aucun bénévole enregistré.
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead className="bg-tertiary/10 text-left">
                <tr>
                  <th className="px-6 py-3 font-bold">Bénévole</th>
                  <th className="px-6 py-3 font-bold">Rôle</th>
                  <th className="px-6 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((v) => (
                  <tr
                    key={v.documentId}
                    className="hover:bg-secondary/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold">
                        {v.firstName} {v.lastName}
                      </p>
                      <p className="text-quaternary/60">{v.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                          ROLE_BADGES[v.role] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {ROLE_LABELS[v.role] ?? v.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/volunteers/view/${v.documentId}`}
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
            totalItems={volunteers.length}
            itemLabel="bénévole"
          />
        </>
      )}
    </section>
  );
}
