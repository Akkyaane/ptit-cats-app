import IAbsence from "./IAbsence";
import IArticle from "./IArticle";

export default interface IVolunteer {
  id: number;
  documentId: string;
  lastName: string;
  firstName: string;
  email: string;
  role: "admin" | "manager" | "referent";
  absences?: IAbsence[];
  articles?: IArticle[];
  users_permissions_user?: {
    id: number | string;
    documentId: string;
  } | null;
}
