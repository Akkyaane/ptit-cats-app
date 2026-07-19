import ArticleList from "@/components/article/ArticleList";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";

export default function BlogPage() {
  return (
    <div>
      <header className="bg-tertiary h-28">
        <section className="container hidden">
          <Heading type="h1" headingVariant="secondary">
            Blog
          </Heading>
        </section>
      </header>

      <main>
        <Breadcrumb />
        <section className="container flex flex-col gap-10">
          <Heading
            type="h2"
            headingVariant="quaternary"
            underlineVariant="tertiary"
          >
            Notre blog
          </Heading>

          <ArticleList />
        </section>
      </main>
    </div>
  );
}
