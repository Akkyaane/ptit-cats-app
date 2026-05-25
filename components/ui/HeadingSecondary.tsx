type HeadingSecondaryProps = {
  id?: string;
  headingVariant?: "primary" | "secondary";
  underlineVariant?: "primary" | "secondary";
  children: React.ReactNode;
};

export default function HeadingSecondary({
  id,
  headingVariant = "primary",
  underlineVariant = "primary",
  children,
}: HeadingSecondaryProps) {
  const baseHeading = "text-2xl md:text-3xl lg:text-4xl font-bold mb-4";

  const baseUnderline = "w-16 h-1 rounded-full mx-auto";

  const headingVariants = {
    primary: "",
    secondary: "text-secondary",
  };

  const underlineVariants = {
    primary: "bg-tertiary",
    secondary: "bg-primary",
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 id={id} className={`${baseHeading} ${headingVariants[headingVariant]}`}>
        {children}
      </h2>
      <div
        className={`${baseUnderline} ${underlineVariants[underlineVariant]}`}
      />
    </div>
  );
}
