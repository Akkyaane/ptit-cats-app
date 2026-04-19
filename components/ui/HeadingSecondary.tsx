type HeadingSecondaryProps = {
  children: React.ReactNode;
};

export default function HeadingSecondary({
  children,
}: HeadingSecondaryProps) {

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className={"text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"}>
        {children}
      </h3>
    </div>
  );
}