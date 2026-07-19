import { cookies } from "next/headers";
import ArticleView from "@/components/article/ArticleView";

export default async function ViewArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Permissions Modifier / Supprimer calculées côté ArticleView (qui connaît
  // l'auteur de l'article) : admin (tous) ou auteur (manager/référent).
  const cookieStore = await cookies();
  const volunteerId = cookieStore.get("volunteer_id")?.value;
  const userRole = cookieStore.get("user_role")?.value;

  return (
    <ArticleView
      documentId={slug}
      userRole={userRole}
      currentVolunteerId={volunteerId}
    />
  );
}
