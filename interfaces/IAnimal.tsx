import IAnimalRequirement from "./IAnimalRequirement";
import IAdoptionListing from "./IAdoptionListing";
import IAnimalPersonalityTrait from "./IAnimalPersonalityTrait";

export default interface IAnimal {
  documentId: string;
  name: string;
  sex: "male" | "female";
  birthDate?: string;
  isDewormed: boolean;
  isVaccinated: boolean;
  isSterilizedOrCastrated: boolean;
  isIdentified: boolean;
  dogAffinity: "yes" | "no" | "unknown";
  catAffinity: "yes" | "no" | "unknown";
  childAffinity: "yes" | "no" | "unknown";
  livingEnvironmentType: "apartment" | "house" | "other";
  isAtypical: boolean;
  animal_personality_traits?: IAnimalPersonalityTrait[];
  animal_requirements?: IAnimalRequirement[];
  adoption_listing: IAdoptionListing;
  entityStatus: "in shelter" | "in foster care" | "under medical care" | "adopted";
}