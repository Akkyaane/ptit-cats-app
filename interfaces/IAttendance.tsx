export interface IAttendance {
  id: number;
  documentId: string;
  date: string;
  status: "present" | "absent";
  reason: string | null;
  volunteer: {
    id: number;
    documentId: string;
    name: string;
    firstName: string;
    role: string;
  } | null;
}