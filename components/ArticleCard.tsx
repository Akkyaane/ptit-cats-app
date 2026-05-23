"use client";
import Image from "next/image";

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
      {imageUrl && (
        <div className="relative w-full aspect-[3/2]">
          <Image
            src={imageUrl}
            alt={title ?? ""}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg md:text-xl font-bold leading-tight">
          <a
            href={link || undefined}
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            {title}
          </a>
        </h3>
        <p className="text-sm text-[var(--color-quaternary)]/70">
          {date}
        </p>
        <p className="font-sans text-sm leading-6">{description}</p>
        <a
          href={link || undefined}
          className="text-[var(--color-primary)] hover:underline font-bold"
          aria-hidden="true"
          tabIndex={-1}
        >
          Lire la suite →
        </a>
      </div>
    </article>
  );
}
