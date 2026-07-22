import { NextRequest, NextResponse } from "next/server";
import { getVolunteerSessionFromRequest } from "@/helpers/sessionHelper";

export async function POST(req: NextRequest) {
  try {
    const session = getVolunteerSessionFromRequest(req);

    if (!session) {
      return NextResponse.json(
        { error: "[absence] POST: non autorisé" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const payload = {
      ...body,
      volunteer:
        session.role === "admin"
          ? (body.volunteer ?? session.documentId)
          : session.documentId,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/absences`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: payload }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[absence] POST: ${res.status} - ${await res.text()}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: `[absence] POST: ${String(err)}` }, { status: 500 });
  }
}
