import UpdateAttendanceForm from "@/components/attendance/UpdateAttendanceForm";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { IAttendance } from "@/interfaces/IAbsence";

async function getAttendance(documentId: string): Promise<IAttendance | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/attendances/${documentId}?populate=volunteer`,
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function UpdateAttendancePage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  const attendance = await getAttendance(documentId);

  if (!attendance) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-quaternary/60">Entrée introuvable.</p>
      </div>
    );
  }

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
                Modifier la présence
              </h1>
              <div className="w-12 h-1 bg-tertiary rounded-full"></div>
            </div>
            <UpdateAttendanceForm attendance={attendance} />
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