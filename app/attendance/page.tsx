import { getAllAttendances } from "@/app/attendance/action";
import { IAttendance } from "@/interfaces/IAttendance";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const statusLabel: Record<string, string> = {
  present: "Présent",
  absent: "Absent",
};

const statusColors: Record<string, string> = {
  present: "bg-green-100 text-green-700",
  absent: "bg-primary/10 text-primary",
};

export default async function AttendancePage() {
  const attendances: IAttendance[] = await getAllAttendances();

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
              Tableau de présence
            </h1>
            <div className="w-16 h-1 bg-tertiary rounded-full"></div>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href="/attendance/create"
              className="px-4 py-2 font-bold rounded-xl bg-tertiary border-2 border-tertiary text-white hover:bg-tertiary/10 hover:text-tertiary transition-colors duration-200 text-sm"
            >
              + Ajouter une absence
            </Link>
          </div>

          {attendances.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-quaternary/60">
              Aucune entrée dans le tableau de présence.
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-tertiary/10 text-left">
                  <tr>
                    <th className="px-6 py-3 font-bold">Bénévole</th>
                    <th className="px-6 py-3 font-bold">Date</th>
                    <th className="px-6 py-3 font-bold">Statut</th>
                    <th className="px-6 py-3 font-bold">Motif</th>
                    <th className="px-6 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attendances.map((a: IAttendance) => (
                    <tr key={a.id} className="hover:bg-secondary/40 transition-colors">
                      <td className="px-6 py-4 font-bold">
                        {a.volunteer
                          ? `${a.volunteer.firstName} ${a.volunteer.name}`
                          : "—"}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(a.date).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[a.status]}`}>
                          {statusLabel[a.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-quaternary/60">
                        {a.reason ?? "—"}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/attendance/update/${a.documentId}`}
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