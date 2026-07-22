import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const VOLUNTEER_ROLES = ["admin", "manager", "referent"] as const;

export type VolunteerRole = (typeof VOLUNTEER_ROLES)[number];

export type VolunteerSession = {
  documentId: string;
  role: VolunteerRole;
};

function buildSession(
  volunteerId: string | undefined,
  role: string | undefined,
): VolunteerSession | null {
  if (!volunteerId || !role) return null;
  if (!VOLUNTEER_ROLES.includes(role as VolunteerRole)) return null;
  return { documentId: volunteerId, role: role as VolunteerRole };
}

export async function getVolunteerSession(): Promise<VolunteerSession | null> {
  const cookieStore = await cookies();
  return buildSession(
    cookieStore.get("volunteer_id")?.value,
    cookieStore.get("user_role")?.value,
  );
}

export function getVolunteerSessionFromRequest(
  req: NextRequest,
): VolunteerSession | null {
  return buildSession(
    req.cookies.get("volunteer_id")?.value,
    req.cookies.get("user_role")?.value,
  );
}
