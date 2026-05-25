"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCat } from "@/app/cats/update/action";

export default function DeleteCatButton({ documentId }: { documentId: string }) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    setError(null);
    const result = await deleteCat(documentId);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      setConfirm(false);
    } else {
      router.push("/adoption-posts");
    }
  }

  if (confirm) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-center text-[var(--color-quaternary)]">
          Confirmer la suppression ? Cette action est irréversible.
        </p>
        {error && (
          <p className="text-sm font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-4 py-3 rounded-xl text-center">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => setConfirm(false)}
            disabled={loading}
            className="flex-1 px-6 py-3 font-bold rounded-xl border-2 border-gray-300 text-[var(--color-quaternary)] hover:bg-gray-50 transition-colors duration-200 disabled:opacity-60"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 px-6 py-3 font-bold rounded-xl bg-red-500 border-2 border-red-500 text-white hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200 disabled:opacity-60"
          >
            {loading ? "Suppression..." : "Confirmer"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="w-full px-6 py-3 font-bold rounded-xl border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors duration-200"
    >
      Supprimer ce chat
    </button>
  );
}
