import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string | null;
  category?: { name: string; slug: string } | null;
  author?: { name: string } | null;
  publishedAt?: string | null;
  readTime?: number | null;
}

export function ArticleCard({
  title,
  excerpt,
  slug,
  coverImage,
  category,
  author,
  publishedAt,
  readTime,
}: ArticleCardProps) {
  const publishedLabel = publishedAt
    ? formatDistanceToNow(new Date(publishedAt), { addSuffix: true, locale: id })
    : null;

  return (
    <article className="group flex flex-col gap-3">
      {/* Cover image */}
      {coverImage && (
        <Link href={`/artikel/${slug}`} className="block overflow-hidden rounded-md">
          <img
            src={coverImage}
            alt=""
            className="aspect-[16/9] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
        </Link>
      )}

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        {/* Category */}
        {category && (
          <Link
            href={`/kategori/${category.slug}`}
            className="text-[11px] font-semibold tracking-widest text-primary uppercase"
          >
            {category.name}
          </Link>
        )}

        {/* Title */}
        <Link href={`/artikel/${slug}`}>
          <h2 className="text-lg font-semibold leading-snug text-foreground transition-colors duration-150 group-hover:text-primary">
            {title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {excerpt}
        </p>

        {/* Author + metadata */}
        <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
          {author && <span>{author.name}</span>}
          {author && (publishedLabel || readTime) && (
            <span aria-hidden="true">·</span>
          )}
          {publishedLabel && <span>{publishedLabel}</span>}
          {publishedLabel && readTime && <span aria-hidden="true">·</span>}
          {readTime && <span>{readTime} min baca</span>}
        </div>
      </div>
    </article>
  );
}
