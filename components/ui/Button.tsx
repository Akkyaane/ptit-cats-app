"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

type ButtonProps = {
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
  up?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function Button({
  type = "button",
  variant = "primary",
  size = "lg",
  href,
  up,
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    if (!up) return;
    const onScroll = () => setIsScrolledDown(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [up]);

  const baseStyle =
    "text-secondary font-bold rounded-xl border-2 hover:bg-secondary/40 backdrop-blur-sm transition-colors duration-200 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary w-full md:w-fit";

  const variants = {
    primary: "bg-primary border-primary hover:text-primary",
    secondary: "bg-quaternary border-quaternary hover:text-quaternary",
  };

  const sizes = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  const className = `${baseStyle} ${variants[variant]} ${sizes[size]}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("//");
    return (
      <Link
        href={href}
        onClick={onClick}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        className={className}
      >
        {children}
        {isExternal && (
          <span className="sr-only"> (nouvelle fenêtre)</span>
        )}
      </Link>
    );
  }

  if (up) {
    if (!isScrolledDown) return null;
    return (
      <button
        onClick={scrollToTop}
        aria-label="Retour en haut de page"
        className="fixed bottom-6 right-6 z-50 size-12 rounded-xl cursor-pointer bg-primary fill-secondary border-2 border-primary hover:bg-secondary hover:fill-primary transition-colors duration-200 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-6"
        >
          <path d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z" />
        </svg>
      </button>
    );
  }

  if (type === "submit") {
    return (
      <button type="submit" className={className}>
        {children}
      </button>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
