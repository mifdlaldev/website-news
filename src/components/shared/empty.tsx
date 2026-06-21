import { FileTextIcon } from "lucide-react";

interface EmptyProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function Empty({
  title = "Belum ada konten",
  description = "Konten belum tersedia saat ini. Silakan cek kembali nanti.",
  action,
}: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileTextIcon className="size-12 text-muted-foreground/40" aria-hidden="true" />
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
