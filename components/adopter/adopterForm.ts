import IAdopter from "@/interfaces/IAdopter";

// Le formulaire est intégralement aligné sur le schéma back `adopter`.
// Les valeurs des <select> correspondent directement aux enums Strapi.
export type AdopterFormValues = {
  // Compte
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  // Coordonnées
  birthDate: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  city: string;
  // Foyer
  householdType: string; // single | couple | family | shared accommodation | other
  householdComposition: string; // integer >= 1
  householdPresence: string; // always | often | sometimes | rarely
  hasChildren: string; // "true" | "false"
  childrenAgeGroup: string; // young | old | both | not applicable
  householdAgreement: string; // "true" | "false"
  disagreementDetails: string;
  // Travail
  employmentStatus: string; // full-time | part-time | job seeking | other
  employmentArrangement: string; // on site | hybrid | remote | not applicable
  // Logement
  housingType: string; // apartment | house | other
  housingSurface: string; // integer >= 1
  apartmentFloor: string;
  areWindowsSecuredOrWillBe: string; // "true" | "false"
  hasBalconyOrTerrace: string; // "true" | "false"
  isBalconySecured: string; // "true" | "false"
  hasGarden: string; // "true" | "false"
  gardenSurface: string;
  fenceHeight: string;
  livingEnvironment: string; // urban | suburban | rural
  isNearBusyRoad: string; // "true" | "false"
  animalCanGoOutside: string; // "true" | "false"
  // Autres animaux & engagement
  hasOtherAnimals: string; // "true" | "false"
  otherAnimalsDetails: string;
  areOtherAnimalsSterilizedOrCastrated: string; // "true" | "false"
  firstAnimalOwnershipDate: string;
  remarks: string;
  hasAcceptedResponsibility: boolean;
};

export const adopterDefaultValues: AdopterFormValues = {
  lastName: "",
  firstName: "",
  email: "",
  password: "",
  birthDate: "",
  phoneNumber: "",
  address: "",
  postalCode: "",
  city: "",
  householdType: "",
  householdComposition: "",
  householdPresence: "",
  hasChildren: "",
  childrenAgeGroup: "",
  householdAgreement: "",
  disagreementDetails: "",
  employmentStatus: "",
  employmentArrangement: "",
  housingType: "",
  housingSurface: "",
  apartmentFloor: "",
  areWindowsSecuredOrWillBe: "",
  hasBalconyOrTerrace: "",
  isBalconySecured: "",
  hasGarden: "",
  gardenSurface: "",
  fenceHeight: "",
  livingEnvironment: "",
  isNearBusyRoad: "",
  animalCanGoOutside: "",
  hasOtherAnimals: "",
  otherAnimalsDetails: "",
  areOtherAnimalsSterilizedOrCastrated: "",
  firstAnimalOwnershipDate: "",
  remarks: "",
  hasAcceptedResponsibility: false,
};

// Options (label FR -> valeur = enum Strapi)
export const yesNoOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "true", label: "Oui" },
  { value: "false", label: "Non" },
];

export const householdTypeOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "single", label: "Seul(e)" },
  { value: "couple", label: "En couple" },
  { value: "family", label: "Famille" },
  { value: "shared accommodation", label: "Colocation" },
  { value: "other", label: "Autre" },
];

export const householdPresenceOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "always", label: "Toujours" },
  { value: "often", label: "Souvent" },
  { value: "sometimes", label: "Parfois" },
  { value: "rarely", label: "Rarement" },
];

export const childrenAgeGroupOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "young", label: "Jeunes enfants" },
  { value: "old", label: "Grands enfants" },
  { value: "both", label: "Les deux" },
  { value: "not applicable", label: "Non applicable" },
];

export const employmentStatusOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "full-time", label: "Temps plein" },
  { value: "part-time", label: "Temps partiel" },
  { value: "job seeking", label: "En recherche d'emploi" },
  { value: "other", label: "Autre" },
];

export const employmentArrangementOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "on site", label: "Sur site" },
  { value: "hybrid", label: "Hybride" },
  { value: "remote", label: "Télétravail" },
  { value: "not applicable", label: "Non applicable" },
];

export const housingTypeOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "apartment", label: "Appartement" },
  { value: "house", label: "Maison" },
  { value: "other", label: "Autre" },
];

export const livingEnvironmentOptions = [
  { value: "", label: "-- Choisir --" },
  { value: "urban", label: "Urbain" },
  { value: "suburban", label: "Périurbain" },
  { value: "rural", label: "Rural" },
];

// --- Lecture d'une entité existante vers les valeurs du formulaire (mode édition) ---
const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
const b = (v: unknown) => (v === true ? "true" : v === false ? "false" : "");

export function mapAdopterToFormValues(
  adopter?: Partial<IAdopter> | null,
): AdopterFormValues {
  if (!adopter) return adopterDefaultValues;

  return {
    ...adopterDefaultValues,
    lastName: s(adopter.lastName),
    firstName: s(adopter.firstName),
    email: s(adopter.email),
    birthDate: s(adopter.birthDate).slice(0, 10),
    phoneNumber: s(adopter.phoneNumber),
    address: s(adopter.address),
    postalCode: s(adopter.postalCode),
    city: s(adopter.city),
    householdType: s(adopter.householdType),
    householdComposition: s(adopter.householdComposition),
    householdPresence: s(adopter.householdPresence),
    hasChildren: b(adopter.hasChildren),
    childrenAgeGroup: s(adopter.childrenAgeGroup),
    householdAgreement: b(adopter.householdAgreement),
    disagreementDetails: s(adopter.disagreementDetails),
    employmentStatus: s(adopter.employmentStatus),
    employmentArrangement: s(adopter.employmentArrangement),
    housingType: s(adopter.housingType),
    housingSurface: s(adopter.housingSurface),
    apartmentFloor: s(adopter.apartmentFloor),
    areWindowsSecuredOrWillBe: b(adopter.areWindowsSecuredOrWillBe),
    hasBalconyOrTerrace: b(adopter.hasBalconyOrTerrace),
    isBalconySecured: b(adopter.isBalconySecured),
    hasGarden: b(adopter.hasGarden),
    gardenSurface: s(adopter.gardenSurface),
    fenceHeight: s(adopter.fenceHeight),
    livingEnvironment: s(adopter.livingEnvironment),
    isNearBusyRoad: b(adopter.isNearBusyRoad),
    animalCanGoOutside: b(adopter.animalCanGoOutside),
    hasOtherAnimals: b(adopter.hasOtherAnimals),
    otherAnimalsDetails: s(adopter.otherAnimalsDetails),
    areOtherAnimalsSterilizedOrCastrated: b(adopter.areOtherAnimalsSterilizedOrCastrated),
    firstAnimalOwnershipDate: s(adopter.firstAnimalOwnershipDate).slice(0, 10),
    remarks: s(adopter.remarks),
    hasAcceptedResponsibility: adopter.hasAcceptedResponsibility === true,
  };
}

export function buildAdopterFormData(values: AdopterFormValues): FormData {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      formData.set(key, value ? "true" : "false");
      return;
    }
    const trimmed = value.trim();
    if (trimmed.length > 0) formData.set(key, trimmed);
  });

  return formData;
}

// --- Helpers de lecture depuis FormData ---
type FormKey = keyof AdopterFormValues;

export function getRequiredField(formData: FormData, key: FormKey, label: string) {
  const value = formData.get(key);
  if (typeof value !== "string" || value.trim().length === 0) {
    return { error: `${label} est requis.` } as const;
  }
  return { value: value.trim() } as const;
}

function optionalString(formData: FormData, key: FormKey): string | null {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function optionalNumber(formData: FormData, key: FormKey): number | null {
  const value = optionalString(formData, key);
  if (value === null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function boolean(formData: FormData, key: FormKey): boolean | null {
  const value = formData.get(key);
  if (value === "true" || value === "oui") return true;
  if (value === "false" || value === "non") return false;
  return null;
}

// --- Construction du payload au format schéma Strapi ---
export function buildAdopterPayload(
  formData: FormData,
  options: { includePassword: boolean },
) {
  const lastName = getRequiredField(formData, "lastName", "Le nom");
  if ("error" in lastName) return lastName;

  const firstName = getRequiredField(formData, "firstName", "Le prénom");
  if ("error" in firstName) return firstName;

  const email = getRequiredField(formData, "email", "L'email");
  if ("error" in email) return email;

  let password: string | undefined;
  if (options.includePassword) {
    const passwordField = getRequiredField(formData, "password", "Le mot de passe");
    if ("error" in passwordField) return passwordField;
    password = passwordField.value;
  }

  const householdAgreement = boolean(formData, "householdAgreement");

  const data = {
    lastName: lastName.value,
    firstName: firstName.value,
    email: email.value,
    ...(password ? { password } : {}),
    birthDate: optionalString(formData, "birthDate"),
    phoneNumber: optionalString(formData, "phoneNumber"),
    address: optionalString(formData, "address"),
    postalCode: optionalString(formData, "postalCode"),
    city: optionalString(formData, "city"),
    employmentStatus: optionalString(formData, "employmentStatus"),
    employmentArrangement:
      optionalString(formData, "employmentArrangement") ?? "not applicable",
    householdType: optionalString(formData, "householdType"),
    householdComposition: optionalNumber(formData, "householdComposition"),
    hasChildren: boolean(formData, "hasChildren"),
    childrenAgeGroup: optionalString(formData, "childrenAgeGroup") ?? "not applicable",
    householdPresence: optionalString(formData, "householdPresence"),
    householdAgreement,
    // Champ requis par le schéma (minLength 1) : on renseigne une valeur neutre si accord.
    disagreementDetails:
      optionalString(formData, "disagreementDetails") ??
      (householdAgreement === false ? null : "Non applicable"),
    housingType: optionalString(formData, "housingType"),
    housingSurface: optionalNumber(formData, "housingSurface"),
    apartmentFloor: optionalNumber(formData, "apartmentFloor"),
    areWindowsSecuredOrWillBe: boolean(formData, "areWindowsSecuredOrWillBe"),
    hasBalconyOrTerrace: boolean(formData, "hasBalconyOrTerrace"),
    isBalconySecured: boolean(formData, "isBalconySecured"),
    hasGarden: boolean(formData, "hasGarden"),
    gardenSurface: optionalNumber(formData, "gardenSurface"),
    fenceHeight: optionalNumber(formData, "fenceHeight"),
    livingEnvironment: optionalString(formData, "livingEnvironment"),
    isNearBusyRoad: boolean(formData, "isNearBusyRoad"),
    animalCanGoOutside: boolean(formData, "animalCanGoOutside"),
    hasOtherAnimals: boolean(formData, "hasOtherAnimals"),
    otherAnimalsDetails: optionalString(formData, "otherAnimalsDetails"),
    areOtherAnimalsSterilizedOrCastrated: boolean(
      formData,
      "areOtherAnimalsSterilizedOrCastrated",
    ),
    firstAnimalOwnershipDate: optionalString(formData, "firstAnimalOwnershipDate"),
    remarks: optionalString(formData, "remarks"),
    hasAcceptedResponsibility: boolean(formData, "hasAcceptedResponsibility") ?? false,
  };

  return { data } as const;
}
