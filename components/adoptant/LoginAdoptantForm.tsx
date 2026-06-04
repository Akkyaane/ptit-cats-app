"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/app/login/action";

export default function LoginAdoptantForm({ redirectTo }: { redirectTo?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await loginUser(formData);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      if (result.role === "adoptant" && redirectTo) {
        router.push(redirectTo);
      } else if (result.role === "Admin") {
        router.push("/admin");
      } else if (result.volunteerId) {
        router.push(`/volunteer/view/${result.volunteerId}`);
      } else {
        router.push("/adoptant/profile");
      }
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-bold ">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-bold ">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      {error && (
        <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 font-bold rounded-xl bg-primary border-2 border-primary text-white hover:bg-primary/10 hover:text-primary transition-colors duration-200 disabled:opacity-60"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>

      <p className="text-center text-sm text-quaternary/70">
        Pas encore de compte ?{" "}
        <Link
          href="/adoptant/register"
          className="font-bold text-primary hover:underline"
        >
          S&apos;inscrire
        </Link>
      </p>
    </form>
  );
}
