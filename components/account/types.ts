import IAdopter from "@/interfaces/IAdopter";

export type AccountVolunteer = {
  id: number;
  documentId: string;
  lastName: string;
  firstName: string;
  email: string;
  role: "admin" | "manager" | "referent";
};

export type AccountUser =
  | { kind: "adopter"; adopter: IAdopter }
  | { kind: "volunteer"; volunteer: AccountVolunteer };
