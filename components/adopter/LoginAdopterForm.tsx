"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

export default function LoginAdopterForm({ redirectTo }: { redirectTo?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    if (loading) return;
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const result = await res.json();
    setLoading(false);

    if (!res.ok || result.error) {
      setError(result.error ?? "Erreur serveur, veuillez réessayer.");
      return;
    }

    if (result.type === "adopter") {
      router.push(redirectTo ?? "/profile");
    } else if (result.role === "admin") {
      router.push("/admin");
    } else {
      router.push(`/volunteers/view/${result.documentId}`);
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <FormInput
        label="Email"
        id="email"
        name="email"
        type="email"
        autoComplete="username"
        required
      />
      <FormInput
        label="Mot de passe"
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />

      {error && (
        <p className="px-4 py-3 rounded-xl bg-primary/10 border-2 border-primary text-primary font-bold text-sm">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="md" full disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </Button>

      <p className="text-center text-sm text-quaternary/70">
        Pas encore de compte ?{" "}
        <Link href="/auth/signup" className="font-bold text-primary hover:underline">
          S&apos;inscrire
        </Link>
      </p>
    </form>
  );
}
