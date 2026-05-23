type HeadingPrimaryProps = {
  children: React.ReactNode;
};

export default function HeadingPrimary({ children }: HeadingPrimaryProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1
        className={"text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"}
      >
        {children}
      </h1>
    </div>
  );
}