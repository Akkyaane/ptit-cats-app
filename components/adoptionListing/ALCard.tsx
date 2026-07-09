import IAdoptionListing from "@/interfaces/IAdoptionListing";
import buildAttributes from "@/helpers/attributeHelper";
import buildTags from "@/helpers/tagHelper";
import buildFollowUp from "@/helpers/followUpHelper";
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

  const safeAnimals = animals ?? [];
  const attributes: Record<string, string> = buildAttributes(safeAnimals);
  const tags: string[] = buildTags(safeAnimals, attributes, isDuo);
  const followUp: string[] = buildFollowUp(safeAnimals, isDuo);

  if (!media?.[0]) {
    return (
      <div className="flex flex-col rounded-xl overflow-hidden shadow-sm border border-gray-100 h-fit">
        <div className="w-full aspect-[4/3] bg-tertiary/20 flex items-center justify-center text-5xl">
          🐱
        </div>
        <div className="flex flex-col gap-2 p-4 md:p-5">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          <p className="text-sm md:text-base">{shortDescription}</p>
          <div className="flex items-center justify-between pt-3 border-t border-quaternary/15">
            <p className="text-lg font-bold text-primary">{price} €</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-quaternary/10 h-full">
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + media[0].url}
          alt={title ? `Photo de ${title}` : ""}
          fill
          className="object-cover object-top"
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
            <div className="flex flex-row gap-1 flex-wrap mt-1">
              {followUp.map((item, index) => (
                <span
                  key={`${index}-${item}`}
                  className="inline-flex items-center gap-0.5 text-[10px] bg-primary/10 text-primary font-semibold px-1.5 py-0.5 rounded-full border border-primary/20"
                >
                  <svg
                    className="w-2.5 h-2.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
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
