import { NextRequest, NextResponse } from "next/server";
import { getVolunteerSessionFromRequest } from "@/helpers/sessionHelper";
import { checkAbsenceAccess } from "@/helpers/absenceHelper";

export async function PUT(req: NextRequest) {
  try {
    const session = getVolunteerSessionFromRequest(req);

    if (!session) {
      return NextResponse.json(
        { error: "[absence] PUT: non autorisé" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { documentId, volunteer, ...rest } = body;

    if (!documentId) {
      return NextResponse.json({ error: "documentId requis" }, { status: 400 });
    }

    const access = await checkAbsenceAccess(session, documentId);
    if (!access.ok) {
      return NextResponse.json(
        { error: `[absence] PUT: ${access.error}` },
        { status: access.status }
      );
    }

    const payload =
      session.role === "admin" && volunteer ? { ...rest, volunteer } : rest;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/absences/${documentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: payload }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[absence] PUT: ${res.status} - ${await res.text()}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: `[absence] PUT: ${String(err)}` }, { status: 500 });
  }
}
