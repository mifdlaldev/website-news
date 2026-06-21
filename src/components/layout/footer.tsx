import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerNav = {
  Kategori: [
    { href: "/kategori/tekno", label: "Tekno" },
    { href: "/kategori/ekonomi", label: "Ekonomi" },
    { href: "/kategori/olahraga", label: "Olahraga" },
    { href: "/kategori/sains", label: "Sains" },
  ],
  Lainnya: [
    { href: "/trending", label: "Trending" },
    { href: "/search", label: "Cari" },
    { href: "/tentang", label: "Tentang" },
    { href: "/kontak", label: "Kontak" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
              Website<span className="text-primary">News</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Portal berita digital dengan fokus pada readability, performa, dan SEO.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-8 md:gap-16">
            {Object.entries(footerNav).map(([title, links]) => (
              <div key={title}>
                <h4 className="mb-3 text-xs font-semibold tracking-wider text-foreground uppercase">
                  {title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} WebsiteNews. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors duration-150 hover:text-foreground">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="transition-colors duration-150 hover:text-foreground">
              Ketentuan Layanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
