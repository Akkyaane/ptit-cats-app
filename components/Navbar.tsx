"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "./ui/Button";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [adopterId, setAdopterId] = useState<string | null>(null);
  const [volunteerId, setVolunteerId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const match = document.cookie.match(
        new RegExp(`(?:^|;\\s*)${name}=([^;]*)`),
      );
      return match ? decodeURIComponent(match[1]) : null;
    };
    setAdopterId(getCookie("adopter_id"));
    setVolunteerId(getCookie("volunteer_id"));
    setUserRole(getCookie("user_role"));
  }, []);

  const userType = volunteerId ? "volunteer" : adopterId ? "adopter" : null;
  const userHref = volunteerId
    ? `/volunteers/view/${volunteerId}`
    : adopterId
      ? "/profile"
      : null;
  const pathname = usePathname();

  // Déconnexion : POST (non préfetchable) puis rechargement dur pour que
  // toute l'arborescence (dont cette Navbar) relise les cookies effacés.
  async function handleLogout() {
    await fetch("/auth/signout", { method: "POST" });
    window.location.assign("/");
  }

  type NavLink = {
    href: string;
    label: string;
    variant?: "primary" | "secondary";
    onClick?: () => void;
  };
  const links: NavLink[] = [
    { href: "/", label: "Accueil" },
    { href: "/adoption-listings", label: "À l'adoption" },
    { href: "/distribution", label: "Distribution" },
    { href: "/about", label: "À propos" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/donation", label: "Faire un don", variant: "secondary" },
    ...(!userType
      ? [
          {
            href: "/auth/signin",
            label: "Se connecter / S'inscrire",
            variant: "primary" as const,
          },
        ]
      : []),
    ...(userType && userHref
      ? [{ href: userHref, label: "Mon profil", variant: "primary" as const }]
      : []),
    ...(userRole === "admin"
      ? [{ href: "/admin", label: "Admin", variant: "primary" as const }]
      : []),
    ...(userRole
      ? [
          {
            href: "/auth/signout",
            label: "Se déconnecter",
            variant: "primary" as const,
            onClick: handleLogout,
          },
        ]
      : []),
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-200 text-secondary ${
        [
          "/",
          "/distribution",
          "/about",
          "/contact",
          "/donation",
          "/legal-notice",
        ].includes(pathname)
          ? isScrolled
            ? "bg-tertiary"
            : "bg-transparent"
          : "bg-tertiary"
      }`}
    >
      <div className="container mx-auto py-4 relative">
        <div className="flex flex-row items-center justify-between">
          <Link
            href="/"
            className="flex flex-row items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary rounded-sm"
          >
            <Image
              src="/assets/img/logo.png"
              alt="Logo SansCroquettesFixes"
              width={48}
              height={48}
              className="size-10 md:size-12 border-2 border-secondary rounded-full hover:scale-110 transition-transform duration-300"
            />
            <span className="text-lg md:text-xl font-bold tracking-tight">
              Sans Croquettes Fixes
            </span>
          </Link>
          <ul className="hidden xl:flex flex-row items-center gap-3">
            {links.map((link) =>
              pathname === link.href ? null : (
                <li key={link.href}>
                  {link.onClick ? (
                    <Button
                      variant={link.variant ?? "primary"}
                      size="sm"
                      onClick={link.onClick}
                    >
                      {link.label}
                    </Button>
                  ) : link.variant === "secondary" ? (
                    <Button href={link.href} variant="secondary" size="sm">
                      {link.label}
                    </Button>
                  ) : link.variant === "primary" ? (
                    <Button href={link.href} variant="primary" size="sm">
                      {link.label}
                    </Button>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-quaternary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary rounded-sm whitespace-nowrap"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ),
            )}
          </ul>
          <button
            className="xl:hidden p-2 hover:bg-white/15 rounded-xl transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`xl:hidden fixed inset-0 bg-tertiary overflow-y-auto transition-all duration-200 ease-in-out z-[60] ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute top-4 md:top-5 right-7 p-2 hover:bg-white/15 rounded-xl transition-colors duration-200 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(false);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul
            className="flex flex-col gap-3 h-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((link) =>
              pathname === link.href ? null : (
                <li className="flex flex-col gap-2" key={link.href}>
                  {link.onClick ? (
                    <Button
                      variant={link.variant ?? "primary"}
                      size="sm"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        link.onClick!();
                      }}
                    >
                      {link.label}
                    </Button>
                  ) : link.variant === "secondary" ? (
                    <Button
                      href={link.href}
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Button>
                  ) : link.variant === "primary" ? (
                    <Button
                      href={link.href}
                      variant="primary"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Button>
                  ) : (
                    <a
                      href={link.href}
                      className="block py-3 hover:text-quaternary transition-colors duration-200 text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-quaternary rounded-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
