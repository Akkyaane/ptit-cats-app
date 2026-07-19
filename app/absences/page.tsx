import { getAllAbsences } from "@/app/absences/action";
import IAbsence from "@/interfaces/IAbsence";
import Navbar from "@/components/Navbar";
import Link from "next/link";

function formatDate(value: Date | string | null | undefined) {
  return value ? new Date(value).toLocaleDateString("fr-FR") : "—";
}

export default async function AbsencePage() {
  const absences: IAbsence[] = await getAllAbsences();

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
            <h1 className="text-3xl md:text-4xl font-bold">
              Absences des bénévoles
            </h1>
            <div className="w-16 h-1 bg-tertiary rounded-full"></div>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href="/absences/create"
              className="px-4 py-2 font-bold rounded-xl bg-tertiary border-2 border-tertiary text-white hover:bg-tertiary/10 hover:text-tertiary transition-colors duration-200 text-sm"
            >
              + Ajouter une absence
            </Link>
          </div>

          {absences.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-quaternary/60">
              Aucune absence enregistrée.
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-tertiary/10 text-left">
                  <tr>
                    <th className="px-6 py-3 font-bold">Bénévole</th>
                    <th className="px-6 py-3 font-bold">Du</th>
                    <th className="px-6 py-3 font-bold">Au</th>
                    <th className="px-6 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {absences.map((a: IAbsence) => (
                    <tr key={a.documentId} className="hover:bg-secondary/40 transition-colors">
                      <td className="px-6 py-4 font-bold">
                        {a.volunteer
                          ? `${a.volunteer.firstName} ${a.volunteer.lastName}`
                          : "—"}
                      </td>
                      <td className="px-6 py-4">{formatDate(a.startDate)}</td>
                      <td className="px-6 py-4">{formatDate(a.endDate)}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/absences/update/${a.documentId}`}
                          className="text-xs font-bold text-quaternary hover:underline"
                        >
                          Modifier
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-center">
            <Link
              href="/account"
              className="font-bold text-primary hover:underline text-sm"
            >
              &larr; Retour à mon espace
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
