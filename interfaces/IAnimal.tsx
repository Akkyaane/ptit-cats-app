import IAnimalRequirement from "./IAnimalRequirement";
import IAdoptionListing from "./IAdoptionListing";

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
  animal_requirements: IAnimalRequirement[];
  adoption_listing: IAdoptionListing;
}