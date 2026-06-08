import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { documentId, ...body } = await req.json();

    if (!documentId) {
      return NextResponse.json(
        { error: "[adoption-listings/update] missing documentId" },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-listings/${documentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: body }),
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        {
          error: `[adoption-listings/update] API PUT: ${res.status} - ${res.statusText} - ${await res.text()}`,
        },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[adoption-listings/update] API PUT: ${String(err)}` },
      { status: 500 },
    );
  }
}
