import { NextResponse } from "next/server";

function parseContent(raw: unknown): unknown {
  if (!raw) return [];
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return raw;
}

export async function GET(
  _request: Request,
  params: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params.params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/articles/${slug}`,
      {
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[articles/${slug}] API GET: ${res.status} - ${res.statusText} - ${await res.text()}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    const article = {
      ...data.data,
      content: parseContent(data.data?.content),
    };

    return NextResponse.json({ success: true, data: article }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[articles/${slug}] API GET: ${String(err)}` },
      { status: 500 },
    );
  }
}
