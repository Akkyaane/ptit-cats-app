import { ICat } from "@/interfaces/ICat";

export interface IAdoptionPost {
  id: number;
  title: string;
  slogan?: string;
  shortDescription?: string;
  longDescription: string;
  photos: Array<any>;
  isDuo: boolean;
  price: number;
  cats: ICat[];
  showDetails: boolean;
}