import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/articles/article-card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: tag } = await supabase
    .from("tags")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!tag) {
    notFound();
  }

  const { data: articleLinks } = await supabase
    .from("article_tags")
    .select("article_id")
    .eq("tag_id", tag.id);

  const articleIds = articleLinks?.map((link) => link.article_id) ?? [];

  const { data: articles } = await supabase
    .from("articles")
    .select("*, author:users(name)")
    .in("id", articleIds)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          #{tag.name}
        </h1>
      </div>

      {articles && articles.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              slug={article.slug}
              coverImage={article.cover_image}
              author={article.author}
              publishedAt={article.published_at}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Belum ada artikel dengan tag ini.
        </p>
      )}
    </div>
  );
}
