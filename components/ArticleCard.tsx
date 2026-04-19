"use client";

type ArticleCardProps = {
  imageUrl?: string;
  title?: string;
  date?: string;
  description?: string;
  link?: string;
};

export default function ArticleCard({
  imageUrl,
  title,
  date,
  description,
  link,
}: ArticleCardProps) {
  return (
    <article className="text-[var(--color-quaternary)] ">
      <img
        src={imageUrl}
        alt=""
        className="w-full aspect-3/2 object-cover rounded-xl"
      />
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg md:text-xl font-bold leading-tight">
          <a
            href={link}
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            {title}
          </a>
        </h3>
        <p className="text-sm text-[var(--color-quaternary)]/50">
          {date}
        </p>
        <p className="font-sans text-sm leading-6">{description}</p>
        <a
          href={link}
          className="text-[var(--color-primary)] hover:underline font-bold"
        >
          Lire la suite →
        </a>
      </div>
    </article>
  );
}
