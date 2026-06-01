import IAnimal from "./IAnimal";

export default interface IAdoptionListing {
  documentId: string;
  title: string;
  slogan?: string;
  shortDescription: string;
  longDescription: string;
  media: {
    id: string;
    documentId: string;
    url: string;
  }[];
  isDuo: boolean;
  price: number;
  animals: IAnimal[];
}
