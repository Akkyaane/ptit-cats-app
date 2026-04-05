import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-[var(--color-secondary)]/25 p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="size-10 md:size-12 border-2 border-[var(--color-secondary)] rounded-full hover:scale-110 transition-transform duration-300"
          />
          <span className="text-lg md:text-xl font-bold tracking-tight">
            Sans Croquettes Fixes
          </span>
        </div>
        <ul className="hidden lg:flex flex-row gap-4">
          <li>
            <a
              href="/adoption-posts"
              className="hover:text-[var(--color-quaternary)] transition-colors duration-300"
            >
              À l'adoption
            </a>
          </li>
          <li>
            <a
              href="/kibble-distribution"
              className="hover:text-[var(--color-quaternary)] transition-colors duration-300"
            >
              Distribution de croquettes
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="hover:text-[var(--color-quaternary)] transition-colors duration-300"
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href="/blog"
              className="hover:text-[var(--color-quaternary)] transition-colors duration-300"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-[var(--color-quaternary)] transition-colors duration-300"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="/donation"
              className="px-3 lg:px-4 py-2 font-bold rounded-xl bg-[var(--color-quaternary)] backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-quaternary)]/15 hover:border-[var(--color-secondary)] transition-colors duration-200"
            >
              Faire un don
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="px-3 lg:px-4 py-2 font-bold rounded-xl bg-[var(--color-primary)] backdrop-blur-sm border border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)]/15 hover:border-[var(--color-secondary)] transition-colors duration-200"
            >
              Se connecter / S'inscrire
            </a>
          </li>
        </ul>
        <button
          className="lg:hidden p-2 hover:bg-white/15 rounded-xl transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 mt-4 border-t border-[var(--color-secondary)]/15 pt-4"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4">
          <li>
            <a
              href="/adoption-posts"
              className="block py-2 hover:text-[var(--color-quaternary)] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              À l'adoption
            </a>
          </li>
          <li>
            <a
              href="/kibble-distribution"
              className="block py-2 hover:text-[var(--color-quaternary)] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Distribution de croquettes
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="block py-2 hover:text-[var(--color-quaternary)] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href="/blog"
              className="block py-2 hover:text-[var(--color-quaternary)] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="block py-2 hover:text-[var(--color-quaternary)] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </li>
          <li className="pt-2">
            <a
              href="/donation"
              className="block w-full text-center px-4 py-3 font-bold rounded-xl bg-[var(--color-quaternary)] backdrop-blur-sm border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-quaternary)]/15 hover:border-[var(--color-secondary)] transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Faire un don
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="block w-full text-center px-4 py-3 font-bold rounded-xl bg-[var(--color-primary)] backdrop-blur-sm border border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)]/15 hover:border-[var(--color-secondary)] transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Se connecter / S'inscrire
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
