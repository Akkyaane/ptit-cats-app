import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protège les pages CRUD (create / update / delete) des annonces et du blog.
// Blog : accessible à tout bénévole (admin / manager / référent).
// Annonces d'adoption : réservé à l'admin et au responsable d'adoption (manager).
// Les adoptants et visiteurs non connectés sont redirigés vers la section parente.
export function proxy(req: NextRequest) {
  const volunteerId = req.cookies.get("volunteer_id")?.value;
  const userRole = req.cookies.get("user_role")?.value;
  const isBlog = req.nextUrl.pathname.startsWith("/blog");

  const allowed = isBlog
    ? Boolean(volunteerId) && userRole !== "adopter"
    : Boolean(volunteerId) &&
      (userRole === "admin" || userRole === "manager");

  if (allowed) return NextResponse.next();

  return NextResponse.redirect(
    new URL(isBlog ? "/blog" : "/adoption-listings", req.url),
  );
}

export const config = {
  matcher: [
    "/adoption-listings/create",
    "/adoption-listings/update/:path*",
    "/adoption-listings/delete/:path*",
    "/blog/create",
    "/blog/update/:path*",
    "/blog/delete/:path*",
  ],
};
