"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import Select from "@/components/ui/Select";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import IAdoptionListing from "@/interfaces/IAdoptionListing";
import {
  MatchFormValues,
  HouseholdValues,
  matchDefaultValues,
  yesNoOptions,
  housingTypeOptions,
  ageGroupOptions,
  sexOptions,
  calmOrPlayfulOptions,
  householdSummary,
  MAX_IDEAL_TRAITS,
} from "./matchmakerConfig";
import { scoreListings, ScoredMatch } from "./scoring";
import MatchResult from "./MatchResult";

type Trait = { documentId: string; label: string };

type MatchmakerWizardProps = {
  isAuthenticated: boolean;
  prefill?: HouseholdValues | null;
  listings: IAdoptionListing[];
  traits: Trait[];
};

type Option = { value: string; label: string };

const stepTitles = [
  "Votre foyer",
  "Vos critères",
  "Votre chat idéal",
];

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
}) {
  return (
    <Select
      name={id}
      labelName={label}
      value={value}
      required={required}
      onChange={(event) => onChange(event.target.value)}
      options={options.map((option) => ({ key: option.value, value: option.value }))}
      translatedOptions={Object.fromEntries(
        options.map((option) => [option.value, option.label]),
      )}
    />
  );
}

function StepCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <Heading type="h4" headingVariant="quaternary" underlineVariant="tertiary">
        {title}
      </Heading>
      {children}
    </div>
  );
}

export default function MatchmakerWizard({
  isAuthenticated,
  prefill,
  listings,
  traits,
}: MatchmakerWizardProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [step, setStep] = useState(0);
  const [matches, setMatches] = useState<ScoredMatch[] | null>(null);

  const [values, setValues] = useState<MatchFormValues>(() => ({
    ...matchDefaultValues,
    ...(prefill ?? {}),
  }));

  const totalSteps = stepTitles.length;
  const progress = useMemo(
    () => Math.round(((step + 1) / totalSteps) * 100),
    [step, totalSteps],
  );

  function setField<K extends keyof MatchFormValues>(
    field: K,
    value: MatchFormValues[K],
  ) {
    setValues((previous) => ({ ...previous, [field]: value }));
  }

  function toggleTrait(label: string) {
    setValues((previous) => {
      const selected = previous.idealTraits.includes(label);
      if (selected) {
        return {
          ...previous,
          idealTraits: previous.idealTraits.filter((l) => l !== label),
        };
      }
      if (previous.idealTraits.length >= MAX_IDEAL_TRAITS) return previous;
      return { ...previous, idealTraits: [...previous.idealTraits, label] };
    });
  }

  function goToNextStep() {
    const form = formRef.current;
    if (form && !form.reportValidity()) return;
    setStep((previous) => Math.min(previous + 1, totalSteps - 1));
  }

  function goToPreviousStep() {
    setStep((previous) => Math.max(previous - 1, 0));
  }

  function handleFinish() {
    const form = formRef.current;
    if (form && !form.reportValidity()) return;
    setMatches(scoreListings(values, listings));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRestart() {
    setMatches(null);
    setStep(0);
    setValues({ ...matchDefaultValues, ...(prefill ?? {}) });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  if (matches) {
    return <MatchResult matches={matches} onRestart={handleRestart} />;
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-bold text-quaternary/70">
            Étape {step + 1} / {totalSteps}
          </span>
          <span className="font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-tertiary/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <StepCard title={stepTitles[step]}>
        {step === 0 &&
          (isAuthenticated ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-quaternary/70">
                Ces informations sont issues de votre profil. Elles nous aident à
                écarter les compagnons dont les besoins ne correspondraient pas à
                votre foyer.
              </p>
              <dl className="grid gap-3 sm:grid-cols-2">
                {householdSummary(values).map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-0.5 rounded-xl border-2 border-tertiary/40 bg-tertiary/5 px-4 py-3"
                  >
                    <dt className="text-xs font-bold uppercase tracking-wide text-quaternary/60">
                      {item.label}
                    </dt>
                    <dd className="font-semibold text-quaternary">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="grid gap-4 md:grid-cols-2">
                <SelectField
                  id="housingType"
                  label="Type de logement"
                  value={values.housingType}
                  onChange={(v) => setField("housingType", v as MatchFormValues["housingType"])}
                  options={housingTypeOptions}
                  required
                />
                <SelectField
                  id="hasYoungChildren"
                  label="Avez-vous des enfants en bas âge au foyer ?"
                  value={values.hasYoungChildren}
                  onChange={(v) => setField("hasYoungChildren", v as MatchFormValues["hasYoungChildren"])}
                  options={yesNoOptions}
                  required
                />
                <SelectField
                  id="hasOtherAnimals"
                  label="Avez-vous déjà un ou plusieurs animaux ?"
                  value={values.hasOtherAnimals}
                  onChange={(v) => setField("hasOtherAnimals", v as MatchFormValues["hasOtherAnimals"])}
                  options={yesNoOptions}
                  required
                />
                <SelectField
                  id="securedExterior"
                  label="Disposez-vous d'un extérieur sécurisé (fenêtres, balcon, jardin) ?"
                  value={values.securedExterior}
                  onChange={(v) => setField("securedExterior", v as MatchFormValues["securedExterior"])}
                  options={yesNoOptions}
                  required
                />
              </div>
            </div>
          ))}

        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              id="agePreference"
              label="Avez-vous une préférence pour l'âge ?"
              value={values.agePreference}
              onChange={(v) => setField("agePreference", v as MatchFormValues["agePreference"])}
              options={yesNoOptions}
              required
            />
            {values.agePreference === "true" && (
              <SelectField
                id="ageGroup"
                label="Quelle tranche d'âge recherchez-vous ?"
                value={values.ageGroup}
                onChange={(v) => setField("ageGroup", v as MatchFormValues["ageGroup"])}
                options={ageGroupOptions}
                required
              />
            )}
            <SelectField
              id="sexPreference"
              label="Avez-vous une préférence pour le sexe ?"
              value={values.sexPreference}
              onChange={(v) => setField("sexPreference", v as MatchFormValues["sexPreference"])}
              options={yesNoOptions}
              required
            />
            {values.sexPreference === "true" && (
              <SelectField
                id="sex"
                label="Quel sexe recherchez-vous ?"
                value={values.sex}
                onChange={(v) => setField("sex", v as MatchFormValues["sex"])}
                options={sexOptions}
                required
              />
            )}
            <SelectField
              id="openToSpecificNeeds"
              label="Êtes-vous ouvert(e) à adopter un chat avec des besoins spécifiques ?"
              value={values.openToSpecificNeeds}
              onChange={(v) => setField("openToSpecificNeeds", v as MatchFormValues["openToSpecificNeeds"])}
              options={yesNoOptions}
              required
            />
            <SelectField
              id="mustGetAlongCats"
              label="Votre chat idéal doit-il absolument s'entendre avec d'autres chats ?"
              value={values.mustGetAlongCats}
              onChange={(v) => setField("mustGetAlongCats", v as MatchFormValues["mustGetAlongCats"])}
              options={yesNoOptions}
              required
            />
            <SelectField
              id="mustGetAlongDogs"
              label="Votre chat idéal doit-il absolument s'entendre avec des chiens ?"
              value={values.mustGetAlongDogs}
              onChange={(v) => setField("mustGetAlongDogs", v as MatchFormValues["mustGetAlongDogs"])}
              options={yesNoOptions}
              required
            />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                id="wantsHumanContact"
                label="Souhaitez-vous un chat qui recherche beaucoup le contact humain ?"
                value={values.wantsHumanContact}
                onChange={(v) => setField("wantsHumanContact", v as MatchFormValues["wantsHumanContact"])}
                options={yesNoOptions}
                required
              />
              <SelectField
                id="okWithAttentionNeeds"
                label="Êtes-vous à l'aise avec un chat qui a besoin de beaucoup d'attention ?"
                value={values.okWithAttentionNeeds}
                onChange={(v) => setField("okWithAttentionNeeds", v as MatchFormValues["okWithAttentionNeeds"])}
                options={yesNoOptions}
                required
              />
              <SelectField
                id="prefersIndependent"
                label="Préférez-vous un chat indépendant ?"
                value={values.prefersIndependent}
                onChange={(v) => setField("prefersIndependent", v as MatchFormValues["prefersIndependent"])}
                options={yesNoOptions}
                required
              />
              <SelectField
                id="wantsToHold"
                label="Souhaitez-vous pouvoir prendre votre chat dans les bras ?"
                value={values.wantsToHold}
                onChange={(v) => setField("wantsToHold", v as MatchFormValues["wantsToHold"])}
                options={yesNoOptions}
                required
              />
              <SelectField
                id="calmOrPlayful"
                label="Préférez-vous un chat calme ou très joueur ?"
                value={values.calmOrPlayful}
                onChange={(v) => setField("calmOrPlayful", v as MatchFormValues["calmOrPlayful"])}
                options={calmOrPlayfulOptions}
                required
              />
              <SelectField
                id="okWithVeryActive"
                label="Êtes-vous à l'aise avec un chat très actif ?"
                value={values.okWithVeryActive}
                onChange={(v) => setField("okWithVeryActive", v as MatchFormValues["okWithVeryActive"])}
                options={yesNoOptions}
                required
              />
              <SelectField
                id="acceptsShy"
                label="Acceptez-vous un chat timide ou réservé ?"
                value={values.acceptsShy}
                onChange={(v) => setField("acceptsShy", v as MatchFormValues["acceptsShy"])}
                options={yesNoOptions}
                required
              />
              <SelectField
                id="okWithMeowing"
                label="Êtes-vous à l'aise avec un chat qui miaule beaucoup ?"
                value={values.okWithMeowing}
                onChange={(v) => setField("okWithMeowing", v as MatchFormValues["okWithMeowing"])}
                options={yesNoOptions}
                required
              />
              <SelectField
                id="okWithClimbing"
                label="Êtes-vous à l'aise avec un chat qui grimpe partout ?"
                value={values.okWithClimbing}
                onChange={(v) => setField("okWithClimbing", v as MatchFormValues["okWithClimbing"])}
                options={yesNoOptions}
                required
              />
              <SelectField
                id="okWithMischief"
                label="Êtes-vous à l'aise avec un chat qui peut faire quelques bêtises ?"
                value={values.okWithMischief}
                onChange={(v) => setField("okWithMischief", v as MatchFormValues["okWithMischief"])}
                options={yesNoOptions}
                required
              />
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm md:text-base font-bold">
                Comment décririez-vous le caractère idéal de votre futur chat ?{" "}
                <span className="font-normal text-quaternary/60">
                  ({values.idealTraits.length}/{MAX_IDEAL_TRAITS})
                </span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {traits.map((trait) => {
                  const selected = values.idealTraits.includes(trait.label);
                  const disabled =
                    !selected && values.idealTraits.length >= MAX_IDEAL_TRAITS;
                  return (
                    <label
                      key={trait.documentId}
                      className={`cursor-pointer select-none rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition-colors ${
                        selected
                          ? "border-primary bg-primary text-secondary"
                          : disabled
                            ? "border-tertiary/30 text-quaternary/30 cursor-not-allowed"
                            : "border-tertiary text-quaternary hover:border-primary"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selected}
                        disabled={disabled}
                        onChange={() => toggleTrait(trait.label)}
                      />
                      {trait.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>
        )}
      </StepCard>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={goToPreviousStep}
          disabled={step === 0}
        >
          ← Précédent
        </Button>

        {step < totalSteps - 1 ? (
          <Button type="button" variant="primary" size="md" onClick={goToNextStep}>
            Suivant →
          </Button>
        ) : (
          <Button type="button" variant="primary" size="md" onClick={handleFinish}>
            Trouver mon compagnon
          </Button>
        )}
      </div>
    </form>
  );
}
