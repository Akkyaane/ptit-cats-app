"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cookies = ["adoptant_id", "volunteer_id", "user_role"];
  const getCookie = (name: string): string | null => {
    if (typeof window === "undefined") return null;
    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${name}=([^;]*)`),
    );
    return match ? decodeURIComponent(match[1]) : null;
  };
  const [adoptantId, volunteerId, userRole] = cookies.map(getCookie);
  const userType = volunteerId ? "volunteer" : adoptantId ? "adoptant" : null;
  const userId = volunteerId ?? adoptantId;
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Accueil" },
    { href: "/adoption-posts", label: "À l'adoption" },
    { href: "/distribution", label: "Distribution" },
    { href: "/about", label: "À propos" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/donation", label: "Faire un don" },
    { href: "/login", label: "Se connecter / S'inscrire" },
    ...(userRole === "Admin" ? [{ href: "/admin", label: "Admin" }] : []),
    ...(userType && userId
      ? [{ href: `/${userType}/view/${userId}`, label: "Mon profil" }]
      : []),
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-200 ${
        isScrolled ? "bg-[var(--color-tertiary)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto py-4 relative px-[1.75rem]">
        <div className="flex flex-row items-center justify-between">
          <a href="/" className="flex flex-row items-center gap-3">
            <img
              src="/assets/img/logo.png"
              alt="Logo SansCroquettesFixes"
              className="size-10 md:size-12 border-2 border-[var(--color-secondary)] rounded-full hover:scale-110 transition-transform duration-300"
            />
            <span className="text-lg md:text-xl font-bold tracking-tight">
              Sans Croquettes Fixes
            </span>
          </a>
          <ul className="hidden lg:flex flex-row gap-3">
            {links.map((link) =>
              pathname === link.href ? null : (
                <li key={link.href}>
                  {link.href === "/donation" ? (
                    <Button href={link.href} variant="secondary" size="sm">
                      {link.label}
                    </Button>
                  ) : link.href === "/login" ||
                    userRole === "Admin" ||
                    volunteerId ||
                    adoptantId ? (
                    <Button href={link.href} variant="primary" size="sm">
                      {link.label}
                    </Button>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-[var(--color-quaternary)] transition-colors duration-200 lg:text-lg"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ),
            )}
          </ul>
          <button
            className="lg:hidden p-2 hover:bg-white/15 rounded-xl transition-colors duration-200"
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
          className={`lg:hidden fixed inset-0 bg-[var(--color-tertiary)] overflow-hidden transition-all duration-200 ease-in-out z-60 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <button
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
                <li key={link.href}>
                  {link.href === "/donation" ? (
                    <a
                      href={link.href}
                      className="block w-full text-center px-4 py-3 font-bold rounded-xl hover:bg-transparent bg-[var(--color-quaternary)] backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:text-[var(--color-quaternary)] transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : link.href === "/login" ||
                    userRole === "Admin" ||
                    volunteerId ||
                    adoptantId ? (
                    <a
                      href={link.href}
                      className="block w-full text-center px-4 py-3 font-bold rounded-xl hover:bg-transparent bg-[var(--color-primary)] backdrop-blur-sm border border-2 border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="block py-3 hover:text-[var(--color-quaternary)] transition-colors duration-200 text-lg"
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
