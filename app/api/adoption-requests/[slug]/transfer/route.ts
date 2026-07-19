import { NextRequest, NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapiHelper";
import {
  getVolunteersWithLoad,
  pickAssignee,
} from "@/helpers/requestDistributionHelper";

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    const { managerDocumentId } = await req.json();

    const referentId = pickAssignee(await getVolunteersWithLoad("referent"));
    if (!referentId) {
      return NextResponse.json(
        { error: "Aucun référent disponible pour le transfert." },
        { status: 409 },
      );
    }

    const res = await strapiFetch(`/api/adoption-requests/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          volunteer: { set: [{ documentId: referentId }] },
          transferredBy: managerDocumentId,
          entityStatus: "to be processed",
        },
      }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Échec du transfert." },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[adoption-requests/${slug}/transfer] PUT: ${String(err)}` },
      { status: 500 },
    );
  }
}
