"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type Result = { error?: string; success?: boolean };

export default function PasswordChangeForm({
  action,
}: {
  action: (formData: FormData) => Promise<Result>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.set("newPassword", newPassword);
    formData.set("confirmPassword", confirmPassword);
    const result = await action(formData);

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl text-center">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm font-bold text-green-700 bg-green-100 px-4 py-3 rounded-xl text-center">
          Mot de passe mis à jour !
        </p>
      )}

      <Input
        type="password"
        name="newPassword"
        labelName="Nouveau mot de passe"
        required
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        type="password"
        name="confirmPassword"
        labelName="Confirmer le mot de passe"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div>
        <Button type="submit" variant="primary" size="md" disabled={loading}>
          {loading ? "Enregistrement..." : "Modifier le mot de passe"}
        </Button>
      </div>
    </form>
  );
}
