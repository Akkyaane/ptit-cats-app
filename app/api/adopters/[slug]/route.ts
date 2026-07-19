import { NextRequest, NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapi";
import { buildAdopterPayload } from "@/helpers/adopterPayload";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    const res = await strapiFetch(`/api/adopters/${slug}`, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: `[adopters/${slug}] API GET: ${res.status} - ${await res.text()}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[adopters/${slug}] API GET: ${String(err)}` },
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
    const formData = await req.formData();
    const payload = buildAdopterPayload(formData, { includePassword: false });

    if (!("data" in payload)) {
      return NextResponse.json(
        {
          error:
            "error" in payload && payload.error
              ? payload.error
              : "Formulaire invalide.",
        },
        { status: 400 },
      );
    }

    const updateData: Record<string, unknown> = { ...payload.data };

    const currentRes = await strapiFetch(`/api/adopters/${slug}`, {
      cache: "no-store",
    });
    if (currentRes.ok) {
      const currentJson = await currentRes.json();
      const currentEmail: string | undefined = currentJson?.data?.email;
      if (
        typeof currentEmail === "string" &&
        typeof updateData.email === "string" &&
        currentEmail.trim().toLowerCase() === updateData.email.trim().toLowerCase()
      ) {
        delete updateData.email;
      }
    }

    const res = await strapiFetch(`/api/adopters/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: updateData }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Strapi update adopter error:", errorBody);
      try {
        const parsed = JSON.parse(errorBody);
        return NextResponse.json(
          {
            error:
              parsed?.error?.message ||
              parsed?.message ||
              "Erreur lors de la mise à jour.",
          },
          { status: res.status },
        );
      } catch {
        return NextResponse.json(
          { error: "Erreur lors de la mise à jour." },
          { status: res.status },
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[adopters/${slug}] API PUT: ${String(err)}` },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    let linkedUserId: number | string | null = null;
    const current = await strapiFetch(
      `/api/adopters/${slug}?populate=users_permissions_user`,
      { cache: "no-store" },
    );
    if (current.ok) {
      const json = await current.json();
      linkedUserId = json?.data?.users_permissions_user?.id ?? null;
    }

    const res = await strapiFetch(`/api/adopters/${slug}`, { method: "DELETE" });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Erreur lors de la suppression de l'adoptant." },
        { status: res.status },
      );
    }

    if (linkedUserId != null) {
      const userRes = await strapiFetch(`/api/users/${linkedUserId}`, {
        method: "DELETE",
      });
      if (!userRes.ok) {
        console.error(
          `[adopters/${slug}] DELETE user ${linkedUserId}: ${userRes.status}`,
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[adopters/${slug}] API DELETE: ${String(err)}` },
      { status: 500 },
    );
  }
}
