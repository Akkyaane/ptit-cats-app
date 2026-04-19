"use client";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Accueil" },
    { href: "/adoption-posts", label: "À l'adoption" },
    { href: "/distribution", label: "Distribution" },
    { href: "/about", label: "À propos" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/legal-notice", label: "Mentions légales" },
    { href: "/donation", label: "Faire un don" },
  ];

  return (
    <footer className="bg-[var(--color-quaternary)] py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col justify-content items-center gap-8">
          <ul className="grid grid-cols-2 gap-3 text-center md:flex md:gap-6">
            {links.map((link) =>
              pathname === link.href ? null : (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[var(--color-tertiary)] transition-colors duration-200 lg:text-lg"
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
          <div className="flex gap-4 border-b border-[var(--color-tertiary)] pb-4 w-1/2 justify-center">
            <a
              href="https://www.facebook.com/sanscroquettesfixes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                className="w-[30px] md:w-[40px]"
              >
                {" "}
                <path
                  d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"
                  fill="#ffffff"
                />
              </svg>
            </a>
            <a
              href="https://x.com/CroquettesFixes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                fill="#FFFFFF"
                className="w-[30px] md:w-[40px]"
              >
                <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/sanscroquettesfixes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="#ffffff"
                className="w-[30px] md:w-[40px]"
              >
                <g>
                  <path d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z" />

                  <path d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8   c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z" />

                  <path d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8   c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z" />
                </g>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@sanscroquettesfixes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                className="w-[30px] md:w-[40px]"
              >
                {" "}
                <path
                  d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.104,4,24,4z M22.689,13.474 c-0.13,0.012-0.261,0.02-0.393,0.02c-1.495,0-2.809-0.768-3.574-1.931c0,3.049,0,6.519,0,6.577c0,2.685-2.177,4.861-4.861,4.861 C11.177,23,9,20.823,9,18.139c0-2.685,2.177-4.861,4.861-4.861c0.102,0,0.201,0.009,0.3,0.015v2.396c-0.1-0.012-0.197-0.03-0.3-0.03 c-1.37,0-2.481,1.111-2.481,2.481s1.11,2.481,2.481,2.481c1.371,0,2.581-1.08,2.581-2.45c0-0.055,0.024-11.17,0.024-11.17h2.289 c0.215,2.047,1.868,3.663,3.934,3.811V13.474z"
                  fill="#ffffff"
                />
              </svg>
            </a>
          </div>
          <p>© 2026 Sans Croquettes Fixes — Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
