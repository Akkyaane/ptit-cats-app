import IAdopter from "@/interfaces/IAdopter";

// -----------------------------------------------------------------------------
// Modèle de données du formulaire de matching (non persisté : vit uniquement le
// temps de la session côté client). Les valeurs "true"/"false" imitent le reste
// de l'app (cf. AdopterForm) pour rester homogène avec les <Select> oui/non.
// -----------------------------------------------------------------------------

export type YesNo = "" | "true" | "false";

// Étape 1 — Foyer. Seuls les champs qui pèsent réellement dans le scoring sont
// demandés (aux invités) ou dérivés (des adoptants connectés).
export type HouseholdValues = {
  housingType: "" | "apartment" | "house" | "other";
  hasYoungChildren: YesNo;
  hasOtherAnimals: YesNo;
  securedExterior: YesNo;
};

// Étapes 2 & 3 — Le chat idéal.
export type AnimalValues = {
  // Critères
  agePreference: YesNo;
  ageGroup: "" | "kitten" | "young" | "adult" | "senior";
  sexPreference: YesNo;
  sex: "" | "male" | "female";
  openToSpecificNeeds: YesNo;
  mustGetAlongCats: YesNo;
  mustGetAlongDogs: YesNo;
  // Personnalité (oui/non)
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
  // Caractère idéal (3 labels max, récupérés depuis /api/animal-personality-traits)
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

// -------------------------------- Options ------------------------------------
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

// ------------------------- Bornes des tranches d'âge -------------------------
// Renvoie la tranche d'âge d'un chat à partir de sa date de naissance.
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

// -----------------------------------------------------------------------------
// Mapping des questions de personnalité (oui/non) vers les labels de traits
// réellement présents en base (relation animal_personality_traits). Un chat
// "correspond" à une question dès qu'il porte AU MOINS un des labels associés.
// -----------------------------------------------------------------------------
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

// Les clés oui/non de personnalité prises en compte dans le scoring.
export const PERSONALITY_YESNO_KEYS = Object.keys(
  PERSONALITY_TRAIT_MAP,
) as (keyof AnimalValues)[];

export const CALM_TRAITS = ["Calme", "Patient", "Doux"];
export const PLAYFUL_TRAITS = ["Joueur", "Énergique", "Aventureux"];

export const MAX_IDEAL_TRAITS = 3;

// -----------------------------------------------------------------------------
// Pré-remplissage depuis un profil adoptant connecté.
// NB : le schéma adopter ne distingue pas "chat" et "chien" parmi les autres
// animaux (hasOtherAnimals booléen + texte libre). Le besoin "Foyer avec un
// chat" s'appuie donc sur hasOtherAnimals de façon approximative ; l'entente
// fine chats/chiens reste demandée explicitement à l'étape 2.
// -----------------------------------------------------------------------------
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

// Libellés lisibles pour le récapitulatif "lecture seule" (adoptant connecté).
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
