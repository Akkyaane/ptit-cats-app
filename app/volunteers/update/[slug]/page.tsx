import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getBenevoleById } from "@/app/volunteers/update/action";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import UpdateVolunteerForm from "@/components/volunteer/UpdateVolunteerForm";

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

export default async function VolunteerUpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const loggedVolunteerId = cookieStore.get("volunteer_id")?.value ?? null;
  const userRole = cookieStore.get("user_role")?.value ?? null;

  const isOwnAccount = loggedVolunteerId === slug;
  const isAdmin = userRole === "admin";

  // Seuls l'administrateur ou le titulaire du compte peuvent modifier ce profil.
  if (!isAdmin && !isOwnAccount) redirect("/");

  const volunteer = await getBenevoleById(slug);
  if (!volunteer) notFound();

  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-quaternary">
              Modifier le bénévole
            </h1>
            <div className="flex flex-row flex-wrap gap-2 shrink-0">
              <Button
                href={`/volunteers/view/${slug}`}
                variant="secondary"
                size="sm"
              >
                ← Retour
              </Button>
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

          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex flex-col gap-4">
            <Heading
              type="h3"
              headingVariant="quaternary"
              underlineVariant="tertiary"
            >
              Modifier les informations
            </Heading>
            <UpdateVolunteerForm benevole={volunteer} canChangeRole={isAdmin} />
          </div>
        </div>
      </main>
    </div>
  );
}
