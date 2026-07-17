import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllBenevoles } from "@/app/volunteers/update/action";
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
  Admin: "bg-primary/10 text-primary",
  Référent: "bg-tertiary/30 ",
  "Responsable-adoption": "bg-quaternary/10 ",
};

export default async function VolunteerListPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/");

  const benevoles: Benevole[] = await getAllBenevoles();

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold ">
              Liste des bénévoles
            </h1>
            <div className="w-16 h-1 bg-tertiary rounded-full"></div>
          </div>

          {benevoles.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-quaternary/60">
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
                    <div className="size-10 rounded-full bg-tertiary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {b.firstName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold ">
                        {b.firstName} {b.name}
                      </p>
                      <p className="text-sm text-quaternary/60">{b.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <em
                      className={`hidden sm:inline text-xs font-bold px-3 py-1 rounded-full ${roleColors[b.role] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {b.role}
                    </em>
                    <Link
                      href={`/volunteers/view/${b.documentId}`}
                      className="px-4 py-2 font-bold rounded-xl bg-quaternary border-2 border-quaternary text-white hover:bg-quaternary/10 hover:text-quaternary transition-colors duration-200 text-sm whitespace-nowrap"
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
              className="font-bold text-primary hover:underline text-sm"
            >
              &larr; Retour au panneau admin
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
