import IAdopter from "@/interfaces/IAdopter";

export type YesNo = "" | "true" | "false";

export type HouseholdValues = {
  housingType: "" | "apartment" | "house" | "other";
  hasYoungChildren: YesNo;
  hasOtherAnimals: YesNo;
  securedExterior: YesNo;
};

export type AnimalValues = {

  agePreference: YesNo;
  ageGroup: "" | "kitten" | "young" | "adult" | "senior";
  sexPreference: YesNo;
  sex: "" | "male" | "female";
  openToSpecificNeeds: YesNo;
  mustGetAlongCats: YesNo;
  mustGetAlongDogs: YesNo;

  wantsHumanContact: YesNo;
  okWithAttentionNeeds: YesNo;
  prefersIndependent: YesNo;
  wantsToHold: YesNo;
  calmOrPlayful: "" | "calm" | "playful";
  okWithVeryActive: YesNo;
  acceptsShy: YesNo;
  okWithMeowing: YesNo;
  okWithClimbing: YesNo;
  okWithMischief: YesNo;

  idealTraits: string[];
};

export type MatchFormValues = HouseholdValues & AnimalValues;

export const householdDefaultValues: HouseholdValues = {
  housingType: "",
  hasYoungChildren: "",
  hasOtherAnimals: "",
  securedExterior: "",
};

export const matchDefaultValues: MatchFormValues = {
  ...householdDefaultValues,
  agePreference: "",
  ageGroup: "",
  sexPreference: "",
  sex: "",
  openToSpecificNeeds: "",
  mustGetAlongCats: "",
  mustGetAlongDogs: "",
  wantsHumanContact: "",
  okWithAttentionNeeds: "",
  prefersIndependent: "",
  wantsToHold: "",
  calmOrPlayful: "",
  okWithVeryActive: "",
  acceptsShy: "",
  okWithMeowing: "",
  okWithClimbing: "",
  okWithMischief: "",
  idealTraits: [],
};

export const yesNoOptions = [
  { value: "true", label: "Oui" },
  { value: "false", label: "Non" },
];

export const housingTypeOptions = [
  { value: "apartment", label: "Appartement" },
  { value: "house", label: "Maison" },
  { value: "other", label: "Autre" },
];

export const ageGroupOptions = [
  { value: "kitten", label: "Chaton (moins de 6 mois)" },
  { value: "young", label: "Jeune chat (6 mois à 2 ans)" },
  { value: "adult", label: "Chat adulte (2 à 10 ans)" },
  { value: "senior", label: "Chat senior (plus de 10 ans)" },
];

export const sexOptions = [
  { value: "male", label: "Mâle" },
  { value: "female", label: "Femelle" },
];

export const calmOrPlayfulOptions = [
  { value: "calm", label: "Plutôt calme" },
  { value: "playful", label: "Plutôt joueur" },
];

export function ageGroupOf(
  birthDate?: Date | string | null,
): "kitten" | "young" | "adult" | "senior" | null {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return null;

  const now = new Date();
  const months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());

  if (months < 6) return "kitten";
  if (months < 24) return "young";
  if (months < 120) return "adult";
  return "senior";
}

export const PERSONALITY_TRAIT_MAP: Record<keyof AnimalValues | string, string[]> = {
  wantsHumanContact: ["Câlin", "Affectueux", "Pot de colle", "Attachant"],
  okWithAttentionNeeds: ["Pot de colle", "Expressif", "Possessif"],
  prefersIndependent: ["Indépendant"],
  wantsToHold: ["Câlin", "Doux", "Docile"],
  okWithVeryActive: ["Énergique", "Aventureux"],
  acceptsShy: ["Timide", "Sauvage", "Sensible"],
  okWithMeowing: ["Expressif"],
  okWithClimbing: ["Aventureux", "Curieux", "Énergique"],
  okWithMischief: ["Joueur", "Curieux", "Têtu", "Impulsif"],
};

export const PERSONALITY_YESNO_KEYS = Object.keys(
  PERSONALITY_TRAIT_MAP,
) as (keyof AnimalValues)[];

export const CALM_TRAITS = ["Calme", "Patient", "Doux"];
export const PLAYFUL_TRAITS = ["Joueur", "Énergique", "Aventureux"];

export const MAX_IDEAL_TRAITS = 3;

export function deriveHouseholdFromAdopter(
  adopter: IAdopter,
): HouseholdValues {
  const hasYoungChildren =
    adopter.hasChildren === true &&
    (adopter.childrenAgeGroup === "young" || adopter.childrenAgeGroup === "both");

  const securedExterior =
    adopter.areWindowsSecuredOrWillBe === true ||
    adopter.isBalconySecured === true;

  return {
    housingType: adopter.housingType ?? "",
    hasYoungChildren: hasYoungChildren ? "true" : "false",
    hasOtherAnimals: adopter.hasOtherAnimals ? "true" : "false",
    securedExterior: securedExterior ? "true" : "false",
  };
}

export function householdSummary(
  values: HouseholdValues,
): { label: string; value: string }[] {
  const housing =
    housingTypeOptions.find((o) => o.value === values.housingType)?.label ??
    "Non renseigné";
  const yn = (v: YesNo) => (v === "true" ? "Oui" : v === "false" ? "Non" : "Non renseigné");

  return [
    { label: "Type de logement", value: housing },
    { label: "Enfant(s) en bas âge au foyer", value: yn(values.hasYoungChildren) },
    { label: "Autre(s) animal(aux) au foyer", value: yn(values.hasOtherAnimals) },
    { label: "Extérieur sécurisé", value: yn(values.securedExterior) },
  ];
}
