"use client";

import Link from "next/link";
import { Search, PenLine, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Pilihan Redaksi" },
  { href: "/trending", label: "Trending" },
  { href: "/kategori/tekno", label: "Tekno" },
  { href: "/kategori/ekonomi", label: "Ekonomi" },
  { href: "/kategori/olahraga", label: "Olahraga" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-fixed w-full border-b border-border bg-background isolate">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6">
        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger
            className="flex md:hidden items-center justify-center size-9 rounded-md text-muted-foreground hover:bg-muted transition-colors duration-150"
            aria-label="Buka menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <nav className="flex flex-col gap-1 p-6 pt-16" aria-label="Navigasi utama">
              {NAV_LINKS.map((link) => (
                <SheetClose key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors duration-150 hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="border-t border-border p-6">
              <SheetClose>
                <Link
                  href="/auth/login"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted"
                >
                  Masuk
                </Link>
              </SheetClose>
              <div className="mt-4">
                <SheetClose
                  render={
                    <a
                      href="/auth/register"
                      className="flex w-full items-center justify-center h-8 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
                    />
                  }
                >
                  Daftar
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <span className="text-lg font-bold tracking-tight text-foreground leading-none">
            Website<span className="text-primary">News</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center size-9 rounded-md text-muted-foreground hover:bg-muted transition-colors duration-150"
            aria-label="Cari artikel"
          >
            <Search className="size-4" />
          </button>
          <Link
            href="/tulis"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            <PenLine className="size-4" />
            Tulis
          </Link>
          <Link
            href="/auth/login"
            className={buttonVariants({ size: "sm" })}
          >
            Masuk
          </Link>
        </div>
      </div>
    </header>
  );
}
