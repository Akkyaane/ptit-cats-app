import IAdoptionListing from "@/interfaces/IAdoptionListing";
import buildAttributes from "@/utils/attributeHelper";
import buildTags from "@/utils/tagHelper";
import buildFollowUp from "@/utils/followUpHelper";
import Button from "../ui/Button";
import Image from "next/image";

export default function ALCard({
  documentId,
  title,
  shortDescription,
  media,
  isDuo,
  price,
  animals,
}: IAdoptionListing) {
  const attributes: Record<string, string> = buildAttributes(animals);
  const tags: string[] = buildTags(animals, attributes);
  const followUp: string[] = buildFollowUp(animals, isDuo);

  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 h-fit">
      <div className="relative">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + media[0].url}
            alt={title ? `Photo de ${title}` : ""}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap justify-start max-w-[50%] text-secondary">
          {Object.entries(attributes).map(([key, value], index) =>
            value ? (
              <p
                key={`${index}-${key}`}
                className="bg-quaternary px-3 py-1 rounded-xl text-xs font-bold shadow-sm"
              >
                {value}
              </p>
            ) : null,
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
          <p className="text-sm md:text-base flex-grow">{shortDescription}</p>
          <ul className="flex flex-row gap-2 text-xs md:text-sm text-primary opacity-70">
            {followUp.map((item, index) => (
              <li key={`${index}-${item}`}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-quaternary/15">
          <p className="text-lg md:text-xl font-bold text-primary">{price} €</p>
          <Button
            href={`/adoption-listings/view/${documentId}`}
            variant="secondary"
            size="sm"
          >
            Voir plus
          </Button>
        </div>
      </div>
    </div>
  );
}
