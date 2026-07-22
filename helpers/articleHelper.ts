import { PartialBlock } from "@blocknote/core";
import IVolunteer from "@/interfaces/IVolunteer";


export function formatAuthor(
  volunteer: IVolunteer | null | undefined,
): string | null {
  if (!volunteer?.firstName) return null;
  const initial = volunteer.lastName?.trim().charAt(0).toUpperCase();
  return initial ? `${volunteer.firstName} ${initial}.` : volunteer.firstName;
}

export const CATEGORY_OPTIONS = [
  { key: "news", value: "news" },
  { key: "community", value: "community" },
  { key: "inspiringStories", value: "inspiringStories" },
  { key: "goodToKnow", value: "goodToKnow" },
  { key: "events", value: "events" },
  { key: "quizzes", value: "quizzes" },
  { key: "everydayLife", value: "everydayLife" },
  { key: "PeopleAndStories", value: "PeopleAndStories" },
  { key: "health", value: "health" },
  { key: "shopping", value: "shopping" },
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  news: "Actualités",
  community: "Associatif",
  inspiringStories: "Belles histoires",
  goodToKnow: "Bon à savoir",
  events: "Événements",
  quizzes: "Quiz",
  everydayLife: "Vie quotidienne",
  PeopleAndStories: "Rencontres",
  health: "Santé",
  shopping: "Shopping",
};

type InlineContent = { type: string; text?: string };

// Le `content` d'un PartialBlock peut être une chaîne, un tableau d'inline
// content, un objet (table) ou undefined : on ramène tout à du texte brut.
function extractText(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return (content as InlineContent[])
    .filter((c) => c?.type === "text")
    .map((c) => c.text ?? "")
    .join("");
}

export function extractTitle(blocks: PartialBlock[]): string {
  const heading = blocks.find((b) => b.type === "heading");
  return extractText(heading?.content).trim() || "Sans titre";
}

export function extractDescription(blocks: PartialBlock[]): string {
  const para = blocks.find(
    (b) => b.type === "paragraph" && extractText(b.content).trim().length > 0,
  );
  return extractText(para?.content);
}

export function extractImageUrl(blocks: PartialBlock[]): string | undefined {
  const img = blocks.find((b) => b.type === "image");
  if (!img) return undefined;
  return (img as unknown as { props: { url?: string } }).props?.url;
}

export function parseContent(raw: unknown): PartialBlock[] {
  if (!raw) return [];
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return raw as PartialBlock[];
}
