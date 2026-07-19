"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const SEGMENT_LABELS: Record<string, string> = {
  "adoption-listings": "À l'adoption",
  blog: "Blog",
  about: "À propos",
  contact: "Contact",
  distribution: "Distribution",
  donation: "Faire un don",
  login: "Connexion",
  admin: "Administration",
  volunteer: "Bénévoles",
  volunteers: "Bénévoles",
  adopter: "Adoptants",
  adopters: "Adoptants",
  absences: "Absences",
  calendar: "Calendrier",
  view: "Consulter",
  create: "Créer",
  update: "Modifier",
  delete: "Supprimer",
  register: "Inscription",
  complete: "Confirmation",
  profile: "Profil",
  account: "Mon compte",
  requests: "Demandes",
  "legal-notice": "Mentions légales",
  "pet-matchmaker": "Trouver mon compagnon idéal",
};


const SEGMENT_HREFS: Record<string, string> = {
  volunteers: "/account/volunteers",
  adopters: "/account/adopters",
  absences: "/absences/calendar",
};

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments
    .map((segment, index) => {
      const label = SEGMENT_LABELS[segment] ?? null;
      const href =
        SEGMENT_HREFS[segment] ?? "/" + segments.slice(0, index + 1).join("/");
      return { href, label };
    })
    .filter((crumb) => crumb.label !== null) as {
    href: string;
    label: string;
  }[];

  if (crumbs.length === 0) return null;

  return (
    <div className="container">
      <nav aria-label="Fil d'ariane">
        <ol className="flex items-center gap-1.5 text-sm text-quaternary/60 flex-wrap">
          <li>
            <Link
              href="/"
              className="hover:text-quaternary transition-colors duration-200"
            >
              Accueil
            </Link>
          </li>
          {crumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              <span className="text-quaternary/30" aria-hidden="true">
                ›
              </span>
              {i === crumbs.length - 1 ? (
                <span className="font-bold underline text-quaternary">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-quaternary transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
