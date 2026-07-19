"use client";

import { useState } from "react";
import IAdopter from "@/interfaces/IAdopter";
import IAdoptionRequest from "@/interfaces/IAdoptionRequest";
import AdopterProfileForm from "@/components/adopter/AdopterProfileForm";
import ALCard from "@/components/adoptionListing/ALCard";

const statusConfig: Record<string, { label: string; className: string }> = {
  "on hold": { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
  accepted: { label: "Acceptée", className: "bg-green-100 text-green-800" },
  refused: { label: "Refusée", className: "bg-red-100 text-red-800" },
};

export default function ProfileTabs({
  adopter,
  adoptionRequests,
  initialTab,
}: {
  adopter: IAdopter;
  adoptionRequests: IAdoptionRequest[];
  initialTab: "profil" | "demandes";
}) {
  const [activeTab, setActiveTab] = useState<"profil" | "demandes">(initialTab);

  const pendingCount = adoptionRequests.filter(
    (r) => r.entityStatus === "to be processed" || r.entityStatus === "pending"
  ).length;

  return (
    <div className="flex flex-col gap-6">

      <div className="flex gap-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5">
        <button
          onClick={() => setActiveTab("profil")}
          className={`flex-1 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors duration-200 ${
            activeTab === "profil"
              ? "bg-primary text-white shadow-sm"
              : "text-quaternary/70 hover:text-quaternary hover:bg-gray-50"
          }`}
        >
          Mon profil
        </button>
        <button
          onClick={() => setActiveTab("demandes")}
          className={`flex-1 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors duration-200 flex items-center justify-center gap-2 ${
            activeTab === "demandes"
              ? "bg-primary text-white shadow-sm"
              : "text-quaternary/70 hover:text-quaternary hover:bg-gray-50"
          }`}
        >
          Mes demandes
          {adoptionRequests.length > 0 && (
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-black ${
                activeTab === "demandes"
                  ? "bg-white text-primary"
                  : pendingCount > 0
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {adoptionRequests.length}
            </span>
          )}
        </button>
      </div>


      {activeTab === "profil" && (
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold">Modifier mon profil</h2>
            <p className="text-sm text-quaternary/70 leading-relaxed">
              Mettez à jour vos informations pour que l'équipe puisse vous proposer
              un suivi plus juste et un futur matching plus pertinent.
            </p>
            <div className="w-10 h-1 bg-tertiary rounded-full" />
          </div>
          <AdopterProfileForm adopter={adopter} />
        </section>
      )}

      {activeTab === "demandes" && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold">Mes demandes d'adoption</h2>
          {adoptionRequests.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-12 text-center flex flex-col gap-3 items-center">
              <p className="font-bold text-quaternary/70">Aucune demande d'adoption pour l'instant.</p>
              <p className="text-sm text-quaternary/50">
                Parcourez les annonces disponibles sur le site".
              </p>
              <a
                href="/adoption-listings"
                className="mt-2 px-5 py-2.5 font-bold rounded-xl bg-primary border-2 border-primary text-white hover:bg-primary/10 hover:text-primary transition-colors duration-200 text-sm"
              >
                Voir les chats disponibles
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {adoptionRequests.map((req) => {
                const status = statusConfig[req.entityStatus] ?? {
                  label: req.entityStatus,
                  className: "bg-gray-100 text-gray-600",
                };
                const date = new Date(req.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
                return (
                  <div key={req.documentId} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between px-1">
                      <p className="text-xs text-quaternary/50">Demande soumise le {date}</p>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    {req.adoption_listing && <ALCard {...req.adoption_listing} />}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
