"use client";

import Link from "next/link";
import { AccountUser } from "./types";
import MyRequestsManager from "./MyRequestsManager";
import IAdoptionRequest from "@/interfaces/IAdoptionRequest";

type ActionLink = {
  label: string;
  description: string;
  href: string;
  icon: string;
};

const ACTIONS: Record<string, ActionLink> = {
  volunteers: {
    label: "Bénévoles",
    description: "Gérer les comptes bénévoles",
    href: "/account/volunteers",
    icon: "B",
  },
  adopters: {
    label: "Adoptants",
    description: "Gérer les comptes adoptants",
    href: "/account/adopters",
    icon: "A",
  },
  absences: {
    label: "Absences",
    description: "Gérer les absences des bénévoles",
    href: "/absences/calendar",
    icon: "A",
  },
  myAbsences: {
    label: "Absences",
    description: "Gérer mes absences",
    href: "/absences/calendar",
    icon: "A",
  },
  listings: {
    label: "Annonces d'adoption",
    description: "Gérer les annonces",
    href: "/account/listings",
    icon: "A",
  },
  articles: {
    label: "Articles",
    description: "Gérer les articles",
    href: "/account/articles",
    icon: "A",
  },
  requestsVolunteer: {
    label: "Demandes d'adoption",
    description: "Gérer les demandes",
    href: "/account/requests",
    icon: "D",
  },
};

function linksForUser(user: AccountUser): ActionLink[] {

  if (user.kind !== "volunteer") return [];

  switch (user.volunteer.role) {
    case "admin":
      return [
        ACTIONS.volunteers,
        ACTIONS.adopters,
        ACTIONS.absences,
        ACTIONS.listings,
        ACTIONS.articles,
      ];
    case "manager":
      return [
        ACTIONS.requestsVolunteer,
        ACTIONS.myAbsences,
        ACTIONS.listings,
        ACTIONS.articles,
      ];
    case "referent":
      return [
        ACTIONS.requestsVolunteer,
        ACTIONS.myAbsences,
        ACTIONS.articles,
      ];
    default:
      return [];
  }
}

export default function ActionsPanel({
  user,
  adopterRequests = [],
}: {
  user: AccountUser;
  adopterRequests?: IAdoptionRequest[];
}) {

  if (user.kind === "adopter") {
    return <MyRequestsManager requests={adopterRequests} />;
  }

  const links = linksForUser(user);

  if (links.length === 0) {
    return (
      <p className="text-center text-quaternary/60">
        Aucune action disponible pour votre profil.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {links.map((link) => (
        <Link
          key={link.href + link.label}
          href={link.href}
          className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl shrink-0">
            {link.icon}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-lg">{link.label}</p>
            <p className="text-sm text-quaternary/60">{link.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
