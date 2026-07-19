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
} from "@/helpers/matchmakerHelper";

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
  percentage: number;
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

function scoreAnimal(
  values: MatchFormValues,
  animal: IAnimal,
): { score: number; maxScore: number } {
  const traits = traitLabels(animal);
  const requirements = requirementLabels(animal);
  let score = 0;
  let maxScore = 0;

  if (values.agePreference === "true" && values.ageGroup) {
    maxScore += WEIGHTS.age;
    if (ageGroupOf(animal.birthDate) === values.ageGroup) score += WEIGHTS.age;
  }

  if (values.sexPreference === "true" && values.sex) {
    maxScore += WEIGHTS.sex;
    if (animal.sex === values.sex) score += WEIGHTS.sex;
  }

  if (values.mustGetAlongCats === "true") {
    maxScore += WEIGHTS.affinityCats;
    if (animal.catAffinity === "yes") score += WEIGHTS.affinityCats;
    else if (animal.catAffinity === "no") score += WEIGHTS.affinityCatsConflict;
  }

  if (values.mustGetAlongDogs === "true") {
    maxScore += WEIGHTS.affinityDogs;
    if (animal.dogAffinity === "yes") score += WEIGHTS.affinityDogs;
    else if (animal.dogAffinity === "no") score += WEIGHTS.affinityDogsConflict;
  }

  if (values.openToSpecificNeeds === "true") {
    maxScore += WEIGHTS.specificNeedsOpen;
    if (animal.isAtypical) score += WEIGHTS.specificNeedsOpen;
  } else if (values.openToSpecificNeeds === "false" && animal.isAtypical) {
    score += WEIGHTS.specificNeedsConflict;
  }

  for (const key of PERSONALITY_YESNO_KEYS) {
    if (values[key] === "true") {
      maxScore += WEIGHTS.personality;
      if (hasAny(traits, PERSONALITY_TRAIT_MAP[key])) score += WEIGHTS.personality;
    }
  }

  if (values.calmOrPlayful) {
    maxScore += WEIGHTS.calmOrPlayful;
    const target = values.calmOrPlayful === "calm" ? CALM_TRAITS : PLAYFUL_TRAITS;
    if (hasAny(traits, target)) score += WEIGHTS.calmOrPlayful;
  }

  const idealTraits = values.idealTraits.slice(0, MAX_IDEAL_TRAITS);
  if (idealTraits.length > 0) {
    maxScore += idealTraits.length * WEIGHTS.idealTrait;
    for (const label of idealTraits) {
      if (traits.has(label)) score += WEIGHTS.idealTrait;
    }
  }

  if (values.housingType) {
    maxScore += WEIGHTS.housing;
    if (animal.housingType === values.housingType || animal.housingType === "other") {
      score += WEIGHTS.housing;
    }
  }

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

  if (values.hasYoungChildren === "true" && animal.childAffinity === "no") {
    score += WEIGHTS.childrenConflict;
  }

  return { score, maxScore };
}

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
