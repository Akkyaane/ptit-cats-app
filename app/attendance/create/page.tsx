import AddAbsenceForm from "@/components/attendance/AddAbsenceForm";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getAllBenevoles } from "@/app/volunteer/update/action";

export default async function AddAbsencePage() {
  const benevoles = await getAllBenevoles();

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">
                Ajouter une absence
              </h1>
              <div className="w-12 h-1 bg-tertiary rounded-full"></div>
            </div>
            <AddAbsenceForm benevoles={benevoles} />
            <p className="text-center text-sm text-quaternary/70">
              <Link
                href="/attendance"
                className="font-bold text-primary hover:underline"
              >
                &larr; Retour au tableau
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}