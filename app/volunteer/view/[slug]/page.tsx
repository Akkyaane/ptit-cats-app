import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getBenevoleById } from "@/app/volunteer/update/action";
import Navbar from "@/components/Navbar";
import UpdateVolunteerForm from "@/components/volunteer/UpdateVolunteerForm";
import VolunteerPasswordChangeForm from "@/components/volunteer/VolunteerPasswordChangeForm";
import VolunteerDeleteSection from "@/components/volunteer/VolunteerDeleteSection";
import Link from "next/link";

const roleColors: Record<string, string> = {
  Admin: "bg-primary/10 text-primary",
  Référent: "bg-tertiary/30",
  "Responsable-adoption": "bg-quaternary/10",
};

const roleLabels: Record<string, string> = {
  Admin: "Administrateur",
  Référent: "Référent",
  "Responsable-adoption": "Responsable adoption",
};

export default async function VolunteerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const volunteer = await getBenevoleById(id);

  if (!volunteer) notFound();

  const cookieStore = await cookies();
  const loggedVolunteerId = cookieStore.get("volunteer_id")?.value ?? null;
  const userRole = cookieStore.get("user_role")?.value ?? null;

  const isOwnAccount = loggedVolunteerId === id;
  const isAdmin = userRole === "Admin";
  const canEdit = isOwnAccount || isAdmin;

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">

          {/* Retour */}
          {isAdmin && (
            <Link
              href="/volunteer/view"
              className="text-sm font-bold text-quaternary hover:underline w-fit"
            >
              ← Retour à la liste
            </Link>
          )}

          {/* En-tête profil */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex items-center gap-6">
            <div className="size-16 rounded-full bg-tertiary flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {volunteer.firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {volunteer.firstName} {volunteer.name}
              </h1>
              <p className="text-quaternary/60">{volunteer.email}</p>
              <em
                className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full not-italic ${roleColors[volunteer.role] ?? "bg-gray-100 text-gray-600"}`}
              >
                {roleLabels[volunteer.role] ?? volunteer.role}
              </em>
            </div>
          </div>

          {/* Informations (statiques si non-éditeur, formulaire si canEdit) */}
          {canEdit ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex flex-col gap-4">
              <h2 className="text-lg font-bold">Modifier les informations</h2>
              <UpdateVolunteerForm benevole={volunteer} canChangeRole={isAdmin} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex flex-col gap-4">
              <h2 className="text-lg font-bold">Informations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-quaternary/50 uppercase tracking-wide mb-1">Prénom</p>
                  <p className="font-semibold">{volunteer.firstName}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-quaternary/50 uppercase tracking-wide mb-1">Nom</p>
                  <p className="font-semibold">{volunteer.name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-quaternary/50 uppercase tracking-wide mb-1">Email</p>
                  <p className="font-semibold">{volunteer.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-quaternary/50 uppercase tracking-wide mb-1">Rôle</p>
                  <p className="font-semibold">{roleLabels[volunteer.role] ?? volunteer.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions (visible uniquement si canEdit) */}
          {canEdit && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex flex-col gap-4">
              <h2 className="text-lg font-bold">Paramètres du compte</h2>
              <VolunteerPasswordChangeForm documentId={id} />
              {isAdmin && (
                <>
                  <hr className="border-gray-100" />
                  <VolunteerDeleteSection documentId={id} isOwnAccount={isOwnAccount} />
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
