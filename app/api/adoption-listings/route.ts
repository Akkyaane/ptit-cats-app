import { NextRequest, NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapiHelper";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const status = sp.get("status");
    const deep = sp.get("deep") === "true";

    const params = new URLSearchParams();
    params.set("sort", "createdAt:desc");
    if (deep) {
      params.set("populate[media]", "true");
      params.set("populate[animals][populate]", "*");
      params.set("pagination[pageSize]", "100");
    } else {
      params.set("populate", "*");
    }
    if (status) {
      params.set("filters[entityStatus][$eq]", status);
    }

    const res = await strapiFetch(`/api/adoption-listings?${params}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `[adoption-listings] API GET: ${res.status} - ${res.statusText} - ${await res.text()}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[adoption-listings] API GET: ${String(err)}` },
      { status: 500 },
    );
  }
}
