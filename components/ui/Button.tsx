import Link from "next/link";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

type ButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "lg";
  href?: string;
  up?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  size = "lg",
  href,
  up,
  onClick,
}: ButtonProps) {
  const baseStyle =
    "text-[var(--color-secondary)] font-bold rounded-xl border border-2 hover:bg-[var(--color-secondary)]/40 backdrop-blur-sm transition-colors duration-200 text-center";

  const variants = {
    primary:
      "bg-[var(--color-primary)] border-[var(--color-primary)] hover:text-[var(--color-primary)]",
    secondary:
      "bg-[var(--color-quaternary)] border-[var(--color-quaternary)] hover:text-[var(--color-quaternary)]",
    danger: "",
  };

  const sizes = {
    sm: "px-3 py-2",
    lg: "px-6 py-4",
  };

  const className = `${baseStyle} ${variants[variant]} ${sizes[size]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  if (up) {
    return (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-49 size-12 rounded-xl cursor-pointer bg-[var(--color-primary)] fill-[var(--color-secondary)] border border-2 border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:fill-[var(--color-primary)] transition-colors duration-200 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-[25px] h-[25px]"
        >
          <path d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z" />
        </svg>
      </button>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
