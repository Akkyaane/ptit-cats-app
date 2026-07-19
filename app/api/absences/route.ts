import { NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapi";

export async function GET() {
  try {
    const res = await strapiFetch(
      `/api/absences?populate=volunteer&sort=startDate:desc&pagination[pageSize]=1000`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[absence] GET: ${res.status} - ${await res.text()}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: `[absence] GET: ${String(err)}` }, { status: 500 });
  }
}
