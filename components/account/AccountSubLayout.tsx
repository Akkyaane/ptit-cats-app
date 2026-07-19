import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/ui/Button";

export default function AccountSubLayout({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="layout-header-spacing">
      <main className="container">
        <Breadcrumb />
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-quaternary">
              {title}
            </h1>
            <div className="flex flex-row flex-wrap gap-2 shrink-0">
              <Button href="/account?tab=actions" variant="secondary" size="sm">
                ← Retour
              </Button>
              {action}
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
