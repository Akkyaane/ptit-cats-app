type CardProps = {
    imageUrl?: string,
    title?: string,
    description?: string
};

export default function Card({
  imageUrl,
  title,
  description
}: CardProps) {
  return (
    <div className="rounded-xl border-2 border-[var(--color-secondary)] bg-[var(--color-quaternary)] flex flex-col items-center p-4 gap-2">
      <img
        src={imageUrl}
        alt=""
        className="w-10 h-10"
      />
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
