"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginAdopterForm({ redirectTo }: { redirectTo?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    });
    const result = await res.json();
    setLoading(false);

    if (!res.ok || result.error) {
      setError(result.error ?? "Erreur serveur, veuillez réessayer.");
      return;
    }

    window.location.assign(redirectTo ?? "/account");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        type="email"
        name="email"
        labelName="Email"
        autoComplete="username"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        labelName="Mot de passe"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
