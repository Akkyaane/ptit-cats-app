"use client";

import IAdoptionRequest from "@/interfaces/IAdoptionRequest";
import { adopterStatusBadge } from "@/components/account/adoptionRequestStatus";

function formatDate(value: string | null | undefined) {
  return value
    ? new Date(value).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";
}

function catNames(request: IAdoptionRequest): string {
  const animals = request.adoption_listing?.animals ?? [];
  const names = animals.map((a) => a.name).filter(Boolean);
  return names.length > 0 ? names.join(" & ") : "—";
}

export default function MyRequestsManager({
  requests,
}: {
  requests: IAdoptionRequest[];
}) {
  if (requests.length === 0) {
    return (
      <section className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-12 text-center flex flex-col gap-3 items-center">
          <p className="font-bold text-quaternary/70">
            Aucune demande d'adoption pour l'instant.
          </p>
          <p className="text-sm text-quaternary/50">
            Veuillez parcourir les annonces disponibles sur le site et soumettre une demande si vous souhaitez adopter.
          </p>
          <a
            href="/adoption-listings"
            className="mt-2 px-5 py-2.5 font-bold rounded-xl bg-primary border-2 border-primary text-white hover:bg-primary/10 hover:text-primary transition-colors duration-200 text-sm"
          >
            Voir les chats disponibles
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-tertiary/10 text-left">
            <tr>
              <th className="px-6 py-3 font-bold">Chat</th>
              <th className="px-6 py-3 font-bold">Annonce</th>
              <th className="px-6 py-3 font-bold">Date</th>
              <th className="px-6 py-3 font-bold">Statut</th>
              <th className="px-6 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((r) => {
              const badge = adopterStatusBadge(r.entityStatus);
              const listingId = r.adoption_listing?.documentId;
              return (
                <tr
                  key={r.documentId}
                  className="hover:bg-secondary/40 transition-colors align-top"
                >
                  <td className="px-6 py-4 font-bold">{catNames(r)}</td>
                  <td className="px-6 py-4 text-quaternary/70">
                    {listingId ? (
                      <a
                        href={`/adoption-listings/view/${listingId}`}
                        className="hover:text-primary hover:underline"
                      >
                        {r.adoption_listing?.title ?? "—"}
                      </a>
                    ) : (
                      (r.adoption_listing?.title ?? "—")
                    )}
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
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`/account/requests/${r.documentId}`}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-quaternary/30 text-quaternary hover:bg-quaternary/5 whitespace-nowrap"
                    >
                      Consulter
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
