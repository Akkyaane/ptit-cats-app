import IVolunteer from "./IVolunteer";

export default interface IAbsence {
  documentId: string;
  startDate: Date;
  endDate: Date;
  volunteer: IVolunteer;
}