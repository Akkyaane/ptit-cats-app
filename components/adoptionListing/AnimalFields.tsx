"use client";

import IAnimalRequirement from "@/interfaces/IAnimalRequirement";
import IAnimalPersonalityTrait from "@/interfaces/IAnimalPersonalityTrait";

export type AnimalDraft = {
  name: string;
  sex: "male" | "female";
  birthDate: string;
  isDewormed: boolean;
  isVaccinated: boolean;
  isSterilizedOrCastrated: boolean;
  isIdentified: boolean;
  isAtypical: boolean;
  dogAffinity: "yes" | "no" | "unknown";
  catAffinity: "yes" | "no" | "unknown";
  childAffinity: "yes" | "no" | "unknown";
  livingEnvironmentType: "apartment" | "house" | "other";
  animal_requirements: IAnimalRequirement[];
  animal_personality_traits: IAnimalPersonalityTrait[];
  entityStatus: "in shelter" | "in foster care" | "under medical care" | "adopted";
};

export function defaultAnimalDraft(): AnimalDraft {
  return {
    name: "",
    sex: "male",
    birthDate: "",
    isDewormed: false,
    isVaccinated: false,
    isSterilizedOrCastrated: false,
    isIdentified: false,
    isAtypical: false,
    dogAffinity: "unknown",
    catAffinity: "unknown",
    childAffinity: "unknown",
    livingEnvironmentType: "apartment",
    animal_requirements: [],
    animal_personality_traits: [],
    entityStatus: "in shelter",
  };
}

interface Props {
  index: number;
  value: AnimalDraft;
  onChange: (data: Partial<AnimalDraft>) => void;
  onRemove?: () => void;
  animalRequirements?: IAnimalRequirement[];
  animalPersonalityTraits?: IAnimalPersonalityTrait[];
  canRemove?: boolean;
}

export default function AnimalFields({
  index,
  value,
  onChange,
  onRemove,
  animalRequirements = [],
  animalPersonalityTraits = [],
  canRemove = true,
}: Props) {
  const update = (field: keyof AnimalDraft, val: unknown) =>
    onChange({ [field]: val } as Partial<AnimalDraft>);

  const fieldClass =
    "w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-colors duration-200 bg-white";
  const labelClass = "text-sm font-bold";

  const availableRequirements = animalRequirements.filter(
    (r) => !value.animal_requirements.some((s) => s.documentId === r.documentId),
  );

  const availableTraits = animalPersonalityTraits.filter(
    (t) =>
      !value.animal_personality_traits.some((s) => s.documentId === t.documentId),
  );

  const addRequirement = (documentId: string) => {
    const req = animalRequirements.find((r) => r.documentId === documentId);
    if (!req) return;
    update("animal_requirements", [...value.animal_requirements, req]);
  };

  const removeRequirement = (documentId: string) => {
    update(
      "animal_requirements",
      value.animal_requirements.filter((r) => r.documentId !== documentId),
    );
  };

  const addTrait = (documentId: string) => {
    const trait = animalPersonalityTraits.find(
      (t) => t.documentId === documentId,
    );
    if (!trait) return;
    update("animal_personality_traits", [
      ...value.animal_personality_traits,
      trait,
    ]);
  };

  const removeTrait = (documentId: string) => {
    update(
      "animal_personality_traits",
      value.animal_personality_traits.filter((t) => t.documentId !== documentId),
    );
  };

  return (
    <fieldset className="border-2 border-tertiary rounded-2xl p-6 flex flex-col gap-5 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <legend className="text-base font-bold flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold">
            {index}
          </span>
          Animal {index}
        </legend>
        {canRemove && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm font-bold text-primary hover:text-quaternary transition-colors duration-200"
          >
            Supprimer
          </button>
        )}
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>
          Nom <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          required
          value={value.name}
          onChange={(e) => update("name", e.target.value)}
          className={fieldClass}
          placeholder="Ex : Milo"
        />
      </div>

      {/* Sex + BirthDate */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Sexe</label>
          <select
            value={value.sex}
            onChange={(e) =>
              update("sex", e.target.value as AnimalDraft["sex"])
            }
            className={fieldClass}
          >
            <option value="male">Mâle</option>
            <option value="female">Femelle</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Date de naissance</label>
          <input
            type="date"
            value={value.birthDate}
            onChange={(e) => update("birthDate", e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {/* Health checkboxes */}
      <div className="flex flex-col gap-2">
        <span className={labelClass}>Santé</span>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ["isDewormed", "Déparasité(e)"],
              ["isVaccinated", "Vacciné(e)"],
              ["isSterilizedOrCastrated", "Stérilisé(e) / castré(e)"],
              ["isIdentified", "Identifié(e)"],
            ] as [keyof AnimalDraft, string][]
          ).map(([field, label]) => (
            <label
              key={field}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={value[field] as boolean}
                onChange={(e) => update(field, e.target.checked)}
                className="w-4 h-4 accent-primary shrink-0"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Affinities */}
      <div className="flex flex-col gap-2">
        <span className={labelClass}>Affinités</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              ["dogAffinity", "Avec les chiens"],
              ["catAffinity", "Avec les chats"],
              ["childAffinity", "Avec les enfants"],
            ] as [keyof AnimalDraft, string][]
          ).map(([field, label]) => (
            <div key={field} className="flex flex-col gap-1">
              <label className="text-xs font-bold text-quaternary/70">
                {label}
              </label>
              <select
                value={value[field] as string}
                onChange={(e) => update(field, e.target.value)}
                className={fieldClass}
              >
                <option value="yes">Oui</option>
                <option value="no">Non</option>
                <option value="unknown">Inconnu</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Living environment */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Environnement de vie</label>
        <select
          value={value.livingEnvironmentType}
          onChange={(e) =>
            update(
              "livingEnvironmentType",
              e.target.value as AnimalDraft["livingEnvironmentType"],
            )
          }
          className={fieldClass}
        >
          <option value="apartment">Appartement</option>
          <option value="house">Maison</option>
          <option value="other">Autre</option>
        </select>
      </div>

      {/* isAtypical */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={value.isAtypical}
          onChange={(e) => update("isAtypical", e.target.checked)}
          className="w-4 h-4 accent-primary shrink-0"
        />
        <span className="text-sm font-bold">Animal atypique</span>
      </label>

      {/* Entity status */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Statut</label>
        <select
          value={value.entityStatus}
          onChange={(e) =>
            update(
              "entityStatus",
              e.target.value as AnimalDraft["entityStatus"],
            )
          }
          className={fieldClass}
        >
          <option value="in shelter">En refuge</option>
          <option value="in foster care">En famille d&apos;accueil</option>
          <option value="under medical care">Soins médicaux</option>
          <option value="adopted">Adopté(e)</option>
        </select>
      </div>

      {/* Requirements multi-select */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>Exigences particulières</label>
        {availableRequirements.length > 0 && (
          <select
            value=""
            onChange={(e) => {
              addRequirement(e.target.value);
              e.currentTarget.value = "";
            }}
            className={fieldClass}
          >
            <option value="">Ajouter une exigence…</option>
            {availableRequirements.map((r) => (
              <option key={r.documentId} value={r.documentId}>
                {r.label}
              </option>
            ))}
          </select>
        )}
        {value.animal_requirements.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.animal_requirements.map((r) => (
              <span
                key={r.documentId}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary/30 text-quaternary text-sm font-bold border border-tertiary"
              >
                {r.label}
                <button
                  type="button"
                  onClick={() => removeRequirement(r.documentId)}
                  className="text-primary hover:text-quaternary font-bold leading-none"
                  aria-label={`Retirer ${r.label}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {animalRequirements.length === 0 && (
          <p className="text-sm text-quaternary/60 italic">
            Aucune exigence disponible.
          </p>
        )}
      </div>

      {/* Personality traits multi-select */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>Traits de personnalité</label>
        {availableTraits.length > 0 && (
          <select
            value=""
            onChange={(e) => {
              addTrait(e.target.value);
              e.currentTarget.value = "";
            }}
            className={fieldClass}
          >
            <option value="">Ajouter un trait…</option>
            {availableTraits.map((t) => (
              <option key={t.documentId} value={t.documentId}>
                {t.label}
              </option>
            ))}
          </select>
        )}
        {value.animal_personality_traits.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.animal_personality_traits.map((t) => (
              <span
                key={t.documentId}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/30"
              >
                {t.label}
                <button
                  type="button"
                  onClick={() => removeTrait(t.documentId)}
                  className="text-primary hover:text-quaternary font-bold leading-none"
                  aria-label={`Retirer ${t.label}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {animalPersonalityTraits.length === 0 && (
          <p className="text-sm text-quaternary/60 italic">
            Aucun trait disponible.
          </p>
        )}
      </div>
    </fieldset>
  );
}
