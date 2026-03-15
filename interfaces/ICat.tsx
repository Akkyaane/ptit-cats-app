export interface ICat {
  id: number;
  name: string;
  sex: "Male" | "Female";
  birthDate?: string;
  isDewormed: boolean;
  isVaccinated: boolean;
  isSterilizedOrCastrated: boolean;
  isIdentified: boolean;
  isDogFriendly?: boolean;
  isCatFriendly?: boolean;
  isChildFriendly?: boolean;
  livingEnvironmentType: "Apartment" | "House" | "Other";
  keyPoints: string[];
}
