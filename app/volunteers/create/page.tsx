import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateVolunteerForm from "@/components/volunteer/CreateVolunteerForm";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

export default async function CreateVolunteerPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("user_role")?.value !== "admin") redirect("/");

  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <div className="w-full max-w-md mx-auto flex flex-col gap-6">
          <div className="flex justify-start">
            <Button href="/account?tab=actions" variant="secondary" size="sm">
              ← Retour
            </Button>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-6">
            <Heading
              type="h3"
              headingVariant="quaternary"
              underlineVariant="tertiary"
            >
              Créer un bénévole
            </Heading>
            <CreateVolunteerForm />
          </div>
        </div>
      </main>
    </div>
  );
}
