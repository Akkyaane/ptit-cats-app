import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "lg";
  href?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  size = "lg",
  href,
  onClick,
}: ButtonProps) {
  const baseStyle =
    "text-[var(--color-secondary)] font-bold rounded-xl border border-2 hover:bg-[var(--color-secondary)]/40 backdrop-blur-sm transition-colors duration-200 text-center";

  const variants = {
    primary: "bg-[var(--color-primary)] border-[var(--color-primary)] hover:text-[var(--color-primary)]",
    secondary: "bg-[var(--color-quaternary)] border-[var(--color-quaternary)] hover:text-[var(--color-quaternary)]",
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

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
