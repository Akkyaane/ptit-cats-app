"use client";

import AnimalFields, { AnimalDraft } from "@/components/adoptionListing/AnimalFields";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import IAnimalPersonalityTrait from "@/interfaces/IAnimalPersonalityTrait";
import IAnimalRequirement from "@/interfaces/IAnimalRequirement";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AnimalEntry = AnimalDraft & {
  _key: string;
  /** undefined = animal à créer ; string = documentId existant */
  documentId?: string;
};

export type ListingDraft = {
  title: string;
  slogan: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  newMediaFiles: File[];
  existingMediaIds: number[];
};

// ─── UI constants ─────────────────────────────────────────────────────────────

export const inputClass =
  "w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-colors duration-200 bg-white";
export const labelClass = "text-sm font-bold";
export const req = (
  <span aria-hidden="true" className="text-primary font-bold">
    {" "}*
  </span>
);

// ─── StepIndicator ────────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: 1 | 2 }) {
  const steps = [
    { num: 1, label: "L'animal" },
    { num: 2, label: "L'annonce" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {steps.map(({ num, label }, i) => (
        <div key={num} className="flex items-center gap-2">
          {i > 0 && (
            <div
              className={`w-12 h-0.5 rounded-full transition-colors duration-300 ${step >= num ? "bg-primary" : "bg-tertiary/50"}`}
            />
          )}
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                step === num
                  ? "bg-primary text-white border-primary shadow-md"
                  : step > num
                    ? "bg-tertiary text-quaternary border-tertiary"
                    : "bg-white text-quaternary/40 border-tertiary/40"
              }`}
            >
              {step > num ? "✓" : num}
            </div>
            <span
              className={`text-xs font-bold transition-colors duration-300 ${step >= num ? "text-quaternary" : "text-quaternary/40"}`}
            >
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  mode: "create" | "update";
  step: 1 | 2;
  setStep: (step: 1 | 2) => void;
  isDuo: boolean;
  toggleDuo: (checked: boolean) => void;
  animals: AnimalEntry[];
  updateAnimal: (key: string, data: Partial<AnimalDraft>) => void;
  requirements: IAnimalRequirement[];
  traits: IAnimalPersonalityTrait[];
  listing: ListingDraft;
  onListingChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving: boolean;
  error: string | null;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdoptionListingForm({
  mode,
  step,
  setStep,
  isDuo,
  toggleDuo,
  animals,
  updateAnimal,
  requirements,
  traits,
  listing,
  onListingChange,
  onFilesChange,
  onSubmit,
  isSaving,
  error,
}: Props) {
  return (
    <div className="container flex flex-col gap-4">
      <StepIndicator step={step} />

      {error && (
        <div className="max-w-2xl mx-auto w-full px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-bold text-sm">
          {error}
        </div>
      )}

      {/* ── Step 1 : Animals ── */}
      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
          className="flex flex-col gap-8 pb-12"
        >
          <section className="flex flex-col gap-8">
            <HeadingSecondary headingVariant="primary" underlineVariant="primary">
              Qui est l&apos;animal concerné ?
            </HeadingSecondary>

            {/* Duo toggle */}
            <div className="flex justify-center">
              <label className="flex items-center gap-3 px-6 py-4 rounded-2xl border-2 border-tertiary bg-white cursor-pointer select-none hover:border-primary transition-colors duration-200 shadow-sm">
                <input
                  type="checkbox"
                  checked={isDuo}
                  onChange={(e) => toggleDuo(e.target.checked)}
                  className="w-5 h-5 accent-primary"
                />
                <span className="font-bold">Adoption en duo</span>
                <span className="text-sm text-quaternary/60">
                  (deux animaux pour la même annonce)
                </span>
              </label>
            </div>

            {/* Animal cards */}
            <div
              className={`grid gap-8 ${isDuo ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-2xl mx-auto w-full"}`}
            >
              {animals.map((animal, i) => (
                <AnimalFields
                  key={animal._key}
                  index={i + 1}
                  value={animal}
                  onChange={(data) => updateAnimal(animal._key, data)}
                  animalRequirements={requirements}
                  animalPersonalityTraits={traits}
                  canRemove={false}
                />
              ))}
            </div>

            <div className={`flex justify-end ${isDuo ? "" : "max-w-2xl mx-auto w-full"}`}>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-quaternary transition-colors duration-200"
              >
                Suivant →
              </button>
            </div>
          </section>
        </form>
      )}

      {/* ── Step 2 : Listing ── */}
      {step === 2 && (
        <form onSubmit={onSubmit} className="flex flex-col gap-8 pb-12">
          <section className="flex flex-col gap-8">
            <HeadingSecondary headingVariant="primary" underlineVariant="primary">
              L&apos;annonce d&apos;adoption
            </HeadingSecondary>

            <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
              {isDuo && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-tertiary/20 border border-tertiary text-sm font-bold text-quaternary">
                  <span>🐱</span>
                  <span>Adoption en duo — 2 animaux associés</span>
                </div>
              )}

              {/* Title */}
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className={labelClass}>
                  Titre{req}
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={listing.title}
                  onChange={onListingChange}
                  required
                  className={inputClass}
                  placeholder="Ex : Milo cherche une famille aimante"
                />
              </div>

              {/* Slogan */}
              <div className="flex flex-col gap-1">
                <label htmlFor="slogan" className={labelClass}>
                  Slogan
                </label>
                <input
                  id="slogan"
                  name="slogan"
                  type="text"
                  value={listing.slogan}
                  onChange={onListingChange}
                  className={inputClass}
                  placeholder="Ex : Un petit bout de tendresse à adopter"
                />
              </div>

              {/* Short description */}
              <div className="flex flex-col gap-1">
                <label htmlFor="shortDescription" className={labelClass}>
                  Description courte{req}
                </label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={listing.shortDescription}
                  onChange={onListingChange}
                  required
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Quelques mots pour présenter l'annonce…"
                />
              </div>

              {/* Long description */}
              <div className="flex flex-col gap-1">
                <label htmlFor="longDescription" className={labelClass}>
                  Description longue{req}
                </label>
                <textarea
                  id="longDescription"
                  name="longDescription"
                  value={listing.longDescription}
                  onChange={onListingChange}
                  required
                  rows={7}
                  className={`${inputClass} resize-none`}
                  placeholder="Décrivez l'animal en détail, son caractère, son histoire…"
                />
              </div>

              {/* Existing media (update only) */}
              {mode === "update" && listing.existingMediaIds.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className={labelClass}>
                    Photos actuelles ({listing.existingMediaIds.length})
                  </span>
                  <p className="text-xs text-quaternary/60">
                    Les photos existantes sont conservées. Ajoutez de nouvelles photos ci-dessous pour les compléter.
                  </p>
                </div>
              )}

              {/* New media */}
              <div className="flex flex-col gap-2">
                <label htmlFor="media" className={labelClass}>
                  {mode === "update" ? "Ajouter des photos" : "Photos"}
                </label>
                <input
                  id="media"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple
                  onChange={onFilesChange}
                  className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-tertiary file:bg-white file:text-sm file:font-bold file:text-quaternary hover:file:bg-tertiary/20 transition-colors duration-200"
                />
                <p className="text-xs text-quaternary/60">
                  Formats acceptés : JPG, JPEG, PNG, WEBP
                </p>
                {listing.newMediaFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {listing.newMediaFiles.map((f, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-lg bg-tertiary/20 border border-tertiary font-bold text-quaternary"
                      >
                        {f.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1">
                <label htmlFor="price" className={labelClass}>
                  Prix (€){req}
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={listing.price}
                  onChange={onListingChange}
                  required
                  min={0}
                  className={inputClass}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-8 py-3 rounded-xl border-2 border-quaternary text-quaternary font-bold hover:bg-quaternary hover:text-white transition-colors duration-200"
                >
                  ← Retour
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-quaternary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving
                    ? mode === "create"
                      ? "Création en cours…"
                      : "Enregistrement…"
                    : mode === "create"
                      ? "Créer l'annonce"
                      : "Enregistrer les modifications"}
                </button>
              </div>
            </div>
          </section>
        </form>
      )}
    </div>
  );
}
