type HeadingPrimaryProps = {
  id?: string;
  headingVariant?: "primary" | "secondary";
  children: React.ReactNode;
};

const baseHeading = "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight";

const headingVariants = {
  primary: "text-secondary",
  secondary: "text-quaternary",
};

export default function HeadingPrimary({
  id,
  headingVariant = "primary",
  children,
}: HeadingPrimaryProps) {
  return (
    <h1 id={id} className={`${baseHeading} ${headingVariants[headingVariant]}`}>
      {children}
    </h1>
  );
}
