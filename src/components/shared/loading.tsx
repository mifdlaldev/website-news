import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {
  count?: number;
  variant?: "card" | "text" | "article";
}

export function Loading({ count = 3, variant = "card" }: LoadingProps) {
  if (variant === "text") {
    return (
      <div className="flex flex-col gap-3" role="status" aria-label="Memuat konten">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (variant === "article") {
    return (
      <div className="flex flex-col gap-6" role="status" aria-label="Memuat artikel">
        <Skeleton className="h-48 w-full rounded-md" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Memuat konten"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="h-40 w-full rounded-md" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
