import IAdopter from "./IAdopter";
import IAdoptionListing from "./IAdoptionListing";

export type AdoptionRequestStatus =
  | "to be processed"
  | "pending"
  | "refused"
  | "done";

export interface IAdoptionRequestVolunteer {
  documentId: string;
  firstName: string;
  lastName: string;
  role: "admin" | "manager" | "referent";
}

export default interface IAdoptionRequest {
  documentId: string;
  entityStatus: AdoptionRequestStatus;
  remarks?: string | null;

  transferredBy?: string | null;
  adopter?: IAdopter | null;
  adoption_listing?: IAdoptionListing | null;
  volunteer?: IAdoptionRequestVolunteer | null;
  createdAt: string;
  updatedAt?: string;
}
