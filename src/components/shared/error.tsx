"use client";

import { AlertCircleIcon } from "lucide-react";

interface ErrorProps {
  title?: string;
  message?: string;
  retry?: () => void;
}

export function Error({
  title = "Terjadi kesalahan",
  message = "Gagal memuat konten. Silakan coba lagi.",
  retry,
}: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center" role="alert">
      <AlertCircleIcon className="size-12 text-muted-foreground/40" aria-hidden="true" />
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {message}
      </p>
      {retry && (
        <button
          type="button"
          onClick={retry}
          className="mt-6 inline-flex items-center justify-center h-8 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}
