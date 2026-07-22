"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import {
  AdopterFormValues,
  buildAdopterFormData,
  buildAdopterPayload,
  adopterDefaultValues,
  yesNoOptions,
  householdTypeOptions,
  householdPresenceOptions,
  childrenAgeGroupOptions,
  employmentStatusOptions,
  employmentArrangementOptions,
  housingTypeOptions,
  livingEnvironmentOptions,
} from "@/helpers/adopterPayloadHelper";

type StepDefinition = {
  title: string;
};

type AdopterFormWizardProps = {
  mode: "create" | "edit";
  documentId?: string;
  initialValues?: Partial<AdopterFormValues>;
};

type Option = { value: string; label: string };

const stepDefinitions: StepDefinition[] = [
  { title: "Compte" },
  { title: "Coordonnées" },
  { title: "Foyer" },
  { title: "Travail et rythme de vie" },
  { title: "Logement" },
  { title: "Autres animaux et engagement" },
];

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  wrapperClassName,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  wrapperClassName?: string;
}) {
  const select = (
    <Select
      name={id}
      labelName={label}
      value={value}
      required={required}
      onChange={(event) => onChange(event.target.value)}
      options={options.map((option) => ({
        key: option.value,
        value: option.value,
      }))}
      translatedOptions={Object.fromEntries(
        options.map((option) => [option.value, option.label]),
      )}
    />
  );

  return wrapperClassName ? (
    <div className={wrapperClassName}>{select}</div>
  ) : (
    select
  );
}

function StepCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Heading
          type="h4"
          headingVariant="quaternary"
          underlineVariant="tertiary"
        >
          {title}
        </Heading>
      </div>
      {children}
    </div>
  );
}

export default function AdopterFormWizard({
  mode,
  documentId,
  initialValues,
}: AdopterFormWizardProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [pendingTarget, setPendingTarget] = useState<string | null>(null);

  const [values, setValues] = useState<AdopterFormValues>(() => ({
    ...adopterDefaultValues,
    ...initialValues,
  }));

  const isCreateMode = mode === "create";
  const totalSteps = stepDefinitions.length;
  const currentStep = stepDefinitions[step];
  const progress = useMemo(
    () => Math.round(((step + 1) / totalSteps) * 100),
    [step, totalSteps],
  );

  function setField<K extends keyof AdopterFormValues>(
    field: K,
    value: AdopterFormValues[K],
  ) {
    setValues((previous) => ({ ...previous, [field]: value }));
  }

  function goToNextStep() {
    const form = formRef.current;
    if (form && !form.reportValidity()) return;
    setStep((previous) => Math.min(previous + 1, totalSteps - 1));
  }

  function goToPreviousStep() {
    setError(null);
    setSuccess(null);
    setStep((previous) => Math.max(previous - 1, 0));
  }

  async function registerAdopter(): Promise<boolean> {
    if (values.password !== values.confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return false;
    }

    const payload = buildAdopterPayload(buildAdopterFormData(values), {
      includePassword: true,
    });

    if (!("data" in payload)) {
      setError(
        "error" in payload && payload.error
          ? payload.error
          : "Formulaire invalide.",
      );
      return false;
    }

    const entityRes = await fetch("/api/adopters/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload.data),
    });
    const entityData = await entityRes.json();

    if (!entityRes.ok || !entityData.data?.documentId) {
      setError(
        typeof entityData.error === "string" &&
          entityData.error.includes("email")
          ? "Un compte existe déjà avec cet email."
          : "Erreur lors de la création du compte.",
      );
      return false;
    }

    const userRes = await fetch("/api/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "adopters",
        documentId: entityData.data.documentId,
        lastName: payload.data.lastName,
        firstName: payload.data.firstName,
        email: payload.data.email,
        password: values.password,
      }),
    });

    if (!userRes.ok) {
      setError("Compte créé, mais l'association a échoué.");
      return false;
    }

    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: payload.data.email,
        password: values.password,
      }),
    });

    return true;
  }

  async function finishRegistration(target: string) {
    const form = formRef.current;
    if (form && !form.reportValidity()) return;

    setError(null);
    setSuccess(null);
    setLoading(true);
    setPendingTarget(target);

    try {
      if (isCreateMode) {

        if (await registerAdopter()) window.location.assign(target);
        return;
      }

      const res = await fetch(`/api/adopters/${documentId ?? ""}`, {
        method: "PUT",
        body: buildAdopterFormData(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Erreur lors de la mise à jour.");
        return;
      }
      setSuccess("Vos informations ont bien été enregistrées.");
      router.refresh();
    } finally {
      setLoading(false);
      setPendingTarget(null);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`flex flex-col gap-6${isCreateMode ? " wizard-compact" : ""}`}
    >
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

      <StepCard title={currentStep.title}>
        {step === 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              type="text"
              name="lastName"
              labelName="Nom"
              required
              value={values.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
            />
            <Input
              type="text"
              name="firstName"
              labelName="Prénom"
              required
              value={values.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
            />
            <div className="md:col-span-2">
              <Input
                type="email"
                name="email"
                labelName="Adresse e-mail"
                autoComplete="email"
                required
                value={values.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </div>
            {isCreateMode ? (
              <>
                <Input
                  type="password"
                  name="password"
                  labelName="Mot de passe (14 caractères min.)"
                  autoComplete="new-password"
                  minLength={14}
                  required
                  value={values.password}
                  onChange={(e) => setField("password", e.target.value)}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  labelName="Confirmation du mot de passe"
                  autoComplete="new-password"
                  minLength={14}
                  required
                  value={values.confirmPassword}
                  onChange={(e) => setField("confirmPassword", e.target.value)}
                />
              </>
            ) : null}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              type="date"
              name="birthDate"
              labelName="Date de naissance"
              required
              value={values.birthDate}
              onChange={(e) => setField("birthDate", e.target.value)}
            />
            <Input
              type="tel"
              name="phoneNumber"
              labelName="Numéro de téléphone"
              required
              value={values.phoneNumber}
              onChange={(e) => setField("phoneNumber", e.target.value)}
            />
            <div className="md:col-span-2">
              <Input
                type="text"
                name="address"
                labelName="Adresse postale"
                required
                value={values.address}
                onChange={(e) => setField("address", e.target.value)}
              />
            </div>
            <Input
              type="text"
              name="postalCode"
              labelName="Code postal"
              required
              value={values.postalCode}
              onChange={(e) => setField("postalCode", e.target.value)}
            />
            <Input
              type="text"
              name="city"
              labelName="Ville"
              required
              value={values.city}
              onChange={(e) => setField("city", e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              id="householdType"
              label="Type de foyer"
              value={values.householdType}
              onChange={(v) => setField("householdType", v)}
              options={householdTypeOptions}
              required
            />
            <Input
              type="number"
              name="householdComposition"
              labelName="Composition du foyer"
              min={1}
              required
              value={values.householdComposition}
              onChange={(e) => setField("householdComposition", e.target.value)}
            />
            <SelectField
              id="householdPresence"
              label="Présence du foyer à la maison"
              value={values.householdPresence}
              onChange={(v) => setField("householdPresence", v)}
              options={householdPresenceOptions}
              required
            />
            <SelectField
              id="hasChildren"
              label="Avez-vous des enfants ?"
              value={values.hasChildren}
              onChange={(v) => setField("hasChildren", v)}
              options={yesNoOptions}
              required
            />
            {values.hasChildren === "true" && (
              <SelectField
                id="childrenAgeGroup"
                label="Tranche d'âge des enfants"
                value={values.childrenAgeGroup}
                onChange={(v) => setField("childrenAgeGroup", v)}
                options={childrenAgeGroupOptions}
              />
            )}
            <SelectField
              id="householdAgreement"
              label="Avez-vous l'accord de tous les membres du foyer pour accueillir un animal ?"
              value={values.householdAgreement}
              onChange={(v) => setField("householdAgreement", v)}
              options={yesNoOptions}
              required
            />
            {values.householdAgreement === "false" && (
              <div className="md:col-span-2">
                <Textarea
                  name="disagreementDetails"
                  labelName="Qui n'est pas d'accord et pourquoi ?"
                  rows={4}
                  required
                  value={values.disagreementDetails}
                  onChange={(e) =>
                    setField("disagreementDetails", e.target.value)
                  }
                />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              id="employmentStatus"
              label="Situation professionnelle"
              value={values.employmentStatus}
              onChange={(v) => setField("employmentStatus", v)}
              options={employmentStatusOptions}
              required
            />
            <SelectField
              id="employmentArrangement"
              label="Mode de travail"
              value={values.employmentArrangement}
              onChange={(v) => setField("employmentArrangement", v)}
              options={employmentArrangementOptions}
              required
            />
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              id="housingType"
              label="Type de logement"
              value={values.housingType}
              onChange={(v) => setField("housingType", v)}
              options={housingTypeOptions}
              required
            />
            <Input
              type="number"
              name="housingSurface"
              labelName="Superficie du logement (m²)"
              min={1}
              required
              value={values.housingSurface}
              onChange={(e) => setField("housingSurface", e.target.value)}
            />
            <SelectField
              id="livingEnvironment"
              label="Environnement"
              value={values.livingEnvironment}
              onChange={(v) => setField("livingEnvironment", v)}
              options={livingEnvironmentOptions}
              required
            />
            <SelectField
              id="isNearBusyRoad"
              label="Êtes-vous à proximité d'une route passante ?"
              value={values.isNearBusyRoad}
              onChange={(v) => setField("isNearBusyRoad", v)}
              options={yesNoOptions}
              required
            />
            <SelectField
              id="animalCanGoOutside"
              label="L'animal pourra-t-il sortir ?"
              value={values.animalCanGoOutside}
              onChange={(v) => setField("animalCanGoOutside", v)}
              options={yesNoOptions}
              required
            />
            <SelectField
              id="areWindowsSecuredOrWillBe"
              label="Vos fenêtres sont-elles ou seront-elles sécurisées ?"
              value={values.areWindowsSecuredOrWillBe}
              onChange={(v) => setField("areWindowsSecuredOrWillBe", v)}
              options={yesNoOptions}
              required
            />
            {values.housingType === "apartment" && (
              <Input
                type="number"
                name="apartmentFloor"
                labelName="Numéro d'étage"
                min={0}
                required={false}
                value={values.apartmentFloor}
                onChange={(e) => setField("apartmentFloor", e.target.value)}
              />
            )}
            <SelectField
              id="hasBalconyOrTerrace"
              label="Avez-vous un balcon ou une terrasse ?"
              value={values.hasBalconyOrTerrace}
              onChange={(v) => setField("hasBalconyOrTerrace", v)}
              options={yesNoOptions}
              required
            />
            {values.hasBalconyOrTerrace === "true" && (
              <SelectField
                id="isBalconySecured"
                label="Votre balcon est-il sécurisé ?"
                value={values.isBalconySecured}
                onChange={(v) => setField("isBalconySecured", v)}
                options={yesNoOptions}
              />
            )}
            <SelectField
              id="hasGarden"
              label="Avez-vous un jardin ?"
              value={values.hasGarden}
              onChange={(v) => setField("hasGarden", v)}
              options={yesNoOptions}
              required
            />
            {values.hasGarden === "true" && (
              <>
                <Input
                  type="number"
                  name="gardenSurface"
                  labelName="Superficie du jardin (m²)"
                  min={0}
                  required={false}
                  value={values.gardenSurface}
                  onChange={(e) => setField("gardenSurface", e.target.value)}
                />
                <Input
                  type="number"
                  name="fenceHeight"
                  labelName="Hauteur de la clôture (cm)"
                  min={0}
                  required={false}
                  value={values.fenceHeight}
                  onChange={(e) => setField("fenceHeight", e.target.value)}
                />
              </>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              id="hasOtherAnimals"
              label="Avez-vous d'autres animaux ?"
              value={values.hasOtherAnimals}
              onChange={(v) => setField("hasOtherAnimals", v)}
              options={yesNoOptions}
              required
            />
            {values.hasOtherAnimals === "true" && (
              <>
                <SelectField
                  id="areOtherAnimalsSterilizedOrCastrated"
                  label="Sont-ils stérilisés / castrés ?"
                  value={values.areOtherAnimalsSterilizedOrCastrated}
                  onChange={(v) =>
                    setField("areOtherAnimalsSterilizedOrCastrated", v)
                  }
                  options={yesNoOptions}
                  required
                />
                <div className="md:col-span-2">
                  <Textarea
                    name="otherAnimalsDetails"
                    labelName="Décrivez vos animaux ? (nombre, espèce, race, sexe, âge, etc.)"
                    rows={4}
                    required={false}
                    value={values.otherAnimalsDetails}
                    onChange={(e) =>
                      setField("otherAnimalsDetails", e.target.value)
                    }
                  />
                </div>
                <Input
                  type="date"
                  name="firstAnimalOwnershipDate"
                  labelName="Depuis quand approximativement possédez-vous des animaux ?"
                  required={false}
                  value={values.firstAnimalOwnershipDate}
                  onChange={(e) =>
                    setField("firstAnimalOwnershipDate", e.target.value)
                  }
                />
              </>
            )}
            <div className="md:col-span-2">
              <Textarea
                name="remarks"
                labelName="Remarques (facultatif)"
                rows={4}
                required={false}
                value={values.remarks}
                onChange={(e) => setField("remarks", e.target.value)}
              />
            </div>
            <label className="md:col-span-2 flex items-start gap-3 rounded-xl border-2 border-tertiary bg-tertiary/5 px-4 py-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                checked={values.hasAcceptedResponsibility}
                onChange={(e) =>
                  setField("hasAcceptedResponsibility", e.target.checked)
                }
                className="mt-1 accent-primary"
                required
              />
              <span>
                En validant ce formulaire, vous acceptez l&apos;entière
                responsabilité de l&apos;entretien de l&apos;animal, y compris
                les frais vétérinaires, la nourriture, les accessoires et les
                conséquences juridiques et pécuniaires liées à sa garde.
              </span>
            </label>
          </div>
        )}
      </StepCard>

      {error && (
        <p className="px-4 py-3 rounded-xl bg-primary/10 border-2 border-primary text-primary font-bold text-sm">
          {error}
        </p>
      )}

      {success && (
        <p className="px-4 py-3 rounded-xl bg-tertiary/10 border-2 border-tertiary text-tertiary font-bold text-sm">
          {success}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={goToPreviousStep}
          disabled={step === 0 || loading}
        >
          ← Précédent
        </Button>

        {step < totalSteps - 1 ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={goToNextStep}
            disabled={loading}
          >
            Suivant →
          </Button>
        ) : isCreateMode ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => finishRegistration("/account")}
            disabled={loading}
          >
            {loading && pendingTarget === "/account"
              ? "Création..."
              : "Créer mon compte"}
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => finishRegistration("")}
            disabled={loading}
          >
            {loading ? "Enregistrement..." : "Enregistrer mes informations"}
          </Button>
        )}
      </div>
    </form>
  );
}
