import { NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapi";

export async function GET() {
  try {
    const res = await strapiFetch(`/api/volunteers`, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: `[volunteers] API GET: ${res.status} - ${res.statusText} - ${await res.text()}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[volunteers] API GET: ${String(err)}` },
      { status: 500 },
    );
  }
}
