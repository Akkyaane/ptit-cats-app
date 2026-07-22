"use client";

import { useState } from "react";
import { AccountUser } from "./types";
import { ROLE_LABELS, ROLE_BADGES } from "./roles";
import Button from "@/components/ui/Button";
import AccountSettings from "./AccountSettings";
import ActionsPanel from "./ActionsPanel";
import IAdoptionRequest from "@/interfaces/IAdoptionRequest";

export default function AccountView({
  user,
  initialTab,
  bannerMessage,
  adopterRequests = [],
}: {
  user: AccountUser;
  initialTab: "actions" | "compte";
  bannerMessage: string | null;
  adopterRequests?: IAdoptionRequest[];
}) {
  const [activeTab, setActiveTab] = useState<"actions" | "compte">(initialTab);

  const { firstName, lastName, roleKey } =
    user.kind === "adopter"
      ? {
          firstName: user.adopter.firstName,
          lastName: user.adopter.lastName,
          roleKey: "adopter",
        }
      : {
          firstName: user.volunteer.firstName,
          lastName: user.volunteer.lastName,
          roleKey: user.volunteer.role,
        };

  const actionsLabel =
    user.kind === "adopter" ? "Mes demandes d'adoptions" : "Mes actions";

  async function handleLogout() {
    await fetch("/auth/signout", { method: "POST" });
    window.location.assign("/");
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:items-start">

      <aside className="w-full lg:w-72 lg:shrink-0 lg:sticky lg:top-28">
        <div className="overflow-hidden rounded-2xl shadow-md flex flex-col bg-white">

          <div className="p-8 flex flex-col items-center text-center gap-4 border-b border-gray-100">
            <div className="size-20 rounded-full bg-primary flex items-center justify-center text-white font-bold text-3xl">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-center gap-2 min-w-0">
              <p className="font-bold text-lg leading-tight break-words">
                {firstName} {lastName}
              </p>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  ROLE_BADGES[roleKey] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {ROLE_LABELS[roleKey] ?? roleKey}
              </span>
            </div>
          </div>

          <nav className="p-3 flex flex-row lg:flex-col gap-2">
            {(["actions", "compte"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 lg:flex-none w-full text-center px-4 py-3.5 rounded-xl font-bold text-sm transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-sm"
                    : "text-quaternary/70 hover:text-quaternary hover:bg-gray-50"
                }`}
              >
                {tab === "actions" ? actionsLabel : "Mes informations"}
              </button>
            ))}
          </nav>

          <div className="mt-auto p-3 border-t border-gray-100">
            <Button variant="secondary" size="sm" full onClick={handleLogout}>
              Se déconnecter
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col gap-6">

        {bannerMessage && (
          <div className="rounded-2xl border-tertiary border text-tertiary px-6 py-4 text-sm font-medium">
            {bannerMessage}
          </div>
        )}

        {activeTab === "actions" && (
          <ActionsPanel user={user} adopterRequests={adopterRequests} />
        )}

        {activeTab === "compte" && <AccountSettings user={user} />}
      </div>
    </div>
  );
}
