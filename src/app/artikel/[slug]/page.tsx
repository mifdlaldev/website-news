import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeftIcon } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("title, excerpt, cover_image")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!article) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: article.cover_image
      ? { images: [{ url: article.cover_image }] }
      : undefined,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*, author:users(name), category:categories(name, slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!article) {
    notFound();
  }

  const publishedLabel = article.published_at
    ? formatDistanceToNow(new Date(article.published_at), {
        addSuffix: true,
        locale: id,
      })
    : null;

  return (
    <article className="mx-auto max-w-[720px] px-4 py-12 md:py-16">
      {/* Back link */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Kembali
      </Link>

      {/* Cover image */}
      {article.cover_image && (
        <div className="mb-8 overflow-hidden rounded-md">
          <img
            src={article.cover_image}
            alt=""
            className="aspect-[2/1] w-full object-cover"
          />
        </div>
      )}

      {/* Category */}
      {article.category && (
        <Link
          href={`/kategori/${article.category.slug}`}
          className="text-[11px] font-semibold tracking-widest text-primary uppercase"
        >
          {article.category.name}
        </Link>
      )}

      {/* Title */}
      <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
        {article.title}
      </h1>

      {/* Author + date */}
      <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        {article.author && <span>{article.author.name}</span>}
        {article.author && publishedLabel && (
          <span aria-hidden="true">·</span>
        )}
        {publishedLabel && <span>{publishedLabel}</span>}
      </div>

      {/* Content */}
      {article.content && (
        <div
          className="prose-style mt-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      )}
    </article>
  );
}
