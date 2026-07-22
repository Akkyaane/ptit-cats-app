import { NextRequest, NextResponse } from "next/server";
import { getVolunteerSessionFromRequest } from "@/helpers/sessionHelper";
import { checkAbsenceAccess } from "@/helpers/absenceHelper";

export async function DELETE(req: NextRequest) {
  try {
    const session = getVolunteerSessionFromRequest(req);

    if (!session) {
      return NextResponse.json(
        { error: "[absence] DELETE: non autorisé" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { documentId } = body;

    if (!documentId) {
      return NextResponse.json({ error: "documentId requis" }, { status: 400 });
    }

    const access = await checkAbsenceAccess(session, documentId);
    if (!access.ok) {
      return NextResponse.json(
        { error: `[absence] DELETE: ${access.error}` },
        { status: access.status }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/absences/${documentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `[absence] DELETE: ${res.status} - ${await res.text()}` },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[absence] DELETE: ${String(err)}` },
      { status: 500 }
    );
  }
}
