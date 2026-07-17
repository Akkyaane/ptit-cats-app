"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateVolunteerForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);

    const payload = {
      lastName: formData.get("lastName") as string,
      firstName: formData.get("firstName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as string,
    };

    try {
      const entityRes = await fetch("/api/volunteers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const entityData = await entityRes.json();

      if (!entityRes.ok || !entityData.data?.documentId) {
        setError(
          typeof entityData.error === "string" && entityData.error.includes("email")
            ? "Un bénévole existe déjà avec cet email."
            : "Erreur lors de la création du bénévole.",
        );
        return;
      }

      const userRes = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: "volunteers",
          documentId: entityData.data.documentId,
          lastName: payload.lastName,
          firstName: payload.firstName,
          email: payload.email,
          password: payload.password,
          volunteerRole: payload.role,
        }),
      });

      if (!userRes.ok) {
        setError("Bénévole créé, mais l'association du compte a échoué.");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/volunteers/update"), 1500);
    } catch {
      setError("Erreur serveur, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <p className="text-sm font-bold text-green-600 bg-green-50 px-4 py-3 rounded-xl text-center">
        Bénévole créé avec succès ! Redirection...
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="lastName" className="text-sm font-bold ">
          Nom
        </label>
        <input
          id="lastName"
          name="lastName"
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
          Mot de passe provisoire (14 caractères min.)
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={14}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="role" className="text-sm font-bold ">
          Rôle
        </label>
        <select
          id="role"
          name="role"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200 bg-white"
        >
          <option value="">-- Choisir un rôle --</option>
          <option value="admin">Admin</option>
          <option value="manager">Responsable</option>
          <option value="referent">Référent</option>
        </select>
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
        {loading ? "Création..." : "Créer le bénévole"}
      </button>
    </form>
  );
}
