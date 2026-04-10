import { getBenevoleById } from "@/app/volunteer/update/action";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";

type Benevole = {
  id: number;
  documentId: string;
  name: string;
  firstName: string;
  email: string;
  role: "Admin" | "Référent" | "Responsable-adoption";
};

const roleColors: Record<string, string> = {
  Admin: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  "Référent": "bg-[var(--color-tertiary)]/30 text-[var(--color-quaternary)]",
  "Responsable-adoption": "bg-[var(--color-quaternary)]/10 text-[var(--color-quaternary)]",
};

export default async function BenevoleProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const benevole: Benevole = await getBenevoleById(id);

  if (!benevole) return notFound();

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      <header className="bg-[var(--color-tertiary)]">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="size-16 rounded-full bg-[var(--color-tertiary)] flex items-center justify-center text-2xl font-bold text-white">
                {benevole.firstName.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-quaternary)]">
                {benevole.firstName} {benevole.name}
              </h1>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${roleColors[benevole.role] ?? "bg-gray-100 text-gray-600"}`}>
                {benevole.role}
              </span>
              <div className="w-12 h-1 bg-[var(--color-tertiary)] rounded-full"></div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[var(--color-quaternary)]/50 text-sm font-bold w-24">Email</span>
                <span className="text-[var(--color-quaternary)] font-bold">{benevole.email}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[var(--color-quaternary)]/50 text-sm font-bold w-24">Rôle</span>
                <span className="text-[var(--color-quaternary)] font-bold">{benevole.role}</span>
              </div>
            </div>

            <Link
              href={`/volunteer/update/${benevole.documentId}`}
              className="w-full px-6 py-3 font-bold rounded-xl bg-[var(--color-quaternary)] border-2 border-[var(--color-quaternary)] text-white hover:bg-[var(--color-quaternary)]/10 hover:text-[var(--color-quaternary)] transition-colors duration-200 text-center"
            >
              Modifier ce profil
            </Link>
            <Link
              href="/volunteer/update"
              className="text-center font-bold text-[var(--color-primary)] hover:underline text-sm"
            >
              &larr; Retour à la liste
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}