import { NextRequest, NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapi";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    const res = await strapiFetch(
      `/api/absences/${slug}?populate=volunteer`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[absence/${slug}] GET: ${res.status} - ${await res.text()}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[absence/${slug}] GET: ${String(err)}` },
      { status: 500 },
    );
  }
}
