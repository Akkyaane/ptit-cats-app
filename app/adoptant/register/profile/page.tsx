import AdoptantProfileForm from "@/components/adoptant/AdoptantProfileForm";
import Navbar from "@/components/Navbar";

export default async function RegisterProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;

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
              <h1 className="text-2xl md:text-3xl font-bold ">Mon profil</h1>
              <p className="text-sm text-quaternary/70 text-center">
                Ces informations nous aideront à trouver le chat parfait pour
                vous.
              </p>
              <div className="w-12 h-1 bg-tertiary rounded-full"></div>
            </div>
            <AdoptantProfileForm documentId={id} />
          </div>
        </div>
      </main>
    </div>
  );
}
