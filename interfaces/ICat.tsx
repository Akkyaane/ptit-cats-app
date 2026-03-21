export interface ICat {
  id: number;
  name: string;
  sex: "Male" | "Female";
  birthDate?: string;
  isDewormed: boolean;
  isVaccinated: boolean;
  isSterilizedOrCastrated: boolean;
  isIdentified: boolean;
  dogAffinity: "Yes" | "No" | "Unknown";
  catAffinity: "Yes" | "No" | "Unknown";
  childAffinity: "Yes" | "No" | "Unknown";
  livingEnvironmentType: "Apartment" | "House" | "Other";
  keyPoints: string[];
}
