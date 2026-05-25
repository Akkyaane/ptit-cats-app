import CreateVolunteerForm from "@/components/volunteer/CreateVolunteerForm";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function CreateVolunteerPage() {
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
              <h1 className="text-2xl md:text-3xl font-bold ">
                Créer un bénévole
              </h1>
              <div className="w-12 h-1 bg-tertiary rounded-full"></div>
            </div>
            <CreateVolunteerForm />
            <p className="text-center text-sm text-quaternary/70">
              <Link
                href="/admin"
                className="font-bold text-primary hover:underline"
              >
                &larr; Retour au panneau admin
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
