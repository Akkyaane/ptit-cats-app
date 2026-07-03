import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  params: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params.params;

  try {
    const body = await req.json();

    const payload = {
      ...body,
      content:
        typeof body.content === "string"
          ? body.content
          : JSON.stringify(body.content),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/articles/${slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: payload }),
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[articles/update/${slug}] API PUT: ${res.status} - ${res.statusText} - ${await res.text()}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[articles/update/${slug}] API PUT: ${String(err)}` },
      { status: 500 },
    );
  }
}
