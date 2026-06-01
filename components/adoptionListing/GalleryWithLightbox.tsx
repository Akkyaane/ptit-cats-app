"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Media = { url: string };

type Props = {
  media: Media[];
  title: string;
};

export default function GalleryWithLightbox({ media, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i + 1) % media.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i - 1 + media.length) % media.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, media.length]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div
          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md cursor-zoom-in group"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${media[activeIndex].url}`}
            alt={`Photo principale de ${title}`}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
            <span className="text-white text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-xl select-none">
              ⊕
            </span>
          </div>
        </div>

        {media.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {media.map((m, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${
                  i === activeIndex
                    ? "ring-2 ring-primary ring-offset-1"
                    : "opacity-55 hover:opacity-100"
                }`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${m.url}`}
                  alt={`Miniature ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="15vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            aria-label="Fermer"
            className="absolute top-5 right-5 text-white/70 hover:text-white text-4xl leading-none transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>

          <div
            className="relative w-full max-w-5xl max-h-[85vh] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${media[activeIndex].url}`}
              alt={`Photo ${activeIndex + 1} de ${title}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {media.length > 1 && (
            <>
              <button
                aria-label="Photo précédente"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none transition-colors select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i - 1 + media.length) % media.length);
                }}
              >
                ‹
              </button>
              <button
                aria-label="Photo suivante"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none transition-colors select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i + 1) % media.length);
                }}
              >
                ›
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
                {activeIndex + 1} / {media.length}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
