import { notFound } from "next/navigation";
import { serverApiData } from "@/helpers/apiHelper";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/ui/Button";
import AdopterEditForm from "@/components/adopter/AdopterEditForm";
import IAdopter from "@/interfaces/IAdopter";

export default async function AdopterUpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const adopter = await serverApiData<IAdopter | null>(
    `/api/adopters/${slug}`,
    null,
  );

  if (!adopter) notFound();

  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-quaternary">
              Modifier l&apos;adoptant
            </h1>
            <div className="flex flex-row flex-wrap gap-2 shrink-0">
              <Button
                href={`/adopters/view/${adopter.documentId}`}
                variant="secondary"
                size="sm"
              >
                ← Retour
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex items-center gap-6">
            <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {adopter.firstName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold break-words">
                {adopter.firstName} {adopter.lastName}
              </h1>
              <p className="text-quaternary/60 break-words">{adopter.email}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6">
            <AdopterEditForm adopter={adopter} />
          </div>
        </div>
      </main>
    </div>
  );
}
