import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("jwt");
  cookieStore.delete("adopter_id");
  cookieStore.delete("volunteer_id");
  cookieStore.delete("user_role");

  return NextResponse.json({ success: true });
}
