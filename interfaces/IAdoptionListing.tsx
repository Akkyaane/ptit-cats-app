import IAdoptionRequest from "./IAdoptionRequest";
import IAnimal from "./IAnimal";

export default interface IAdoptionListing {
  documentId: string;
  title: string;
  slogan?: string | null;
  shortDescription: string;
  longDescription: string;
  media: {
    documentId: string;
    name: string;
    alternativeText?: string | null;
    url: string;
    mime: string;
  }[];
  isDuo: boolean;
  price: number;
  entityStatus: "adoption pending" | "adoption completed";
  animals: IAnimal[];
  adoption_requests?: IAdoptionRequest[] | null;
}
