"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdoptant } from "@/app/adoptant/register/action";

export default function RegisterAdoptantForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await createAdoptant(formData);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.success && result.documentId) {
      router.push(`/adoptant/register/complete?id=${result.documentId}`);
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-bold ">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-sm font-bold ">
          Prénom
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-bold ">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
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
          autoComplete="new-password"
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
        {loading ? "Création..." : "Créer mon compte"}
      </button>
    </form>
  );
}
