type HeadingProps = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headingVariant?: "primary" | "secondary" | "tertiary" | "quaternary";
  underlineVariant?: "primary" | "secondary" | "tertiary" | "quaternary" | null;
  children: React.ReactNode;
};

const baseHeading = "font-bold leading-tight";

const baseHeadingPrimary = "text-3xl md:text-4xl lg:text-5xl";

const baseHeadingSecondary = "text-2xl md:text-3xl lg:text-4xl mb-4";

const baseHeadingTertiary = "text-lg md:text-xl lg:text-2xl mb-4";

const baseOtherHeading = "text-md md:text-lg lg:text-xl";

const baseUnderline = "w-16 h-1 rounded-full mx-auto";

const headingVariants = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  quaternary: "text-quaternary",
};

const underlineVariants = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  quaternary: "bg-quaternary",
};

export default function Heading({
  type = "h1",
  headingVariant = "primary",
  underlineVariant = null,
  children,
}: HeadingProps) {
  const HeadingTag = type;
  if (type === "h1") {
    return (
      <h1
        className={`${baseHeading} ${baseHeadingPrimary} ${headingVariants[headingVariant]}`}
      >
        {children}
      </h1>
    );
  } else if (type === "h2") {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <h2
          className={`${baseHeading} ${baseHeadingSecondary} ${headingVariants[headingVariant]}`}
        >
          {children}
        </h2>
        {underlineVariant && (
          <div
            className={`${baseUnderline} ${underlineVariants[underlineVariant]}`}
          />
        )}
      </div>
    );
  } else if (type === "h3") {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <h3
          className={`${baseHeading} ${baseHeadingTertiary} ${headingVariants[headingVariant]}`}
        >
          {children}
        </h3>
        {underlineVariant && (
          <div
            className={`${baseUnderline} ${underlineVariants[underlineVariant]}`}
          />
        )}
      </div>
    );
  } else {
    return (
      <HeadingTag
        className={`${baseHeading} ${baseOtherHeading} ${headingVariants[headingVariant]}`}
      >
        {children}
      </HeadingTag>
    );
  }
}
