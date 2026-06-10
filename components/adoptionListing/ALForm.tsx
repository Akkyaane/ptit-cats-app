"use client";

import AnimalFormFields, {
  AnimalDraft,
} from "@/components/adoptionListing/AnimalFormFields";
import IAnimalPersonalityTrait from "@/interfaces/IAnimalPersonalityTrait";
import IAnimalRequirement from "@/interfaces/IAnimalRequirement";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

export type AnimalEntry = AnimalDraft & {
  _key: string;
  documentId?: string;
};

export type ListingDraft = {
  title: string;
  slogan: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  newMediaFiles: File[];
  existingMedia: { id: number; url: string }[];
};

type ALFormProps = {
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
  onListingChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveNewFile: (index: number) => void;
  onRemoveExistingMedia: (id: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving: boolean;
  error: string | null;
};

export default function ALForm({
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
  onRemoveNewFile,
  onRemoveExistingMedia,
  onSubmit,
  isSaving,
  error,
}: ALFormProps) {
  return (
    <div className="container flex flex-col gap-6">
      {error && (
        <div className="max-w-2xl mx-auto w-full px-4 py-3 rounded-xl bg-primary/10 border-2 border-primary text-primary font-bold text-sm">
          {error}
        </div>
      )}

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          <section className="flex flex-col gap-6">
            <div
              className={`flex flex-col gap-4 ${isDuo ? "w-fit" : "max-w-3xl mx-auto w-full"}`}
            >
              <Heading
                type="h3"
                headingVariant="quaternary"
                underlineVariant="tertiary"
              >
                {step} - {isDuo ? "Profil des animaux" : "Profil de l'animal"}
              </Heading>

              <div className="flex flex-col gap-2 border-2 border-tertiary rounded-xl p-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base font-bold">
                    Adoption en duo
                  </span>
                  <p className="text-sm text-quaternary/80">
                    Veuillez cocher la case si l'annonce concerne un duo
                    d'animaux.
                  </p>
                </div>
                <Input
                  type="checkbox"
                  name="isDuo"
                  checked={isDuo}
                  required={false}
                  labelName="Duo"
                  onChange={(e) => toggleDuo(e.target.checked)}
                />
              </div>
            </div>

            <div
              className={`grid gap-6 ${isDuo ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-3xl mx-auto w-full"}`}
            >
              {animals.map((animal, i) => (
                <AnimalFormFields
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

            <div
              className={`flex justify-end ${isDuo ? "" : "max-w-3xl mx-auto w-full"}`}
            >
              <Button type="submit" variant="primary" size="md">
                Suivant →
              </Button>
            </div>
          </section>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={onSubmit}>
          <section className="flex flex-col gap-6">
            <div
              className={`flex flex-col gap-4 ${isDuo ? "w-fit" : "max-w-3xl mx-auto w-full"}`}
            >
              <Heading
                type="h3"
                headingVariant="quaternary"
                underlineVariant="tertiary"
              >
                {step} - Détails de l'annonce
              </Heading>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
              <Input
                type="text"
                name="title"
                value={listing.title}
                required={true}
                labelName="Titre"
                onChange={onListingChange}
              />
              <Input
                type="text"
                name="slogan"
                value={listing.slogan}
                required={false}
                labelName="Slogan"
                onChange={onListingChange}
              />
              <div className="flex flex-col gap-1">
                <Textarea
                  name="shortDescription"
                  rows={4}
                  value={listing.shortDescription}
                  required={true}
                  labelName="Description courte"
                  onChange={onListingChange}
                />
                <p className="text-sm text-quaternary/80">
                  Cette description sera affichée sur la carte de l'annonce.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Textarea
                  name="longDescription"
                  rows={12}
                  value={listing.longDescription}
                  required={true}
                  labelName="Description longue"
                  onChange={onListingChange}
                />
                <p className="text-sm text-quaternary/80">
                  Cette description sera affichée sur la page de l'annonce.
                </p>
              </div>

              {listing.existingMedia.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-sm md:text-base">
                    Médias actuels ({listing.existingMedia.length})
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {listing.existingMedia.map((m) => (
                      <div
                        key={m.id}
                        className="relative aspect-square rounded-xl overflow-hidden group"
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${m.url}`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveExistingMedia(m.id)}
                          className="absolute top-1 right-1 bg-white/80 hover:bg-white text-primary font-bold text-xs rounded-lg px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Input
                  type="file"
                  name="media"
                  accept=".jpg,.jpeg,.png,.webp,.mp4"
                  multiple={true}
                  onChange={onFilesChange}
                  required={false}
                  labelName="Ajouter des médias"
                />
                <p className="text-sm text-quaternary/80">
                  Formats acceptés : JPG, JPEG, PNG, WEBP, MP4
                </p>
                {listing.newMediaFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {listing.newMediaFiles.map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary text-secondary text-sm font-bold"
                      >
                        {f.name}
                        <button
                          type="button"
                          onClick={() => onRemoveNewFile(i)}
                          className="text-secondary font-bold leading-none"
                          aria-label={`Supprimer ${f.name}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Input
                type="number"
                name="price"
                value={listing.price}
                min={0}
                onChange={onListingChange}
                required={true}
                labelName="Prix (€)"
              />

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => setStep(1)}
                >
                  ← Retour
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSaving}
                >
                  {" "}
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </div>
          </section>
        </form>
      )}
    </div>
  );
}
