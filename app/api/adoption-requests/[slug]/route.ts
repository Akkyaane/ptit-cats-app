import { NextRequest, NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapi";
import IAdoptionRequest from "@/interfaces/IAdoptionRequest";

async function getById(documentId: string): Promise<IAdoptionRequest | null> {
  const p = new URLSearchParams();
  p.set("populate[adopter]", "true");
  p.set("populate[adoption_listing][populate]", "*");
  p.set("populate[volunteer]", "true");

  const res = await strapiFetch(`/api/adoption-requests/${documentId}?${p}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()).data ?? null;
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    const data = await getById(slug);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[adoption-requests/${slug}] GET: ${String(err)}` },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    const { status, remarks } = await req.json();
    const data: Record<string, unknown> = { entityStatus: status };
    if (remarks !== undefined) data.remarks = remarks;

    const res = await strapiFetch(`/api/adoption-requests/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Échec de la mise à jour de la demande." },
        { status: res.status },
      );
    }

    if (status === "done") {
      const full = await getById(slug);
      const listingId = full?.adoption_listing?.documentId;
      if (listingId) {
        await strapiFetch(`/api/adoption-listings/${listingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: { entityStatus: "adoption completed" } }),
        });
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[adoption-requests/${slug}] PUT: ${String(err)}` },
      { status: 500 },
    );
  }
}
