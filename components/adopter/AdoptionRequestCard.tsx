import IAdoptionRequest from "@/interfaces/IAdoptionRequest";
import Image from "next/image";

const statusConfig: Record<string, { label: string; className: string }> = {
  "on hold": {
    label: "En attente",
    className: "bg-yellow-100 text-yellow-800",
  },
  accepted: {
    label: "Acceptée",
    className: "bg-green-100 text-green-800",
  },
  refused: {
    label: "Refusée",
    className: "bg-red-100 text-red-800",
  },
};

export default function AdoptionRequestCard({
  request,
}: {
  request: IAdoptionRequest;
}) {
  const listing = request.adoption_listing;
  const firstMedia = listing?.media?.[0];
  const imageUrl = firstMedia
    ? firstMedia.url.startsWith("http")
      ? firstMedia.url
      : `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${firstMedia.url}`
    : null;

  const status = statusConfig[request.entityStatus] ?? {
    label: request.entityStatus,
    className: "bg-gray-100 text-gray-600",
  };

  const catNames = listing?.animals?.map((a) => a.name).join(" & ") ?? listing?.title ?? "Chat";



  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sm:flex-row gap-0">

      <div className="sm:w-40 h-40 sm:h-auto flex-shrink-0 bg-tertiary/20 relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={catNames}
            fill
            className="object-cover"
            sizes="160px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🐱
          </div>
        )}
      </div>


      <div className="flex flex-col justify-between gap-3 px-5 py-4 flex-1">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="font-bold text-lg leading-tight">{catNames}</p>
            <p className="text-sm text-quaternary/60 mt-0.5">{listing?.title}</p>
          </div>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${status.className}`}
          >
            {status.label}
          </span>
        </div>

      </div>
    </div>
  );
}
