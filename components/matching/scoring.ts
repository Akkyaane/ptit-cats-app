import IAdoptionListing from "@/interfaces/IAdoptionListing";
import IAnimal from "@/interfaces/IAnimal";
import {
  MatchFormValues,
  PERSONALITY_TRAIT_MAP,
  PERSONALITY_YESNO_KEYS,
  CALM_TRAITS,
  PLAYFUL_TRAITS,
  MAX_IDEAL_TRAITS,
  ageGroupOf,
} from "./MatchmakerForm";

// -----------------------------------------------------------------------------
// Table de scoring — centralisée ici pour un réglage facile des pondérations.
// Un point (ou plus) est attribué au chat pour chaque critère satisfait ; des
// pénalités écartent les chats incompatibles sans jamais les exclure totalement
// (il y a toujours un podium tant qu'il existe des chats).
// -----------------------------------------------------------------------------
export const WEIGHTS = {
  age: 3,
  sex: 2,
  affinityCats: 3,
  affinityCatsConflict: -5,
  affinityDogs: 3,
  affinityDogsConflict: -5,
  specificNeedsOpen: 2,
  specificNeedsConflict: -3,
  personality: 1,
  calmOrPlayful: 2,
  idealTrait: 2,
  housing: 1,
  childrenConflict: -5,
  requirementUnmet: -5,
} as const;

export type ScoredMatch = {
  listing: IAdoptionListing;
  animal: IAnimal;
  score: number;
  maxScore: number;
  percentage: number; // 0..100, adéquation aux critères exprimés
};

function traitLabels(animal: IAnimal): Set<string> {
  return new Set((animal.animal_personality_traits ?? []).map((t) => t.label));
}

function requirementLabels(animal: IAnimal): Set<string> {
  return new Set((animal.animal_requirements ?? []).map((r) => r.label));
}

function hasAny(traits: Set<string>, labels: string[]): boolean {
  return labels.some((label) => traits.has(label));
}

// Score d'UN chat. Renvoie le score obtenu et le score maximum atteignable
// compte tenu des seuls critères exprimés par l'utilisateur (pour le %).
function scoreAnimal(
  values: MatchFormValues,
  animal: IAnimal,
): { score: number; maxScore: number } {
  const traits = traitLabels(animal);
  const requirements = requirementLabels(animal);
  let score = 0;
  let maxScore = 0;

  // --- Âge ---
  if (values.agePreference === "true" && values.ageGroup) {
    maxScore += WEIGHTS.age;
    if (ageGroupOf(animal.birthDate) === values.ageGroup) score += WEIGHTS.age;
  }

  // --- Sexe ---
  if (values.sexPreference === "true" && values.sex) {
    maxScore += WEIGHTS.sex;
    if (animal.sex === values.sex) score += WEIGHTS.sex;
  }

  // --- Entente avec les chats (si jugée indispensable) ---
  if (values.mustGetAlongCats === "true") {
    maxScore += WEIGHTS.affinityCats;
    if (animal.catAffinity === "yes") score += WEIGHTS.affinityCats;
    else if (animal.catAffinity === "no") score += WEIGHTS.affinityCatsConflict;
  }

  // --- Entente avec les chiens (si jugée indispensable) ---
  if (values.mustGetAlongDogs === "true") {
    maxScore += WEIGHTS.affinityDogs;
    if (animal.dogAffinity === "yes") score += WEIGHTS.affinityDogs;
    else if (animal.dogAffinity === "no") score += WEIGHTS.affinityDogsConflict;
  }

  // --- Besoins spécifiques (chat atypique) ---
  if (values.openToSpecificNeeds === "true") {
    maxScore += WEIGHTS.specificNeedsOpen;
    if (animal.isAtypical) score += WEIGHTS.specificNeedsOpen;
  } else if (values.openToSpecificNeeds === "false" && animal.isAtypical) {
    score += WEIGHTS.specificNeedsConflict;
  }

  // --- Personnalité oui/non ---
  for (const key of PERSONALITY_YESNO_KEYS) {
    if (values[key] === "true") {
      maxScore += WEIGHTS.personality;
      if (hasAny(traits, PERSONALITY_TRAIT_MAP[key])) score += WEIGHTS.personality;
    }
  }

  // --- Calme ou joueur ---
  if (values.calmOrPlayful) {
    maxScore += WEIGHTS.calmOrPlayful;
    const target = values.calmOrPlayful === "calm" ? CALM_TRAITS : PLAYFUL_TRAITS;
    if (hasAny(traits, target)) score += WEIGHTS.calmOrPlayful;
  }

  // --- Caractère idéal (labels exacts, 3 max) ---
  const idealTraits = values.idealTraits.slice(0, MAX_IDEAL_TRAITS);
  if (idealTraits.length > 0) {
    maxScore += idealTraits.length * WEIGHTS.idealTrait;
    for (const label of idealTraits) {
      if (traits.has(label)) score += WEIGHTS.idealTrait;
    }
  }

  // --- Logement ---
  if (values.housingType) {
    maxScore += WEIGHTS.housing;
    if (animal.housingType === values.housingType || animal.housingType === "other") {
      score += WEIGHTS.housing;
    }
  }

  // --- Besoins du chat vs foyer (pénalités seules, hors maxScore) ---
  if (requirements.has("Extérieur sécurisé") && values.securedExterior === "false") {
    score += WEIGHTS.requirementUnmet;
  }
  if (
    requirements.has("Foyer sans enfant en bas âge") &&
    values.hasYoungChildren === "true"
  ) {
    score += WEIGHTS.requirementUnmet;
  }
  if (requirements.has("Foyer avec un chat") && values.hasOtherAnimals === "false") {
    score += WEIGHTS.requirementUnmet;
  }

  // --- Enfants en bas âge vs affinité enfants du chat ---
  if (values.hasYoungChildren === "true" && animal.childAffinity === "no") {
    score += WEIGHTS.childrenConflict;
  }

  return { score, maxScore };
}

// -----------------------------------------------------------------------------
// Score les annonces "adoption pending". Un chat gagnant appartient à une
// annonce : on retient le meilleur chat de chaque annonce (évite d'afficher
// deux fois la même card pour un duo), puis on renvoie le Top N trié.
// -----------------------------------------------------------------------------
export function scoreListings(
  values: MatchFormValues,
  listings: IAdoptionListing[],
  topN = 3,
): ScoredMatch[] {
  const results: ScoredMatch[] = [];

  for (const listing of listings) {
    const animals = listing.animals ?? [];
    let best: ScoredMatch | null = null;

    for (const animal of animals) {
      const { score, maxScore } = scoreAnimal(values, animal);
      const percentage =
        maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * 100)) : 0;

      if (!best || score > best.score) {
        best = { listing, animal, score, maxScore, percentage };
      }
    }

    if (best) results.push(best);
  }

  results.sort((a, b) => b.score - a.score || b.percentage - a.percentage);

  return results.slice(0, topN);
}
