"use client";

import { logoutUser } from "@/app/login/action";

export default function LogoutButton() {
  return (
    <form action={logoutUser}>
      <button
        type="submit"
        className="w-full px-6 py-3 font-bold rounded-xl bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200"
      >
        Se déconnecter
      </button>
    </form>
  );
}
