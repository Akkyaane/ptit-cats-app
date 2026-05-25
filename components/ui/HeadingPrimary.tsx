type HeadingPrimaryProps = {
  children: React.ReactNode;
};

export default function HeadingPrimary({ children }: HeadingPrimaryProps) {
  return (
    <h1 className={"text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-secondary"}>
      {children}
    </h1>
  );
}
