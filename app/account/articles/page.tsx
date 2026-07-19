import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverApiData } from "@/helpers/api";
import IArticle from "@/interfaces/IArticle";
import ArticlesManager from "@/components/account/ArticlesManager";
import AccountSubLayout from "@/components/account/AccountSubLayout";
import Button from "@/components/ui/Button";

const ALLOWED = ["admin", "manager", "referent"];

export default async function AccountArticlesPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("user_role")?.value;
  const volunteerId = cookieStore.get("volunteer_id")?.value;
  if (!volunteerId || !role || !ALLOWED.includes(role)) redirect("/account");

  const articles = await serverApiData<IArticle[]>(
    `/api/articles?volunteer=${volunteerId}`,
    [],
  );

  return (
    <AccountSubLayout
      title="Articles"
      action={
        <Button href="/blog/create" size="sm" variant="primary">
          Ajouter +
        </Button>
      }
    >
      <ArticlesManager articles={articles} />
    </AccountSubLayout>
  );
}
