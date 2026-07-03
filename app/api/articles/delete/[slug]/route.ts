import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  params: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params.params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/articles/${slug}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[articles/delete/${slug}] API DELETE: ${res.status} - ${res.statusText} - ${await res.text()}` },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[articles/delete/${slug}] API DELETE: ${String(err)}` },
      { status: 500 },
    );
  }
}
