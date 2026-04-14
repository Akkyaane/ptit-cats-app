"use client";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <footer className="bg-[var(--color-quaternary)] py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col justify-content items-center gap-8">
          <ul className="flex gap-6">
            <li className={pathname === "/" ? "hidden" : "block"}>
              <a
                href="/"
                className="hover:text-[var(--color-tertiary)] transition-colors"
              >
                Accueil
              </a>
            </li>
            <li className={pathname === "/adoption-posts" ? "hidden" : "block"}>
              <a
                href="/adoption-posts"
                className="hover:text-[var(--color-tertiary)] transition-colors"
              >
                À l'adoption
              </a>
            </li>
            <li className={pathname === "/kibble-distribution" ? "hidden" : "block"}>
              <a
                href="/kibble-distribution"
                className="hover:text-[var(--color-tertiary)] transition-colors"
              >
                Distribution de croquettes
              </a>
            </li>
            <li className={pathname === "/about" ? "hidden" : "block"}>
              <a
                href="/about"
                className="hover:text-[var(--color-tertiary)] transition-colors"
              >
                À propos
              </a>
            </li>
            <li className={pathname === "/blog" ? "hidden" : "block"}>
              <a
                href="/blog"
                className="hover:text-[var(--color-tertiary)] transition-colors"
              >
                Blog
              </a>
            </li>
            <li className={pathname === "/contact" ? "hidden" : "block"}>
              <a
                href="/contact"
                className="hover:text-[var(--color-tertiary)] transition-colors"
              >
                Contact
              </a>
            </li>
            <li className={pathname === "/legal" ? "hidden" : "block"}>
              <a
                href="/legal"
                className="hover:text-[var(--color-tertiary)] transition-colors"
              >
                Mentions légales
              </a>
            </li>
            <li className={pathname === "/donation" ? "hidden" : "block"}>
              <a
                href="/donation"
                className="hover:text-[var(--color-tertiary)] transition-colors"
              >
                Faire un don
              </a>
            </li>
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
            {/* <a
                    href="https://x.com/CroquettesFixes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="assets/img/facebook-logo.svg"
                      alt="Logo"
                      className="hover:fill-[var(--color-tertiary)] transition-colors"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/sanscroquettesfixes/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="assets/img/facebook-logo.svg"
                      alt="Logo"
                      className="hover:fill-[var(--color-tertiary)] transition-colors"
                    />
                  </a> */}
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
