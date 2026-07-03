import { PartialBlock } from "@blocknote/core";

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

export function extractTitle(blocks: PartialBlock[]): string {
  const heading = blocks.find((b) => b.type === "heading");
  if (!heading?.content) return "Sans titre";
  return (
    (heading.content as InlineContent[])
      .filter((c) => c.type === "text")
      .map((c) => c.text ?? "")
      .join("") || "Sans titre"
  );
}

export function extractDescription(blocks: PartialBlock[]): string {
  const para = blocks.find((b) => b.type === "paragraph");
  if (!para?.content) return "";
  return (para.content as InlineContent[])
    .filter((c) => c.type === "text")
    .map((c) => c.text ?? "")
    .join("")
    .slice(0, 160);
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
