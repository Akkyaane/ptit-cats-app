"use client";

import { ICat } from "@/interfaces/ICat";
import { IAnimalRequirement } from "@/interfaces/IAnimalRequirement";

interface Props {
  value: Partial<ICat>;
  onChange: (data: Partial<ICat>) => void;
  onRemove: () => void;
  animalRequirements?: IAnimalRequirement[];
}

export default function APCatFormFields({
  value,
  onChange,
  onRemove,
  animalRequirements = [],
}: Props) {
  const update = (field: keyof ICat, val: unknown) =>
    onChange({ ...value, [field]: val });

  const fieldClass = "w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary";
  const labelClass = "text-sm font-medium text-quaternary";

  return (
    <fieldset className="border border-tertiary rounded p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-quaternary">Informations du chat</h2>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          Supprimer
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className={labelClass}>Nom</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={value.name ?? ""}
          onChange={(e) => update("name", e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="birthDate" className={labelClass}>Date de naissance</label>
        <input
          type="date"
          name="birthDate"
          id="birthDate"
          value={value.birthDate ?? ""}
          onChange={(e) => update("birthDate", e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sex" className={labelClass}>Sexe</label>
        <select
          name="sex"
          id="sex"
          required
          value={value.sex ?? "Male"}
          onChange={(e) => update("sex", e.target.value as ICat["sex"])}
          className={fieldClass}
        >
          <option value="Male">Mâle</option>
          <option value="Female">Femelle</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {([
          ["isDewormed", "Déparasité"],
          ["isVaccinated", "Vacciné"],
          ["isSterilizedOrCastrated", "Stérilisé / castré"],
          ["isIdentified", "Identifié"],
        ] as [keyof ICat, string][]).map(([field, label]) => (
          <div key={field} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={field}
              id={field}
              checked={(value[field] as boolean) ?? false}
              onChange={(e) => update(field, e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor={field} className={labelClass}>{label}</label>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {([
          ["dogAffinity", "Entente avec les chiens"],
          ["catAffinity", "Entente avec les chats"],
          ["childAffinity", "Entente avec les enfants"],
        ] as [keyof ICat, string][]).map(([field, label]) => (
          <div key={field} className="flex flex-col gap-1">
            <label htmlFor={field} className={labelClass}>{label}</label>
            <select
              name={field}
              id={field}
              required
              value={(value[field] as string) ?? "Unknown"}
              onChange={(e) => update(field, e.target.value)}
              className={fieldClass}
            >
              <option value="Yes">Oui</option>
              <option value="No">Non</option>
              <option value="Unknown">Inconnu</option>
            </select>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="livingEnvironmentType" className={labelClass}>Type de lieu de vie</label>
        <select
          name="livingEnvironmentType"
          id="livingEnvironmentType"
          required
          value={value.livingEnvironmentType ?? "Apartment"}
          onChange={(e) =>
            update("livingEnvironmentType", e.target.value as ICat["livingEnvironmentType"])
          }
          className={fieldClass}
        >
          <option value="Apartment">Appartement</option>
          <option value="House">Maison</option>
          <option value="Other">Autre</option>
        </select>
      </div>

      {animalRequirements.length > 0 && (
        <div className="flex flex-col gap-2">
          <em className={labelClass}>Points clés</em>
          <div className="grid grid-cols-2 gap-2">
            {animalRequirements.map((requirement) => (
              <div key={requirement.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="keyPoints"
                  id={`keyPoint-${requirement.id}`}
                  value={requirement.id}
                  checked={(value.animal_requirements ?? []).some((r) => r.id === requirement.id)}
                  onChange={(e) => {
                    const current = value.animal_requirements ?? [];
                    const updated = e.target.checked
                      ? [...current, requirement]
                      : current.filter((r) => r.id !== requirement.id);
                    update("animal_requirements", updated);
                  }}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor={`keyPoint-${requirement.id}`} className="text-sm text-gray-700">
                  {requirement.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </fieldset>
  );
}
