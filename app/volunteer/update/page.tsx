import { getAllBenevoles } from "@/app/volunteer/update/action";
import Navbar from "@/components/Navbar";
import Link from "next/link";

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

export default async function VolunteerListPage() {
  const benevoles: Benevole[] = await getAllBenevoles();

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      <header className="bg-[var(--color-tertiary)]">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-quaternary)]">
              Liste des bénévoles
            </h1>
            <div className="w-16 h-1 bg-[var(--color-tertiary)] rounded-full"></div>
          </div>

          {benevoles.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-[var(--color-quaternary)]/60">
              Aucun bénévole trouvé.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {benevoles.map((b: Benevole) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-[var(--color-tertiary)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {b.firstName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[var(--color-quaternary)]">
                        {b.firstName} {b.name}
                      </p>
                      <p className="text-sm text-[var(--color-quaternary)]/60">{b.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <em className={`hidden sm:inline text-xs font-bold px-3 py-1 rounded-full ${roleColors[b.role] ?? "bg-gray-100 text-gray-600"}`}>
                      {b.role}
                    </em>
                    <Link
                      href={`/volunteer/view/${b.documentId}`}
                      className="px-4 py-2 font-bold rounded-xl bg-[var(--color-quaternary)] border-2 border-[var(--color-quaternary)] text-white hover:bg-[var(--color-quaternary)]/10 hover:text-[var(--color-quaternary)] transition-colors duration-200 text-sm whitespace-nowrap"
                    >
                      Voir le profil
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Link
              href="/admin"
              className="font-bold text-[var(--color-primary)] hover:underline text-sm"
            >
              &larr; Retour au panneau admin
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}