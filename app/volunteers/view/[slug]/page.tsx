import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getBenevoleById } from "@/app/volunteers/update/action";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

const roleColors: Record<string, string> = {
  admin: "bg-primary/10 text-primary",
  manager: "bg-quaternary/10",
  referent: "bg-tertiary/30",
};

const roleLabels: Record<string, string> = {
  admin: "Administrateur",
  manager: "Responsable",
  referent: "Référent",
};

export default async function VolunteerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const volunteer = await getBenevoleById(slug);

  if (!volunteer) notFound();

  const cookieStore = await cookies();
  const loggedVolunteerId = cookieStore.get("volunteer_id")?.value ?? null;
  const userRole = cookieStore.get("user_role")?.value ?? null;

  const isOwnAccount = loggedVolunteerId === slug;
  const isAdmin = userRole === "admin";
  const canEdit = isOwnAccount || isAdmin;

  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-quaternary">
              Profil du bénévole
            </h1>
            <div className="flex flex-row flex-wrap gap-2 shrink-0">
              <Button href="/account/volunteers" variant="secondary" size="sm">
                ← Retour
              </Button>
              {canEdit && (
                <Button
                  href={`/volunteers/update/${slug}`}
                  variant="primary"
                  size="sm"
                >
                  Modifier
                </Button>
              )}
            </div>
          </div>

          {/* En-tête profil */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex items-center gap-6">
            <div className="size-16 rounded-full bg-tertiary flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {volunteer.firstName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-bold break-words">
                {volunteer.firstName} {volunteer.lastName}
              </h2>
              <p className="text-quaternary/60 break-words">{volunteer.email}</p>
              <em
                className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full not-italic ${roleColors[volunteer.role] ?? "bg-gray-100 text-gray-600"}`}
              >
                {roleLabels[volunteer.role] ?? volunteer.role}
              </em>
            </div>
          </div>

          {/* Informations (lecture seule) */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex flex-col gap-4">
            <Heading
              type="h3"
              headingVariant="quaternary"
              underlineVariant="tertiary"
            >
              Informations
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-quaternary/50 uppercase tracking-wide mb-1">
                  Prénom
                </p>
                <p className="font-semibold">{volunteer.firstName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-quaternary/50 uppercase tracking-wide mb-1">
                  Nom
                </p>
                <p className="font-semibold">{volunteer.lastName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-quaternary/50 uppercase tracking-wide mb-1">
                  Email
                </p>
                <p className="font-semibold">{volunteer.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-quaternary/50 uppercase tracking-wide mb-1">
                  Rôle
                </p>
                <p className="font-semibold">
                  {roleLabels[volunteer.role] ?? volunteer.role}
                </p>
              </div>
            </div>
          </div>

          {/* Suppression du compte (admin, hors compte personnel) */}
          {isAdmin && !isOwnAccount && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex flex-col gap-3">
              <Heading
                type="h3"
                headingVariant="quaternary"
                underlineVariant="tertiary"
              >
                Supprimer le compte
              </Heading>
              <p className="text-sm text-quaternary/70 text-center">
                La suppression du compte de ce bénévole est définitive.
              </p>
              <div className="flex justify-center">
                <Button
                  href={`/volunteers/delete/${slug}`}
                  variant="primary"
                  size="md"
                >
                  Supprimer le compte
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
