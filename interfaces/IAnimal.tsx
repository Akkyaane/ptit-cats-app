import IAnimalRequirement from "./IAnimalRequirement";
import IAdoptionListing from "./IAdoptionListing";
import IAnimalPersonalityTrait from "./IAnimalPersonalityTrait";

export default interface IAnimal {
  documentId: string;
  name: string;
  sex: "male" | "female";
  birthDate: Date;
  isDewormed: boolean;
  isVaccinated: boolean;
  isSterilizedOrCastrated: boolean;
  isIdentified: boolean;
  dogAffinity: "yes" | "no" | "unknown";
  catAffinity: "yes" | "no" | "unknown";
  childAffinity: "yes" | "no" | "unknown";
  housingType: "apartment" | "house" | "other";
  isAtypical: boolean;
  entityStatus: "in shelter" | "in foster care" | "under medical care" | "adopted";
  animal_personality_traits?: IAnimalPersonalityTrait[] | null;
  animal_requirements?: IAnimalRequirement[] | null;
  adoption_listing: IAdoptionListing;
}