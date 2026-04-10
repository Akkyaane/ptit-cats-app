export interface IAdoptant {
  id: number;
  documentId: string;
  name: string;
  firstName: string;
  email: string;
  housingType: "maison" | "appartement" | null;
  hasGarden: boolean | null;
}
