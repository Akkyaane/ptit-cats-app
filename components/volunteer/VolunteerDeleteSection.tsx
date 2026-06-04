"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBenevole, deleteOwnVolunteerAccount } from "@/app/volunteer/update/action";

export default function VolunteerDeleteSection({
  documentId,
  isOwnAccount,
}: {
  documentId: string;
  isOwnAccount: boolean;
}) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    setError(null);

    if (isOwnAccount) {
      // deleteOwnVolunteerAccount effectue le redirect côté serveur
      await deleteOwnVolunteerAccount(documentId);
    } else {
      const result = await deleteBenevole(documentId);
      setLoading(false);
      if (result.error) {
        setError(result.error);
        setConfirm(false);
      } else {
        router.push("/volunteer/view");
      }
    }
  }

  if (confirm) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-center text-red-700">
          {isOwnAccount
            ? "Supprimer votre compte ? Cette action est irréversible."
            : "Confirmer la suppression de ce compte ? Cette action est irréversible."}
        </p>
        {error && (
          <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl text-center">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => setConfirm(false)}
            disabled={loading}
            className="flex-1 px-6 py-3 font-bold rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-60"
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
      className="w-full px-6 py-3 font-bold rounded-xl bg-red-500 border-2 border-red-500 text-white hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200"
    >
      {isOwnAccount ? "Supprimer mon compte" : "Supprimer ce compte"}
    </button>
  );
}
