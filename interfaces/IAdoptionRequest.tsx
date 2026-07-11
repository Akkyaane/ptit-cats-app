import IAdopter from "./IAdopter";
import IAdoptionListing from "./IAdoptionListing";

export default interface IAdoptionRequest {
  documentId: string;
  entityStatus: "on hold" | "accepted" | "refused";
  adopter?: IAdopter | null;
  adoption_listing?: IAdoptionListing | null;
}
