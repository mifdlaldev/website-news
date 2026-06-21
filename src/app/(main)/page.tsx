import { createPublicClient } from "@/lib/supabase/public";
import { FeaturedHero } from "@/components/articles/featured-hero";
import { ArticleCard } from "@/components/articles/article-card";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = createPublicClient();

  // Featured article (latest published with featured=true)
  const { data: featuredArticle } = await supabase
    .from("articles")
    .select("*, author:users(name), category:categories(name, slug)")
    .eq("status", "published")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .single();

  // Latest articles (excluding featured)
  const excludeId = featuredArticle?.id ?? "";
  const { data: latestArticles } = await supabase
    .from("articles")
    .select("*, author:users(name), category:categories(name, slug)")
    .eq("status", "published")
    .not("id", "eq", excludeId)
    .order("published_at", { ascending: false })
    .limit(9);

  return (
    <div>
      {featuredArticle && (
        <FeaturedHero
          title={featuredArticle.title}
          excerpt={featuredArticle.excerpt}
          slug={featuredArticle.slug}
          coverImage={featuredArticle.cover_image}
          category={featuredArticle.category}
          author={featuredArticle.author}
          publishedAt={featuredArticle.published_at}
        />
      )}

      <section className="mx-auto max-w-[1280px] px-6 pb-16">
        <h2 className="mb-8 text-lg font-bold tracking-tight text-foreground md:text-xl">
          Artikel Terbaru
        </h2>

        {latestArticles && latestArticles.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                slug={article.slug}
                coverImage={article.cover_image}
                category={article.category}
                author={article.author}
                publishedAt={article.published_at}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Belum ada artikel. Silakan kembali lagi nanti.
          </p>
        )}
      </section>
    </div>
  );
}
