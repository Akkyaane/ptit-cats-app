"use server";

import IArticle from "@/interfaces/IArticle";
import { parseContent } from "@/helpers/articleHelper";

export async function getArticlesByVolunteer(
  volunteerDocumentId: string
): Promise<IArticle[]> {
  const params = new URLSearchParams();
  params.set("filters[volunteer][documentId][$eq]", volunteerDocumentId);
  params.set("populate", "volunteer");
  params.set("sort", "publicationDate:desc");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/articles?${params}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    }
  );

  if (!res.ok) return [];

  const json = await res.json();
  return (json.data ?? []).map((a: Record<string, unknown>) => ({
    ...a,
    content: parseContent(a.content),
  }));
}
