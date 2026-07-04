"use client";
import { useEffect, useState } from "react";
import EmblaCarousel from "embla-carousel-react";
import IAdoptionListing from "../../interfaces/IAdoptionListing";
import AdoptionListingCard from "./ALCard";

interface ALCarouselProps {
  items: IAdoptionListing[];
}

export default function ALCarousel({ items }: ALCarouselProps) {
  const [emblaRef, emblaApi] = EmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const onSelect = () => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="w-full">
      <div className="overflow-hidden select-none" ref={emblaRef}>
        <div className="flex gap-2">
          {items.map((adoptionListing: IAdoptionListing) => (
            <div
              key={adoptionListing.documentId}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 box-border p-4"
            >
              <AdoptionListingCard
                key={adoptionListing.documentId}
                documentId={adoptionListing.documentId}
                title={adoptionListing.title}
                slogan={adoptionListing.slogan}
                shortDescription={adoptionListing.shortDescription}
                longDescription={adoptionListing.longDescription}
                media={adoptionListing.media}
                isDuo={adoptionListing.isDuo}
                price={adoptionListing.price}
                animals={adoptionListing.animals}
                entityStatus={adoptionListing.entityStatus}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="text-primary text-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
          aria-label="Diapositive précédente"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                if (emblaApi) emblaApi.scrollTo(index);
              }}
              className="group p-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`Aller à la diapositive ${index + 1}`}
            >
              <span
                className={`block h-3 w-3 rounded-full transition-all ${
                  index === selectedIndex
                    ? "bg-primary"
                    : "bg-primary/40 group-hover:bg-primary/60"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="text-primary text-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
          aria-label="Diapositive suivante"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="text-center text-sm text-primary/70 mt-4">
        {selectedIndex + 1} / {items.length}
      </p>
    </div>
  );
}
