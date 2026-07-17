import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/absences?populate=volunteer&sort=startDate:desc`,
      {
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[absence] GET: ${res.status} - ${await res.text()}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: `[absence] GET: ${String(err)}` }, { status: 500 });
  }
}