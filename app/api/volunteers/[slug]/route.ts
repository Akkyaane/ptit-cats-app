import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { strapiFetch } from "@/helpers/strapiHelper";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    const res = await strapiFetch(`/api/volunteers/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `[volunteers/${slug}] API GET: ${res.status} - ${await res.text()}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[volunteers/${slug}] API GET: ${String(err)}` },
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
    const { lastName, firstName, email, role } = await req.json();

    if (!lastName || !firstName || !email || !role) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 },
      );
    }

    const res = await strapiFetch(`/api/volunteers/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { lastName, firstName, email, role } }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[volunteers/${slug}] API PUT: ${String(err)}` },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    const res = await strapiFetch(`/api/volunteers/${slug}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erreur lors de la suppression." },
        { status: res.status },
      );
    }

    if (req.nextUrl.searchParams.get("self") === "true") {
      const cookieStore = await cookies();
      cookieStore.delete("volunteer_id");
      cookieStore.delete("user_role");
      cookieStore.delete("jwt");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[volunteers/${slug}] API DELETE: ${String(err)}` },
      { status: 500 },
    );
  }
}
