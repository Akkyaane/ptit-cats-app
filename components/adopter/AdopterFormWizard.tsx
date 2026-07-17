"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/ui/FormInput";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { updateAdopter } from "@/app/adopters/update/action";
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
} from "@/components/adopter/AdopterForm";

type StepDefinition = {
  title: string;
  description: string;
};

type AdopterFormWizardProps = {
  mode: "create" | "edit";
  documentId?: string;
  initialValues?: Partial<AdopterFormValues>;
};

type Option = { value: string; label: string };

const stepDefinitions: StepDefinition[] = [
  { title: "Compte", description: "Les informations de base pour créer votre espace adopter." },
  { title: "Coordonnées", description: "Les informations pour vous contacter et vérifier votre dossier." },
  { title: "Composition du foyer", description: "Le contexte familial et l'organisation du quotidien." },
  { title: "Travail et rythme de vie", description: "Les habitudes qui influencent l'accueil du chat." },
  { title: "Logement", description: "Le cadre de vie et les sécurisations prévues." },
  { title: "Autres animaux et engagement", description: "Les infos complémentaires et l'accord final." },
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
  return (
    <FormInput
      as="select"
      id={id}
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required={required}
      wrapperClassName={wrapperClassName}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FormInput>
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
        <Heading type="h3" headingVariant="quaternary" underlineVariant="tertiary">
          {title}
        </Heading>
        <p className="text-sm text-quaternary/70 leading-relaxed">{description}</p>
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

  // Contrat d'inscription : create entité -> create user lié -> auto-login.
  async function registerAdopter(): Promise<boolean> {
    const payload = buildAdopterPayload(buildAdopterFormData(values), {
      includePassword: true,
    });

    if (!("data" in payload)) {
      setError("error" in payload && payload.error ? payload.error : "Formulaire invalide.");
      return false;
    }

    // 1. Création de l'entité adopter (publiée immédiatement).
    const entityRes = await fetch("/api/adopters/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload.data),
    });
    const entityData = await entityRes.json();

    if (!entityRes.ok || !entityData.data?.documentId) {
      setError(
        typeof entityData.error === "string" && entityData.error.includes("email")
          ? "Un compte existe déjà avec cet email."
          : "Erreur lors de la création du compte.",
      );
      return false;
    }

    // 2. Création du user users-permissions lié à l'entité.
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

    // 3. Connexion automatique (pose les cookies via la route de login existante).
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: payload.data.email, password: values.password }),
    });

    return true;
  }

  // En création : finalise puis redirige selon le choix de l'utilisateur.
  // En édition : enregistre la mise à jour du profil.
  async function finishRegistration(target: string) {
    const form = formRef.current;
    if (form && !form.reportValidity()) return;

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isCreateMode) {
        if (await registerAdopter()) router.push(target);
        return;
      }

      const result = await updateAdopter(documentId ?? "", buildAdopterFormData(values));
      if (result.error) {
        setError(result.error);
        return;
      }
      setSuccess("Vos informations ont bien été enregistrées.");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isCreateMode) void finishRegistration("");
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
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Nom"
              id="lastName"
              value={values.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
              required
            />
            <FormInput
              label="Prénom"
              id="firstName"
              value={values.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
              required
            />
            <FormInput
              label="Adresse e-mail"
              id="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => setField("email", e.target.value)}
              required
              wrapperClassName="md:col-span-2"
            />
            {isCreateMode ? (
              <FormInput
                label="Mot de passe (14 caractères min.)"
                id="password"
                type="password"
                autoComplete="new-password"
                minLength={14}
                value={values.password}
                onChange={(e) => setField("password", e.target.value)}
                required
                wrapperClassName="md:col-span-2"
              />
            ) : (
              <p className="md:col-span-2 rounded-xl bg-tertiary/10 px-4 py-3 text-sm text-quaternary/80">
                Le mot de passe n&apos;est pas modifié depuis cette page.
              </p>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Date de naissance"
              id="birthDate"
              type="date"
              value={values.birthDate}
              onChange={(e) => setField("birthDate", e.target.value)}
              required
            />
            <FormInput
              label="Numéro de téléphone"
              id="phoneNumber"
              type="tel"
              value={values.phoneNumber}
              onChange={(e) => setField("phoneNumber", e.target.value)}
              required
            />
            <FormInput
              label="Adresse postale"
              id="address"
              value={values.address}
              onChange={(e) => setField("address", e.target.value)}
              required
              wrapperClassName="md:col-span-2"
            />
            <FormInput
              label="Code postal"
              id="postalCode"
              value={values.postalCode}
              onChange={(e) => setField("postalCode", e.target.value)}
              required
            />
            <FormInput
              label="Ville"
              id="city"
              value={values.city}
              onChange={(e) => setField("city", e.target.value)}
              required
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              id="householdType"
              label="Composition du foyer"
              value={values.householdType}
              onChange={(v) => setField("householdType", v)}
              options={householdTypeOptions}
              required
            />
            <FormInput
              label="Nombre de personnes au foyer"
              id="householdComposition"
              type="number"
              min={1}
              value={values.householdComposition}
              onChange={(e) => setField("householdComposition", e.target.value)}
              required
            />
            <SelectField
              id="householdPresence"
              label="Présence à la maison"
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
              label="Tout le foyer est-il d'accord ?"
              value={values.householdAgreement}
              onChange={(v) => setField("householdAgreement", v)}
              options={yesNoOptions}
              required
            />
            {values.householdAgreement === "false" && (
              <FormInput
                as="textarea"
                label="Qui n'est pas d'accord et pourquoi ?"
                id="disagreementDetails"
                value={values.disagreementDetails}
                onChange={(e) => setField("disagreementDetails", e.target.value)}
                required
                wrapperClassName="md:col-span-2"
              />
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
            <FormInput
              label="Superficie du logement (m²)"
              id="housingSurface"
              type="number"
              min={1}
              value={values.housingSurface}
              onChange={(e) => setField("housingSurface", e.target.value)}
              required
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
              label="Proximité d'une route passante ?"
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
              label="Fenêtres sécurisées (ou le seront) ?"
              value={values.areWindowsSecuredOrWillBe}
              onChange={(v) => setField("areWindowsSecuredOrWillBe", v)}
              options={yesNoOptions}
              required
            />
            {values.housingType === "apartment" && (
              <FormInput
                label="Étage"
                id="apartmentFloor"
                type="number"
                min={0}
                value={values.apartmentFloor}
                onChange={(e) => setField("apartmentFloor", e.target.value)}
              />
            )}
            <SelectField
              id="hasBalconyOrTerrace"
              label="Balcon ou terrasse ?"
              value={values.hasBalconyOrTerrace}
              onChange={(v) => setField("hasBalconyOrTerrace", v)}
              options={yesNoOptions}
              required
            />
            {values.hasBalconyOrTerrace === "true" && (
              <SelectField
                id="isBalconySecured"
                label="Balcon sécurisé ?"
                value={values.isBalconySecured}
                onChange={(v) => setField("isBalconySecured", v)}
                options={yesNoOptions}
              />
            )}
            <SelectField
              id="hasGarden"
              label="Jardin ?"
              value={values.hasGarden}
              onChange={(v) => setField("hasGarden", v)}
              options={yesNoOptions}
              required
            />
            {values.hasGarden === "true" && (
              <>
                <FormInput
                  label="Superficie du jardin (m²)"
                  id="gardenSurface"
                  type="number"
                  min={0}
                  value={values.gardenSurface}
                  onChange={(e) => setField("gardenSurface", e.target.value)}
                />
                <FormInput
                  label="Hauteur de la clôture (cm)"
                  id="fenceHeight"
                  type="number"
                  min={0}
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
            <SelectField
              id="areOtherAnimalsSterilizedOrCastrated"
              label="Sont-ils stérilisés / castrés ?"
              value={values.areOtherAnimalsSterilizedOrCastrated}
              onChange={(v) => setField("areOtherAnimalsSterilizedOrCastrated", v)}
              options={yesNoOptions}
              required
            />
            {values.hasOtherAnimals === "true" && (
              <>
                <FormInput
                  as="textarea"
                  label="Quels animaux ? (nombre, espèce, race, sexe, âge)"
                  id="otherAnimalsDetails"
                  value={values.otherAnimalsDetails}
                  onChange={(e) => setField("otherAnimalsDetails", e.target.value)}
                  wrapperClassName="md:col-span-2"
                />
                <FormInput
                  label="Premier animal possédé depuis le"
                  id="firstAnimalOwnershipDate"
                  type="date"
                  value={values.firstAnimalOwnershipDate}
                  onChange={(e) => setField("firstAnimalOwnershipDate", e.target.value)}
                />
              </>
            )}
            <FormInput
              as="textarea"
              label="Remarques (facultatif)"
              id="remarks"
              value={values.remarks}
              onChange={(e) => setField("remarks", e.target.value)}
              wrapperClassName="md:col-span-2"
            />
            <label className="md:col-span-2 flex items-start gap-3 rounded-xl border-2 border-tertiary bg-tertiary/5 px-4 py-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                checked={values.hasAcceptedResponsibility}
                onChange={(e) => setField("hasAcceptedResponsibility", e.target.checked)}
                className="mt-1 accent-primary"
                required
              />
              <span>
                En validant ce formulaire, vous acceptez l&apos;entière responsabilité de
                l&apos;entretien de l&apos;animal, y compris les frais vétérinaires, la
                nourriture, les accessoires et les conséquences juridiques et pécuniaires
                liées à sa garde.
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
        <p className="px-4 py-3 rounded-xl bg-green-50 border-2 border-green-600 text-green-700 font-bold text-sm">
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
          <Button type="button" variant="primary" size="md" onClick={goToNextStep} disabled={loading}>
            Suivant →
          </Button>
        ) : isCreateMode ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => finishRegistration("/profile")}
              disabled={loading}
            >
              {loading ? "Création..." : "Terminer et compléter mon profil"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => finishRegistration("/adoption-listings")}
              disabled={loading}
            >
              {loading ? "Création..." : "Terminer et voir les annonces"}
            </Button>
          </div>
        ) : (
          <Button type="submit" variant="primary" size="md" disabled={loading}>
            {loading ? "Enregistrement..." : "Enregistrer mes informations"}
          </Button>
        )}
      </div>
    </form>
  );
}
