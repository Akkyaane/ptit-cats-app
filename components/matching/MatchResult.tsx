"use client";

import ALCard from "@/components/adoptionListing/ALCard";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { ScoredMatch } from "./scoring";

const RANK_LABELS = ["Votre meilleur match", "2ᵉ choix", "3ᵉ choix"];

function CompatibilityBadge({ percentage }: { percentage: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border-2 border-primary px-3 py-1 text-sm font-bold text-primary">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21s-6.716-4.35-9.238-8.5C1.1 9.5 2.2 6 5.5 6c1.9 0 3.2 1.1 3.9 2.2C10.1 7.1 11.4 6 13.3 6c3.3 0 4.4 3.5 2.74 6.5C18.716 16.65 12 21 12 21z" />
      </svg>
      {percentage}% de compatibilité
    </span>
  );
}

export default function MatchResult({
  matches,
  onRestart,
}: {
  matches: ScoredMatch[];
  onRestart: () => void;
}) {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 text-center py-8">
        <p className="text-5xl">😿</p>
        <Heading
          type="h3"
          headingVariant="quaternary"
          underlineVariant="tertiary"
        >
          Aucun chat ne correspond pour le moment
        </Heading>
        <p className="text-quaternary/70 max-w-lg">
          Aucune de nos annonces d&apos;adoption ne correspond à vos critères
          actuels. N&apos;hésitez pas à revoir vos préférences ou à recommencer
          le test plus tard : de nouveaux compagnons arrivent régulièrement.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="primary" size="md" onClick={onRestart}>
            Recommencer
          </Button>
          <Button href="/adoption-listings" variant="secondary" size="md">
            Voir toutes les annonces
          </Button>
        </div>
      </div>
    );
  }

  const [winner, ...others] = matches;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <Heading
          type="h3"
          headingVariant="quaternary"
          underlineVariant="tertiary"
        >
          Voici votre compagnon idéal !
        </Heading>
        <p className="text-quaternary/70 max-w-lg">
          D&apos;après vos réponses, voici nos compagnons qui vous correspondent
          le mieux.
        </p>
      </div>

      {/* Gagnant, mis en avant */}
      <div className="mx-auto w-full max-w-md">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-lg font-bold text-quaternary">
            {RANK_LABELS[0]}
          </span>
          <CompatibilityBadge percentage={winner.percentage} />
        </div>
        <ALCard {...winner.listing} />
      </div>

      {/* 2ᵉ et 3ᵉ choix */}
      {others.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
          {others.map((match, index) => (
            <div key={match.listing.documentId} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-quaternary">
                  {RANK_LABELS[index + 1]}
                </span>
                <CompatibilityBadge percentage={match.percentage} />
              </div>
              <ALCard {...match.listing} />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Button variant="secondary" size="md" onClick={onRestart}>
          ↺ Recommencer le test
        </Button>
      </div>
    </div>
  );
}
