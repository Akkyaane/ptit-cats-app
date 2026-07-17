"use client";

import IAnimal from "@/interfaces/IAnimal";
import IAnimalRequirement from "@/interfaces/IAnimalRequirement";
import IAnimalPersonalityTrait from "@/interfaces/IAnimalPersonalityTrait";
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
    housingType: "apartment",
    isAtypical: false,
    animal_requirements: [],
    animal_personality_traits: [],
    entityStatus: "in shelter",
  };
}

interface AnimalFormFieldsProps {
  index: number;
  value: AnimalDraft;
  onChange: (data: Partial<AnimalDraft>) => void;
  onRemove?: () => void;
  animalRequirements?: IAnimalRequirement[];
  animalPersonalityTraits?: IAnimalPersonalityTrait[];
  canRemove?: boolean;
}

export default function AnimalFormFields({
  index,
  value,
  onChange,
  onRemove,
  animalRequirements = [],
  animalPersonalityTraits = [],
  canRemove = true,
}: AnimalFormFieldsProps) {
  const update = <K extends keyof AnimalDraft>(
    field: K,
    val: AnimalDraft[K],
  ) => {
    onChange({ [field]: val } as Partial<AnimalDraft>);
  };

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
    const requirement = animalRequirements.find(
      (r) => r.documentId === documentId,
    );
    if (!requirement) return;
    update("animal_requirements", [...value.animal_requirements, requirement]);
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
    <fieldset className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <legend className="font-bold flex items-center gap-2">
          Animal n°{index}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          required={false}
          labelName="Date de naissance"
          onChange={(e) => update("birthDate", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm md:text-base font-bold">Soins</span>
          <p className="text-sm text-quaternary/80">
            Veuillez cocher les cases correspondantes aux soins reçus par
            l'animal.
          </p>
        </div>
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
        <div className="flex flex-col gap-1">
          <span className="text-sm md:text-base font-bold">Particularités</span>
          <p className="text-sm text-quaternary/80">
            Veuillez cocher la case si l'animal présente des particularités
            (handicap, soins particuliers, etc.).
          </p>
        </div>
        <Input
          type="checkbox"
          name="isAtypical"
          checked={value.isAtypical}
          required={false}
          labelName="Atypique"
          onChange={(e) => update("isAtypical", e.target.checked)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm md:text-base font-bold">Affinités</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <Select
        name="housingType"
        value={value.housingType}
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
        labelName="Type de logement"
        onChange={(e) =>
          update(
            "housingType",
            e.target.value as AnimalDraft["housingType"],
          )
        }
      />

      <div className="flex flex-col gap-2">
        {requirements.length > 0 && (
          <Select
            name="requirements"
            value=""
            options={requirements.map((r) => ({
              key: r.documentId,
              value: r.documentId,
            }))}
            translatedOptions={requirements.reduce(
              (acc, r) => {
                acc[r.documentId] = r.label;
                return acc;
              },
              {} as Record<string, string>,
            )}
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary text-secondary text-sm font-bold"
              >
                {r.label}
                <button
                  type="button"
                  onClick={() => removeRequirement(r.documentId)}
                  className="text-secondary font-bold leading-none"
                  aria-label={`Retirer ${r.label}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {animalRequirements.length == 0 && (
          <p className="text-sm text-quaternary/80">
            Aucune condition d'adoption disponible. Veuillez alimenter la liste
            à partir du dashboard.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {personalityTraits.length > 0 && (
          <Select
            name="personalityTraits"
            value=""
            options={personalityTraits.map((t) => ({
              key: t.documentId,
              value: t.documentId,
            }))}
            translatedOptions={personalityTraits.reduce(
              (acc, t) => {
                acc[t.documentId] = t.label;
                return acc;
              },
              {} as Record<string, string>,
            )}
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary text-secondary text-sm font-bold"
              >
                {t.label}
                <button
                  type="button"
                  onClick={() => removeTrait(t.documentId)}
                  className="text-secondary font-bold leading-none"
                  aria-label={`Retirer ${t.label}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {animalPersonalityTraits.length === 0 && (
          <p className="text-sm text-quaternary/80">
            Aucun trait de caractère disponible. Veuillez alimenter la liste à
            partir du dashboard.
          </p>
        )}
      </div>

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
          update("entityStatus", e.target.value as AnimalDraft["entityStatus"])
        }
      />
    </fieldset>
  );
}
