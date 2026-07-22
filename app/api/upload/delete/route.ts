import { NextRequest, NextResponse } from "next/server";
import { getVolunteerSessionFromRequest } from "@/helpers/sessionHelper";
import { deleteUploadedFiles } from "@/helpers/uploadHelper";

const ALLOWED_ROLES = ["admin", "manager"];

export async function DELETE(req: NextRequest) {
  try {
    const session = getVolunteerSessionFromRequest(req);

    if (!session || !ALLOWED_ROLES.includes(session.role)) {
      return NextResponse.json(
        { error: "[upload/delete] non autorisé" },
        { status: session ? 403 : 401 },
      );
    }

    const { fileIds } = await req.json();

    if (!Array.isArray(fileIds)) {
      return NextResponse.json(
        { error: "[upload/delete] fileIds requis" },
        { status: 400 },
      );
    }

    const failed = await deleteUploadedFiles(fileIds);

    return NextResponse.json(
      { success: failed.length === 0, deleted: fileIds.length - failed.length, failed },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: `[upload/delete] API DELETE: ${String(err)}` },
      { status: 500 },
    );
  }
}
