import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/articles/article-card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) {
    notFound();
  }

  const { data: articles } = await supabase
    .from("articles")
    .select("*, author:users(name)")
    .eq("category_id", category.id)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-2 text-base text-muted-foreground">
            {category.description}
          </p>
        )}
      </div>

      {/* Articles */}
      {articles && articles.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              slug={article.slug}
              coverImage={article.cover_image}
              category={category}
              author={article.author}
              publishedAt={article.published_at}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Belum ada artikel di kategori ini.
        </p>
      )}
    </div>
  );
}
