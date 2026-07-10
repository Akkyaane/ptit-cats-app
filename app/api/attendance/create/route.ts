import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/attendances`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: body }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[attendance] POST: ${res.status} - ${await res.text()}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: `[attendance] POST: ${String(err)}` }, { status: 500 });
  }
}