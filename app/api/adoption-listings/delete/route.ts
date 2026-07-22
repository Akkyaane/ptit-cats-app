import { NextRequest, NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapiHelper";
import { deleteUploadedFiles } from "@/helpers/uploadHelper";

async function fetchMediaIds(documentId: string): Promise<number[]> {
  try {
    const res = await strapiFetch(
      `/api/adoption-listings/${documentId}?populate=media`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      console.error(
        `[adoption-listings/delete] lecture des médias: ${res.status} - ${await res.text()}`,
      );
      return [];
    }

    const json = await res.json();
    return (json.data?.media ?? [])
      .map((m: { id: number }) => Number(m.id))
      .filter((id: number) => Number.isFinite(id));
  } catch (err) {
    console.error(`[adoption-listings/delete] lecture des médias: ${String(err)}`);
    return [];
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { documentId } = await req.json();

    if (!documentId) {
      return NextResponse.json(
        { error: "[adoption-listings/delete] missing documentId" },
        { status: 400 },
      );
    }

    const mediaIds = await fetchMediaIds(documentId);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-listings/${documentId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        {
          error: `[adoption-listings/delete] API DELETE: ${res.status} - ${res.statusText} - ${await res.text()}`,
        },
        { status: res.status },
      );
    }

    const failedMediaIds = await deleteUploadedFiles(mediaIds);

    return NextResponse.json(
      { success: true, deletedMedia: mediaIds.length - failedMediaIds.length, failedMediaIds },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: `[adoption-listings/delete] API DELETE: ${String(err)}` },
      { status: 500 },
    );
  }
}
