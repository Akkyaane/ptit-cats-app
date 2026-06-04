"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/ui/FormInput";
import { createAdoptant } from "@/app/adoptant/register/action";
import { updateAdoptant } from "@/app/adoptant/update/action";
import {
  AdoptantFormValues,
  buildAdoptantFormData,
  adoptantDefaultValues,
} from "@/utils/adoptantForm";

type StepDefinition = {
  title: string;
  description: string;
};

type AdoptantFormWizardProps = {
  mode: "create" | "edit";
  documentId?: string;
  initialValues?: Partial<AdoptantFormValues>;
};

const stepDefinitions: StepDefinition[] = [
  {
    title: "Compte",
    description: "Les informations de base pour créer votre espace adoptant.",
  },
  {
    title: "Coordonnées",
    description: "Les informations pour vous contacter et vérifier votre dossier.",
  },
  {
    title: "Composition du foyer",
    description: "Le contexte familial et l'organisation du quotidien.",
  },
  {
    title: "Travail et rythme de vie",
    description: "Les habitudes qui influencent l'accueil du chat.",
  },
  {
    title: "Logement",
    description: "Le cadre de vie et les sécurisations prévues.",
  },
  {
    title: "Autres animaux et engagement",
    description: "Les infos complémentaires et l'accord final.",
  },
];

const selectClass = "w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200 bg-white";

const yesNoOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
];

const yesNoOtherOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
  { value: "autre", label: "Autre" },
];

const householdOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "seul", label: "Seul(e)" },
  { value: "couple", label: "En couple" },
  { value: "colocation", label: "Colocation" },
  { value: "autre", label: "Autre" },
];

const workOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "temps-plein", label: "Temps plein" },
  { value: "temps-partiel", label: "Temps partiel" },
  { value: "teletravail", label: "Télétravail" },
  { value: "recherche", label: "En recherche d'emploi" },
  { value: "autre", label: "Autre" },
];

const environmentOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "ville", label: "Ville" },
  { value: "campagne", label: "Campagne" },
  { value: "lotissement", label: "Lotissement" },
  { value: "autre", label: "Autre" },
];

function ChoiceSelectField({
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
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className={selectClass}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function StepCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <p className="text-sm text-quaternary/70 leading-relaxed">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

export default function AdoptantFormWizard({
  mode,
  documentId,
  initialValues,
}: AdoptantFormWizardProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState<AdoptantFormValues>(() =>
    ({ ...adoptantDefaultValues, ...initialValues }),
  );

  const isCreateMode = mode === "create";
  const totalSteps = stepDefinitions.length;
  const currentStep = stepDefinitions[step];
  const progress = useMemo(
    () => Math.round(((step + 1) / totalSteps) * 100),
    [step, totalSteps],
  );

  function setField<K extends keyof AdoptantFormValues>(
    field: K,
    value: AdoptantFormValues[K],
  ) {
    setValues((previous) => ({ ...previous, [field]: value }));
  }

  function goToNextStep() {
    const form = formRef.current;

    if (form && !form.reportValidity()) {
      return;
    }

    setStep((previous) => Math.min(previous + 1, totalSteps - 1));
  }

  function goToPreviousStep() {
    setError(null);
    setSuccess(null);
    setStep((previous) => Math.max(previous - 1, 0));
  }

  async function submitCreateQuick() {
    const form = formRef.current;

    if (form && !form.reportValidity()) {
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const formData = buildAdoptantFormData(values);
      const result = await createAdoptant(formData);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/adoptant/profile?created=true");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const formData = buildAdoptantFormData(values);
      const result = isCreateMode
        ? await createAdoptant(formData)
        : await updateAdoptant(documentId ?? "", formData);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (isCreateMode && result.documentId) {
        router.push(`/adoptant/profile?created=true`);
        return;
      }

      setSuccess("Vos informations ont bien été enregistrées.");
      router.refresh();
    } finally {
      setLoading(false);
    }
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

      <StepCard title={currentStep.title} description={currentStep.description}>
        {step === 0 && (
          <div className="flex flex-col gap-4">
            {isCreateMode && (
              <p className="rounded-xl bg-tertiary/10 px-4 py-3 text-sm text-quaternary/80 leading-relaxed">
                Vous pouvez créer votre compte rapidement avec ces 4 champs,
                puis compléter le formulaire détaillé plus tard depuis votre profil.
              </p>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <FormInput
                label="Nom"
                id="name"
                value={values.name}
                onChange={(event) => setField("name", event.target.value)}
                required
              />
              <FormInput
                label="Prénom"
                id="firstName"
                value={values.firstName}
                onChange={(event) => setField("firstName", event.target.value)}
                required
              />
              <FormInput
                label="Adresse e-mail"
                id="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => setField("email", event.target.value)}
                required
                wrapperClassName="md:col-span-2"
              />
              {isCreateMode ? (
                <FormInput
                  label="Mot de passe"
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={values.password}
                  onChange={(event) => setField("password", event.target.value)}
                  required
                  wrapperClassName="md:col-span-2"
                />
              ) : (
                <p className="md:col-span-2 rounded-xl bg-tertiary/10 px-4 py-3 text-sm text-quaternary/80">
                  Le mot de passe n&apos;est pas modifié depuis cette page.
                </p>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Date de naissance"
              id="birthDate"
              type="date"
              value={values.birthDate}
              onChange={(event) => setField("birthDate", event.target.value)}
            />
            <FormInput
              label="Numéro de téléphone"
              id="phone"
              type="tel"
              value={values.phone}
              onChange={(event) => setField("phone", event.target.value)}
            />
            <FormInput
              label="Adresse postale"
              id="address"
              value={values.address}
              onChange={(event) => setField("address", event.target.value)}
              wrapperClassName="md:col-span-2"
            />
            <FormInput
              label="Code postal"
              id="postalCode"
              value={values.postalCode}
              onChange={(event) => setField("postalCode", event.target.value)}
            />
            <FormInput
              label="Ville"
              id="city"
              value={values.city}
              onChange={(event) => setField("city", event.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              as="select"
              label="Composition du foyer"
              id="householdComposition"
              value={values.householdComposition}
              onChange={(event) => setField("householdComposition", event.target.value)}
            >
              {householdOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormInput>

            {values.householdComposition === "colocation" && (
              <FormInput
                label="Combien de colocataires ?"
                id="roommatesCount"
                type="number"
                min="0"
                value={values.roommatesCount}
                onChange={(event) => setField("roommatesCount", event.target.value)}
              />
            )}

            <ChoiceSelectField
              id="hasChildren"
              label="Avez-vous des enfants ?"
              value={values.hasChildren}
              options={yesNoOptions}
              onChange={(value) => setField("hasChildren", value)}
            />

            {values.hasChildren === "oui" && (
              <>
                <FormInput
                  label="Combien d'enfants ?"
                  id="childrenCount"
                  type="number"
                  min="0"
                  value={values.childrenCount}
                  onChange={(event) => setField("childrenCount", event.target.value)}
                />
                <FormInput
                  as="textarea"
                  label="Quels âges ont-ils ?"
                  id="childrenAges"
                  value={values.childrenAges}
                  onChange={(event) => setField("childrenAges", event.target.value)}
                  wrapperClassName="md:col-span-2"
                />
              </>
            )}

            <ChoiceSelectField
              id="householdAgreement"
              label="Toutes les personnes vivant au foyer sont-elles d'accord ?"
              value={values.householdAgreement}
              options={yesNoOptions}
              onChange={(value) => setField("householdAgreement", value)}
            />

            {values.householdAgreement === "non" && (
              <FormInput
                as="textarea"
                label="Qui n'est pas d'accord et pourquoi ?"
                id="disagreementDetails"
                value={values.disagreementDetails}
                onChange={(event) => setField("disagreementDetails", event.target.value)}
                wrapperClassName="md:col-span-2"
              />
            )}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              as="select"
              label="Travaillez-vous ?"
              id="workStatus"
              value={values.workStatus}
              onChange={(event) => setField("workStatus", event.target.value)}
              wrapperClassName="md:col-span-2"
            >
              {workOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormInput>

            {values.workStatus !== "" && values.workStatus !== "recherche" && (
              <>
                <FormInput
                  label="Quelle est votre profession ?"
                  id="profession"
                  value={values.profession}
                  onChange={(event) => setField("profession", event.target.value)}
                />
                <FormInput
                  label="Quels sont vos horaires de travail ?"
                  id="workingHours"
                  value={values.workingHours}
                  onChange={(event) => setField("workingHours", event.target.value)}
                />
              </>
            )}

            <FormInput
              label="Combien de temps l'animal restera-t-il seul chez vous ?"
              id="aloneTime"
              value={values.aloneTime}
              onChange={(event) => setField("aloneTime", event.target.value)}
              wrapperClassName="md:col-span-2"
            />
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              as="select"
              label="Vous vivez ?"
              id="housingType"
              value={values.housingType}
              onChange={(event) => setField("housingType", event.target.value)}
            >
              <option value="">-- Choisir --</option>
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
              <option value="autre">Autre</option>
            </FormInput>
            <FormInput
              label="Superficie du logement"
              id="housingSurface"
              value={values.housingSurface}
              onChange={(event) => setField("housingSurface", event.target.value)}
            />
            <FormInput
              as="select"
              label="Habitez-vous ?"
              id="livingEnvironment"
              value={values.livingEnvironment}
              onChange={(event) => setField("livingEnvironment", event.target.value)}
            >
              {environmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormInput>
            <ChoiceSelectField
              id="nearBusyRoad"
              label="Habitez-vous à proximité d'une route passante ?"
              value={values.nearBusyRoad}
              options={yesNoOtherOptions}
              onChange={(value) => setField("nearBusyRoad", value)}
            />
            <ChoiceSelectField
              id="petCanGoOutside"
              label="L'animal aura-t-il la possibilité de sortir ?"
              value={values.petCanGoOutside}
              options={yesNoOtherOptions}
              onChange={(value) => setField("petCanGoOutside", value)}
            />

            {values.housingType === "appartement" && (
              <>
                <FormInput
                  label="À quel étage êtes-vous ?"
                  id="apartmentFloor"
                  type="number"
                  min="0"
                  value={values.apartmentFloor}
                  onChange={(event) => setField("apartmentFloor", event.target.value)}
                />
                <ChoiceSelectField
                  id="windowsSecured"
                  label="Vos fenêtres sont-elles sécurisées ?"
                  value={values.windowsSecured}
                  options={yesNoOtherOptions}
                  onChange={(value) => setField("windowsSecured", value)}
                />
                {values.windowsSecured === "non" && (
                  <ChoiceSelectField
                    id="planToSecureWindows"
                    label="Envisagez-vous de sécuriser vos fenêtres ?"
                    value={values.planToSecureWindows}
                    options={yesNoOtherOptions}
                    onChange={(value) => setField("planToSecureWindows", value)}
                  />
                )}
              </>
            )}

            <ChoiceSelectField
              id="hasGarden"
              label="Avez-vous un jardin ?"
              value={values.hasGarden}
              options={yesNoOtherOptions}
              onChange={(value) => setField("hasGarden", value)}
            />
            {values.hasGarden === "oui" && (
              <>
                <FormInput
                  label="Superficie du jardin"
                  id="gardenSurface"
                  value={values.gardenSurface}
                  onChange={(event) => setField("gardenSurface", event.target.value)}
                />
                <ChoiceSelectField
                  id="gardenFenced"
                  label="Le jardin est-il grillagé ?"
                  value={values.gardenFenced}
                  options={yesNoOtherOptions}
                  onChange={(value) => setField("gardenFenced", value)}
                />
                {values.gardenFenced === "oui" && (
                  <FormInput
                    label="Hauteur du grillage"
                    id="fenceHeight"
                    value={values.fenceHeight}
                    onChange={(event) => setField("fenceHeight", event.target.value)}
                  />
                )}
              </>
            )}

            <ChoiceSelectField
              id="hasBalconyOrTerrace"
              label="Avez-vous un balcon ou une terrasse ?"
              value={values.hasBalconyOrTerrace}
              options={yesNoOtherOptions}
              onChange={(value) => setField("hasBalconyOrTerrace", value)}
            />
            {values.hasBalconyOrTerrace === "oui" && (
              <>
                <FormInput
                  label="Superficie du balcon / terrasse"
                  id="balconySurface"
                  value={values.balconySurface}
                  onChange={(event) => setField("balconySurface", event.target.value)}
                />
                <ChoiceSelectField
                  id="balconySecured"
                  label="Le balcon est-il sécurisé ?"
                  value={values.balconySecured}
                  options={yesNoOtherOptions}
                  onChange={(value) => setField("balconySecured", value)}
                />
              </>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="grid gap-4 md:grid-cols-2">
            <ChoiceSelectField
              id="hasOtherAnimals"
              label="Avez-vous d'autres animaux ?"
              value={values.hasOtherAnimals}
              options={yesNoOptions}
              onChange={(value) => setField("hasOtherAnimals", value)}
            />
            {values.hasOtherAnimals === "oui" && (
              <>
                <FormInput
                  as="textarea"
                  label="Quels animaux avez-vous ? (nombre, espèce, race, sexe, âge)"
                  id="otherAnimalsDetails"
                  value={values.otherAnimalsDetails}
                  onChange={(event) => setField("otherAnimalsDetails", event.target.value)}
                  wrapperClassName="md:col-span-2"
                />
                <ChoiceSelectField
                  id="sterilizedAnimals"
                  label="Sont-ils stérilisés ?"
                  value={values.sterilizedAnimals}
                  options={yesNoOptions}
                  onChange={(value) => setField("sterilizedAnimals", value)}
                />
                <FormInput
                  label="Depuis combien de temps les avez-vous ?"
                  id="petsSince"
                  value={values.petsSince}
                  onChange={(event) => setField("petsSince", event.target.value)}
                />
              </>
            )}
            <FormInput
              as="textarea"
              label="Avez-vous des remarques à nous partager ?"
              id="remarks"
              value={values.remarks}
              onChange={(event) => setField("remarks", event.target.value)}
              wrapperClassName="md:col-span-2"
            />
            <label className="md:col-span-2 flex items-start gap-3 rounded-xl border-2 border-tertiary bg-tertiary/5 px-4 py-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                checked={values.acceptsResponsibility}
                onChange={(event) =>
                  setField("acceptsResponsibility", event.target.checked)
                }
                className="mt-1 accent-primary"
                required
              />
              <span>
                En validant ce formulaire, vous acceptez l&apos;entière
                responsabilité de l&apos;entretien de l&apos;animal, y compris les frais
                vétérinaires, la nourriture, les accessoires et les conséquences
                juridiques et pécuniaires liées à sa garde.
              </span>
            </label>
          </div>
        )}
      </StepCard>

      {error && (
        <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      {success && (
        <p className="text-sm font-bold text-green-700 bg-green-50 px-4 py-3 rounded-xl">
          {success}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goToPreviousStep}
          disabled={step === 0 || loading}
          className="px-6 py-3 font-bold rounded-xl border-2 border-tertiary text-quaternary/70 hover:border-primary hover:text-primary transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Précédent
        </button>

        {isCreateMode && step === 0 ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={submitCreateQuick}
              disabled={loading}
              className="px-6 py-3 font-bold rounded-xl border-2 border-quaternary text-quaternary hover:bg-quaternary/10 transition-colors duration-200 disabled:opacity-60"
            >
              {loading ? "Création..." : "Créer le compte rapidement"}
            </button>
            <button
              type="button"
              onClick={goToNextStep}
              disabled={loading}
              className="px-6 py-3 font-bold rounded-xl bg-primary border-2 border-primary text-white hover:bg-primary/10 hover:text-primary transition-colors duration-200 disabled:opacity-60"
            >
              Continuer le formulaire complet
            </button>
          </div>
        ) : step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={goToNextStep}
            disabled={loading}
            className="px-6 py-3 font-bold rounded-xl bg-primary border-2 border-primary text-white hover:bg-primary/10 hover:text-primary transition-colors duration-200 disabled:opacity-60"
          >
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 font-bold rounded-xl bg-primary border-2 border-primary text-white hover:bg-primary/10 hover:text-primary transition-colors duration-200 disabled:opacity-60"
          >
            {loading
              ? isCreateMode
                ? "Création..."
                : "Enregistrement..."
              : isCreateMode
                ? "Créer mon compte"
                : "Enregistrer mes informations"}
          </button>
        )}
      </div>
    </form>
  );
}