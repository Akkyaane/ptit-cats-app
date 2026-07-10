import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import LogoutButton from "@/components/adoptant/LogoutButton";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("user_role")?.value;

  if (userRole !== "Admin") {
    redirect("/home");
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold ">Administration</h1>
            <div className="w-16 h-1 bg-tertiary rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <Link
              href="/volunteer/create"
              className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg ">Créer un compte bénévole</p>
                <p className="text-sm text-gray-500 mt-1">
                  Ajouter un nouveau bénévole
                </p>
              </div>
            </Link>

            <Link
              href="/volunteer/update"
              className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-14 h-14 rounded-full bg-tertiary/30 flex items-center justify-center">
                <svg
                  className="w-7 h-7 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg ">Gérer les bénévoles</p>
                <p className="text-sm text-gray-500 mt-1">
                  Voir et modifier les comptes
                </p>
              </div>
            </Link>

            <Link
  href="/attendance/calendar"
  className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
>
  <div className="w-14 h-14 rounded-full bg-tertiary/30 flex items-center justify-center">
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  </div>
  <div className="text-center">
    <p className="font-bold text-lg">Tableau de présence</p>
    <p className="text-sm text-gray-500 mt-1">
      Calendrier des absences
    </p>
  </div>
</Link>
          </div>

          <div className="w-full max-w-xs">
            <LogoutButton />
          </div>
        </div>
      </main>
    </div>
  );
}
