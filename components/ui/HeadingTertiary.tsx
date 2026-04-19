type HeadingTertiaryProps = {
  headingVariant?: "primary" | "secondary";
  underlineVariant?: "primary" | "secondary";
  children: string;
};

export default function HeadingTertiary({
  headingVariant = "primary",
  underlineVariant = "primary",
  children,
}: HeadingTertiaryProps) {
  const baseHeading =
    "text-2xl md:text-3xl lg:text-4xl font-bold mb-4";

  const baseUnderline =
    "w-16 h-1 rounded-full mx-auto";

  const headingVariants = {
    primary: "text-[var(--color-quaternary)]",
    secondary: "text-[var(--color-secondary)]",
  };

  const underlineVariants = {
    primary: "bg-[var(--color-tertiary)]",
    secondary: "bg-[var(--color-primary)]",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className={`${baseHeading} ${headingVariants[headingVariant]}`}>
        {children}
      </h3>
      <div className={`${baseUnderline} ${underlineVariants[underlineVariant]}`} />
    </div>
  );
}