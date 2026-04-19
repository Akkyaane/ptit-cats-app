"use client";

import Button from "../ui/Button";

type AdoptionPostCardProps = {
  imageUrl?: string;
  title?: string;
  description?: string;
  attributes: { [key: string]: string }[];
  tags: string[];
  followUp: string[];
  price?: string;
  link?: string;
};

export default function AdoptionPostCard({
  imageUrl,
  title,
  description,
  attributes,
  tags,
  followUp,
  price,
  link
}: AdoptionPostCardProps) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <div className="relative">
        <img src={imageUrl} alt="" className="w-full" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap justify-start max-w-[50%]">
          {attributes.map((attribute, index) =>
            Object.entries(attribute).map(([key, value]) =>
              value ? (
                <p
                  key={`${index}-${key}`}
                  className="bg-[var(--color-quaternary)] px-3 py-1 rounded-xl text-xs font-bold shadow-sm"
                >
                  {value}
                </p>
              ) : null,
            ),
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-2 flex-wrap justify-end max-w-[50%]">
          {tags.map((tag, index) =>
            tag ? (
              <p
                key={`${index}-${tag}`}
                className="bg-[var(--color-primary)] px-3 py-1 rounded-xl text-xs font-bold"
              >
                {tag}
              </p>
            ) : null,
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 md:p-5 flex-grow text-[var(--color-quaternary)]">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          <p className="text-sm md:text-base flex-grow">{description}</p>
          <ul className="flex flex-row gap-2 text-xs md:text-sm text-[var(--color-primary)] opacity-70">
            {followUp.map((item, index) => (
              <li key={`${index}-${item}`}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-quaternary)]/15">
          <p className="text-lg md:text-xl font-bold text-[var(--color-primary)]">
            {price}
          </p>
          <Button href={link} variant="secondary" size="sm">
            Voir plus
          </Button>
        </div>
      </div>
    </div>
  );
}
