import Image from "next/image";
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
  fixedSize?: boolean;
};

export default function AdoptionPostCard({
  imageUrl,
  title,
  description,
  attributes,
  tags,
  followUp,
  price,
  link,
  fixedSize = false,
}: AdoptionPostCardProps) {
  const cardClassName = fixedSize
    ? "flex flex-col h-[560px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 h-fit"
    : "flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 h-fit";

  return (
    <div className={cardClassName}>
      <div className="relative">
        {imageUrl && (
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={title ? `Photo de ${title}` : ""}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap justify-start max-w-[50%] text-secondary">
          {attributes.map((attribute, index) =>
            Object.entries(attribute).map(([key, value]) =>
              value ? (
                <p
                  key={`${index}-${key}`}
                  className="bg-quaternary px-3 py-1 rounded-xl text-xs font-bold shadow-sm"
                >
                  {value}
                </p>
              ) : null,
            ),
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-2 flex-wrap justify-end max-w-[50%] text-secondary">
          {tags.map((tag, index) =>
            tag ? (
              <p
                key={`${index}-${tag}`}
                className="bg-primary px-3 py-1 rounded-xl text-xs font-bold"
              >
                {tag}
              </p>
            ) : null,
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 md:p-5 flex-grow ">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          <p className="text-sm md:text-base flex-grow">{description}</p>
          <ul className="flex flex-row gap-2 text-xs md:text-sm text-primary opacity-70">
            {followUp.map((item, index) => (
              <li key={`${index}-${item}`}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-quaternary/15">
          <p className="text-lg md:text-xl font-bold text-primary">{price}</p>
          <Button href={link} variant="secondary" size="sm">
            Voir plus
          </Button>
        </div>
      </div>
    </div>
  );
}
