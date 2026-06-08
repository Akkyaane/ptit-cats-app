import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { documentId } = await req.json();

    if (!documentId) {
      return NextResponse.json(
        { error: "[animals/delete] missing documentId" },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/animals/${documentId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        {
          error: `[animals/delete] API DELETE: ${res.status} - ${res.statusText} - ${await res.text()}`,
        },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[animals/delete] API DELETE: ${String(err)}` },
      { status: 500 },
    );
  }
}
