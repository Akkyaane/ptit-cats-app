"use client";

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;

    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: "Faible", color: "bg-red-500" };
    if (score <= 2) return { score: 2, label: "Moyen", color: "bg-orange-500" };
    if (score <= 3) return { score: 3, label: "Bon", color: "bg-yellow-500" };
    if (score <= 4) return { score: 4, label: "Fort", color: "bg-emerald-500" };
    return { score: 5, label: "Excellent", color: "bg-emerald-600" };
  };

  if (!password) return null;

  const strength = getStrength(password);

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              level <= strength.score ? strength.color : "bg-zinc-200 dark:bg-zinc-700"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium transition-colors ${
        strength.score <= 2 ? "text-red-500" : strength.score <= 3 ? "text-yellow-600" : "text-emerald-600"
      }`}>
        Force du mot de passe : {strength.label}
      </p>
    </div>
  );
}
