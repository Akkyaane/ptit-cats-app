import { NextResponse } from "next/server";

export async function GET(request: Request, params: any) {
  const param = await params.params;
  const documentId = param.slug;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/adoption-listings/${documentId}?populate[animals][populate]=*&populate=media`,
      {
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        {
          error: `[adoption-listings/${documentId}] API GET: ${res.status} - ${res.statusText} - ${await res.text()}`,
        },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(
      { success: true, data: data.data },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: `[adoption-listings/${documentId}] API GET: ${String(err)}` },
      { status: 500 },
    );
  }
}
