import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface FeaturedHeroProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string | null;
  category?: { name: string; slug: string } | null;
  author?: { name: string } | null;
  publishedAt?: string | null;
}

export function FeaturedHero({
  title,
  excerpt,
  slug,
  coverImage,
  category,
  author,
  publishedAt,
}: FeaturedHeroProps) {
  const publishedLabel = publishedAt
    ? formatDistanceToNow(new Date(publishedAt), { addSuffix: true, locale: id })
    : null;

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-[1280px] px-6">
        <Link href={`/artikel/${slug}`} className="group grid gap-6 md:grid-cols-2 md:gap-10">
          {/* Image */}
          {coverImage && (
            <div className="overflow-hidden rounded-md">
              <img
                src={coverImage}
                alt=""
                className="aspect-[4/3] w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-95 md:aspect-[3/2]"
                fetchPriority="high"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col justify-center gap-3">
            {category && (
              <span className="text-[11px] font-semibold tracking-widest text-primary uppercase">
                {category.name}
              </span>
            )}

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {excerpt}
            </p>

            <div className="flex items-center gap-1.5 pt-1 text-sm text-muted-foreground">
              {author && <span>{author.name}</span>}
              {author && publishedLabel && <span aria-hidden="true">·</span>}
              {publishedLabel && <span>{publishedLabel}</span>}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
