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
  entityStatus
}: IAdoptionListing) {
  const attributes: Record<string, string> = buildAttributes(animals);
  const tags: string[] = buildTags(animals, attributes, isDuo);
  const followUp: string[] = buildFollowUp(animals, isDuo);

  return (
    <div className="group flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-quaternary/10 h-full">
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + media[0].url}
          alt={title ? `Photo de ${title}` : ""}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap justify-start max-w-[50%]">
          {Object.entries(attributes).map(([key, value], index) =>
            value ? (
              <span
                key={`${index}-${key}`}
                className="bg-quaternary/90 backdrop-blur-sm text-secondary px-2.5 py-0.5 rounded-xl text-xs font-semibold shadow-sm"
              >
                {value}
              </span>
            ) : null,
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5 flex-wrap justify-end max-w-[50%]">
          {tags.map((tag, index) =>
            tag ? (
              <span
                key={`${index}-${tag}`}
                className="bg-primary/90 backdrop-blur-sm text-secondary px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm"
              >
                {tag}
              </span>
            ) : null,
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 md:p-5 gap-3">
        <div className="flex flex-col gap-1.5 flex-grow">
          <h3 className="text-lg md:text-xl font-bold text-quaternary leading-snug">{title}</h3>
          <p className="text-sm md:text-base text-quaternary/70 line-clamp-3 leading-relaxed">{shortDescription}</p>
          {followUp.length > 0 && (
            <ul className="flex flex-row gap-x-3 gap-y-0.5 flex-wrap mt-1">
              {followUp.map((item, index) => (
                <li key={`${index}-${item}`} className="flex items-center gap-1 text-xs md:text-sm text-primary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-quaternary/10 mt-auto">
          <p className="text-xl font-extrabold text-primary">{price} €</p>
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
