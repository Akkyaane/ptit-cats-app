"use client";

import IAnimalRequirement from "@/interfaces/IAnimalRequirement";
import IAnimalPersonalityTrait from "@/interfaces/IAnimalPersonalityTrait";
import IAnimal from "@/interfaces/IAnimal";
import Input from "../ui/Input";
import Select from "../ui/Select";

export type AnimalDraft = Omit<IAnimal, "documentId" | "adoption_listing">;

export function defaultAnimalDraft(): AnimalDraft {
  return {
    name: "",
    sex: "male",
    birthDate: "",
    isDewormed: false,
    isVaccinated: false,
    isSterilizedOrCastrated: false,
    isIdentified: false,
    dogAffinity: "unknown",
    catAffinity: "unknown",
    childAffinity: "unknown",
    livingEnvironmentType: "apartment",
    isAtypical: false,
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
  const update = <K extends keyof AnimalDraft>(
    field: K,
    val: AnimalDraft[K],
  ) => {
    onChange({ [field]: val } as Partial<AnimalDraft>);
  };

  const fieldClass =
    "w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-colors duration-200 bg-white";
  const labelClass = "text-sm font-bold";

  const requirements = animalRequirements.filter(
    (r) =>
      !value.animal_requirements.some((s) => s.documentId === r.documentId),
  );

  const personalityTraits = animalPersonalityTraits.filter(
    (t) =>
      !value.animal_personality_traits.some(
        (s) => s.documentId === t.documentId,
      ),
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
      value.animal_personality_traits.filter(
        (t) => t.documentId !== documentId,
      ),
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

      <Input
        type="text"
        name="name"
        value={value.name}
        required={true}
        labelName="Nom"
        onChange={(e) => update("name", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          name="sex"
          value={value.sex}
          options={[
            { key: "male", value: "male" },
            { key: "female", value: "female" },
          ]}
          translatedOptions={{
            male: "Mâle",
            female: "Femelle",
          }}
          required={true}
          labelName="Sexe"
          onChange={(e) => update("sex", e.target.value as AnimalDraft["sex"])}
        />

        <Input
          type="date"
          name="birthDate"
          value={value.birthDate}
          required={true}
          labelName="Date de naissance"
          onChange={(e) => update("birthDate", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className={labelClass}>Soins</span>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ["isDewormed", "Déparasité"],
              ["isVaccinated", "Vacciné"],
              ["isSterilizedOrCastrated", "Stérilisé / Castré"],
              ["isIdentified", "Identifié"],
            ] as [keyof AnimalDraft, string][]
          ).map(([field, label]) => (
            <Input
              key={field}
              type="checkbox"
              name={field}
              checked={value[field] as boolean}
              required={false}
              labelName={label}
              onChange={(e) => update(field, e.target.checked)}
            />
          ))}
        </div>
      </div>

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
            <Select
              key={field}
              name={field}
              value={value[field] as string}
              options={[
                { key: "yes", value: "yes" },
                { key: "no", value: "no" },
                { key: "unknown", value: "unknown" },
              ]}
              translatedOptions={{
                yes: "Oui",
                no: "Non",
                unknown: "Inconnu",
              }}
              required={true}
              labelName={label}
              onChange={(e) =>
                update(field, e.target.value as AnimalDraft[typeof field])
              }
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Select
          name="livingEnvironmentType"
          value={value.livingEnvironmentType}
          options={[
            { key: "apartment", value: "apartment" },
            { key: "house", value: "house" },
            { key: "other", value: "other" },
          ]}
          translatedOptions={{
            apartment: "Appartement",
            house: "Maison",
            other: "Autre",
          }}
          required={true}
          labelName="Environnement de vie"
          onChange={(e) =>
            update(
              "livingEnvironmentType",
              e.target.value as AnimalDraft["livingEnvironmentType"],
            )
          }
        />
      </div>

      <Input
        type="checkbox"
        name="isAtypical"
        checked={value.isAtypical}
        required={false}
        labelName="Atypique (handicap, soins particuliers, etc.)"
        onChange={(e) => update("isAtypical", e.target.checked)}
      />

      <div className="flex flex-col gap-1">
        <Select
          name="entityStatus"
          value={value.entityStatus}
          options={[
            { key: "in shelter", value: "in shelter" },
            { key: "in foster care", value: "in foster care" },
            { key: "under medical care", value: "under medical care" },
            { key: "adopted", value: "adopted" },
          ]}
          translatedOptions={{
            "in shelter": "En refuge",
            "in foster care": "En famille d'accueil",
            "under medical care": "En soins médicaux",
            adopted: "Adopté",
          }}
          required={true}
          labelName="Statut"
          onChange={(e) =>
            update(
              "entityStatus",
              e.target.value as AnimalDraft["entityStatus"],
            )
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        {requirements.length > 0 && (
          <Select
            name="requirements"
            value=""
            options={requirements.map((r) => ({
              key: r.documentId,
              value: r.documentId,
            }))}
            translatedOptions={requirements.reduce((acc, r) => {
              acc[r.documentId] = r.label;
              return acc;
            }, {} as Record<string, string>)}
            required={false}
            labelName="Conditions d'adoption"
            onChange={(e) => {
              addRequirement(e.target.value);
              e.currentTarget.value = "";
            }}
          />
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
            La liste des conditions d'adoption est vide.
          </p>
        )}
      </div>

      {/* Personality traits multi-select */}
      <div className="flex flex-col gap-2">
        {personalityTraits.length > 0 && (
          <Select 
            name="personalityTraits"
            value=""
            options={personalityTraits.map((t) => ({
              key: t.documentId,
              value: t.documentId,
            }))}
            translatedOptions={personalityTraits.reduce((acc, t) => {
              acc[t.documentId] = t.label;
              return acc;
            }, {} as Record<string, string>)}
            required={false}
            labelName="Traits de caractère"
            onChange={(e) => {
              addTrait(e.target.value);
              e.currentTarget.value = "";
            }}
          />
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
            La liste des traits de caractère est vide.
          </p>
        )}
      </div>
    </fieldset>
  );
}
