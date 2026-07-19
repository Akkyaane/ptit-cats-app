import { NextRequest, NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapi";
import { parseContent } from "@/helpers/articleHelper";

export async function GET(req: NextRequest) {
  try {
    const volunteer = req.nextUrl.searchParams.get("volunteer");

    const params = new URLSearchParams();
    params.set("sort", "publicationDate:desc");
    if (volunteer) {
      params.set("filters[volunteer][documentId][$eq]", volunteer);
      params.set("populate", "volunteer");
    }

    const res = await strapiFetch(`/api/articles?${params}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `[articles] API GET: ${res.status} - ${res.statusText} - ${await res.text()}` },
        { status: res.status },
      );
    }

    const data = await res.json();

    const articles = (data.data ?? []).map((article: Record<string, unknown>) => ({
      ...article,
      content: parseContent(article.content),
    }));

    return NextResponse.json({ success: true, data: articles }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[articles] API GET: ${String(err)}` },
      { status: 500 },
    );
  }
}
