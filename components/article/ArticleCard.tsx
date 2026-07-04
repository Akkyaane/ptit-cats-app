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
    <article>
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
            className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
          >
            {title}
          </a>
        </h3>
        <p className="text-sm text-quaternary/70">{date}</p>
        <p className="font-sans text-sm leading-6 line-clamp-3">{description}</p>
        <a
          href={link || undefined}
          className="text-primary hover:underline font-bold"
          aria-hidden="true"
          tabIndex={-1}
        >
          Lire la suite →
        </a>
      </div>
    </article>
  );
}
