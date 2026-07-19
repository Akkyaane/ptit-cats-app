"use client";

import { useState } from "react";
import ALCard from "@/components/adoptionListing/ALCard";
import IAdoptionListing from "@/interfaces/IAdoptionListing";
import Pagination from "@/components/ui/Pagination";

const LISTINGS_PER_PAGE = 9;

type AgeFilter = "kitten" | "adult" | "senior";
type SexFilter = "male" | "female";

const AGE_LABELS: Record<AgeFilter, string> = {
  kitten: "Chaton",
  adult: "Adulte",
  senior: "Senior",
};

const SEX_LABELS: Record<SexFilter, string> = {
  male: "Mâle",
  female: "Femelle",
};

function getAgeCategory(birthDate: string): AgeFilter {
  const date = new Date(birthDate);
  const now = new Date();
  const months =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());
  if (months < 12) return "kitten";
  if (months < 120) return "adult";
  return "senior";
}

export default function ALFilteredList({
  listings,
}: {
  listings: IAdoptionListing[];
}) {
  const [ageFilters, setAgeFilters] = useState<AgeFilter[]>([]);
  const [sexFilters, setSexFilters] = useState<SexFilter[]>([]);
  const [duoFilter, setDuoFilter] = useState(false);
  const [atypicalFilter, setAtypicalFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleAge = (age: AgeFilter) => {
    setCurrentPage(1);
    setAgeFilters((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age],
    );
  };

  const toggleSex = (sex: SexFilter) => {
    setCurrentPage(1);
    setSexFilters((prev) =>
      prev.includes(sex) ? prev.filter((s) => s !== sex) : [...prev, sex],
    );
  };

  const filtered = listings.filter((listing) => {
    if (ageFilters.length > 0) {
      const hasMatchingAge = listing.animals.some(
        (animal) =>
          animal.birthDate && ageFilters.includes(getAgeCategory(animal.birthDate.toString())),
      );
      if (!hasMatchingAge) return false;
    }

    if (sexFilters.length > 0) {
      const hasMatchingSex = listing.animals.some((animal) =>
        sexFilters.includes(animal.sex),
      );
      if (!hasMatchingSex) return false;
    }

    if (duoFilter && !listing.isDuo) return false;

    if (atypicalFilter && !listing.animals.some((a) => a.isAtypical))
      return false;

    return true;
  });

  const hasActiveFilters =
    ageFilters.length > 0 || sexFilters.length > 0 || duoFilter || atypicalFilter;

  const toggleDuo = () => {
    setCurrentPage(1);
    setDuoFilter((v) => !v);
  };

  const toggleAtypical = () => {
    setCurrentPage(1);
    setAtypicalFilter((v) => !v);
  };

  const resetFilters = () => {
    setCurrentPage(1);
    setAgeFilters([]);
    setSexFilters([]);
    setDuoFilter(false);
    setAtypicalFilter(false);
  };

  const totalPages = Math.ceil(filtered.length / LISTINGS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * LISTINGS_PER_PAGE,
    currentPage * LISTINGS_PER_PAGE,
  );

  function ToggleBtn({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
          active
            ? "bg-primary text-secondary shadow-sm"
            : "bg-quaternary/10 text-quaternary/60 hover:bg-quaternary/20 hover:text-quaternary"
        }`}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Filter bar + bouton d'ajout (haut droite) */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap p-3">
          {/* Age */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-quaternary/40 font-medium shrink-0">Âge</span>
            <div className="flex gap-1">
              {(["kitten", "adult", "senior"] as AgeFilter[]).map((age) => (
                <ToggleBtn
                  key={age}
                  active={ageFilters.includes(age)}
                  onClick={() => toggleAge(age)}
                >
                  {AGE_LABELS[age]}
                </ToggleBtn>
              ))}
            </div>
          </div>

          <span className="hidden sm:block w-px h-4 bg-quaternary/20 mx-1" />

          {/* Sex */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-quaternary/40 font-medium shrink-0">Sexe</span>
            <div className="flex gap-1">
              {(["male", "female"] as SexFilter[]).map((sex) => (
                <ToggleBtn
                  key={sex}
                  active={sexFilters.includes(sex)}
                  onClick={() => toggleSex(sex)}
                >
                  {SEX_LABELS[sex]}
                </ToggleBtn>
              ))}
            </div>
          </div>

          <span className="hidden sm:block w-px h-4 bg-quaternary/20 mx-1" />

          {/* Special */}
          <div className="flex gap-1">
            <ToggleBtn active={duoFilter} onClick={toggleDuo}>
              Duo
            </ToggleBtn>
            <ToggleBtn active={atypicalFilter} onClick={toggleAtypical}>
              Atypique
            </ToggleBtn>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-quaternary/40 hover:text-primary transition-colors duration-200 cursor-pointer whitespace-nowrap self-center"
            >
              × Réinitialiser
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-lg text-quaternary/60 py-12">
          Aucune annonce ne correspond aux filtres sélectionnés.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((listing) => (
              <ALCard key={listing.documentId} {...listing} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filtered.length}
            itemLabel="annonce"
          />
        </>
      )}
    </div>
  );
}
