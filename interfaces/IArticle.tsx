import { PartialBlock } from "@blocknote/core";
import IVolunteer from "./IVolunteer";

export default interface IArticle {
  documentId: string;
  publicationDate: Date;
  category: "news" | "community" | "inspiringStories" | "goodToKnow" | "events" | "quizzes" | "everydayLife" | "PeopleAndStories" | "health" | "shopping";
  content: PartialBlock[];
  volunteer: IVolunteer;
}