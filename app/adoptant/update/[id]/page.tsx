import { getAdoptantById } from "@/app/adoptant/update/action";
import UpdateAdoptantForm from "@/components/adoptant/UpdateAdoptantForm";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";

export default async function UpdateAdoptantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const adoptant = await getAdoptantById(id);

  if (!adoptant) return notFound();

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
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-quaternary)]">
                Modifier mon profil
              </h1>
              <div className="w-12 h-1 bg-[var(--color-tertiary)] rounded-full"></div>
            </div>
            <UpdateAdoptantForm adoptant={adoptant} />
          </div>
        </div>
      </main>
    </div>
  );
}
