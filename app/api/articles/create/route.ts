import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Auteur = bénévole connecté (cookie volunteer_id = documentId côté Strapi).
    // Lu côté serveur pour ne pas dépendre du client.
    const volunteerId = req.cookies.get("volunteer_id")?.value;

    const payload = {
      ...body,
      content:
        typeof body.content === "string"
          ? body.content
          : JSON.stringify(body.content),
      publicationDate: body.publicationDate ?? new Date().toISOString(),
      ...(volunteerId ? { volunteer: volunteerId } : {}),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/articles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: payload }),
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[articles/create] API POST: ${res.status} - ${res.statusText} - ${await res.text()}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[articles/create] API POST: ${String(err)}` },
      { status: 500 },
    );
  }
}
