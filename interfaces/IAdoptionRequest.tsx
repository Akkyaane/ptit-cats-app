import IAdoptionListing from "./IAdoptionListing";

export interface IAdoptionRequest {
  documentId: string;
  status: "en_attente" | "acceptée" | "refusée";
  createdAt: string;
  adoptionListing: IAdoptionListing;
}
