import { NextRequest, NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapiHelper";
import {
  getVolunteersWithLoad,
  pickAssignee,
} from "@/helpers/requestDistributionHelper";
import IAdoptionRequest from "@/interfaces/IAdoptionRequest";

async function fetchList(query: string): Promise<IAdoptionRequest[]> {
  const res = await strapiFetch(`/api/adoption-requests?${query}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return (await res.json()).data ?? [];
}

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const adopter = sp.get("adopter");
    const volunteer = sp.get("volunteer");
    const forVolunteer = sp.get("forVolunteer");
    const listing = sp.get("listing");

    if (listing) {
      const p = new URLSearchParams();
      p.set("filters[adoption_listing][documentId][$eq]", listing);
      p.set("fields[0]", "entityStatus");
      p.set("pagination[pageSize]", "100");
      return NextResponse.json(
        { success: true, data: await fetchList(p.toString()) },
        { status: 200 },
      );
    }

    if (adopter) {
      const p = new URLSearchParams();
      p.set("filters[adopter][documentId][$eq]", adopter);
      p.set("populate[adopter]", "true");
      p.set("populate[adoption_listing][populate]", "*");
      return NextResponse.json(
        { success: true, data: await fetchList(p.toString()) },
        { status: 200 },
      );
    }

    if (volunteer) {
      const p = new URLSearchParams();
      p.set("filters[volunteer][documentId][$eq]", volunteer);
      p.set("populate", "*");
      p.set("sort", "createdAt:desc");
      return NextResponse.json(
        { success: true, data: await fetchList(p.toString()) },
        { status: 200 },
      );
    }

    if (forVolunteer) {
      const build = (key: string, value: string) => {
        const p = new URLSearchParams();
        p.set(key, value);
        p.set("populate", "*");
        p.set("sort", "createdAt:desc");
        return p.toString();
      };
      const [assigned, transferred] = await Promise.all([
        fetchList(build("filters[volunteer][documentId][$eq]", forVolunteer)),
        fetchList(build("filters[transferredBy][$eq]", forVolunteer)),
      ]);
      const map = new Map<string, IAdoptionRequest>();
      [...assigned, ...transferred].forEach((r) => map.set(r.documentId, r));
      const data = [...map.values()].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      return NextResponse.json({ success: true, data }, { status: 200 });
    }

    return NextResponse.json(
      { error: "[adoption-requests] GET: filtre requis" },
      { status: 400 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: `[adoption-requests] GET: ${String(err)}` },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { adopterDocumentId, listingDocumentId } = await req.json();

    if (!adopterDocumentId || !listingDocumentId) {
      return NextResponse.json(
        { error: "Paramètres manquants." },
        { status: 400 },
      );
    }

    const p = new URLSearchParams();
    p.set("filters[adopter][documentId][$eq]", adopterDocumentId);
    p.set("populate[adoption_listing][populate]", "*");
    const existing = await fetchList(p.toString());
    if (
      existing.some(
        (r) => r.adoption_listing?.documentId === listingDocumentId,
      )
    ) {
      return NextResponse.json(
        { error: "Vous avez déjà soumis une demande pour ce chat." },
        { status: 409 },
      );
    }

    const assigneeDocumentId = pickAssignee(
      await getVolunteersWithLoad("manager"),
    );

    const res = await strapiFetch(`/api/adoption-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          adopter: { connect: [{ documentId: adopterDocumentId }] },
          adoption_listing: { connect: [{ documentId: listingDocumentId }] },
          entityStatus: "to be processed",
          ...(assigneeDocumentId
            ? { volunteer: { connect: [{ documentId: assigneeDocumentId }] } }
            : {}),
        },
      }),
    });

    if (!res.ok) {
      const responseBody = await res.json().catch(() => null);
      console.error("Strapi create adoption-request error:", responseBody);
      return NextResponse.json(
        { error: "Erreur lors de la création de la demande. Veuillez réessayer." },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: `[adoption-requests] POST: ${String(err)}` },
      { status: 500 },
    );
  }
}
