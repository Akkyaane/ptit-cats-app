import { NextRequest, NextResponse } from "next/server";
import { strapiFetch } from "@/helpers/strapiHelper";

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    const { newPassword, confirmPassword } = await req.json();

    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 },
      );
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Les mots de passe ne correspondent pas." },
        { status: 400 },
      );
    }
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères." },
        { status: 400 },
      );
    }

    const current = await strapiFetch(
      `/api/adopters/${slug}?populate=users_permissions_user`,
      { cache: "no-store" },
    );
    if (!current.ok) {
      return NextResponse.json({ error: "Compte introuvable." }, { status: 404 });
    }
    const json = await current.json();
    const userId = json?.data?.users_permissions_user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Aucun compte de connexion associé à ce profil." },
        { status: 400 },
      );
    }

    const res = await strapiFetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour du mot de passe." },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `[adopters/${slug}/password] API PUT: ${String(err)}` },
      { status: 500 },
    );
  }
}
