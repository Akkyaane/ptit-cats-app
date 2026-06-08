import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: formData,
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        {
          error: `[upload] API POST: ${res.status} - ${res.statusText} - ${await res.text()}`,
        },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[upload] API POST: ${String(err)}` },
      { status: 500 },
    );
  }
}
