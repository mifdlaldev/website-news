"use client";

import Link from "next/link";
import { Search, PenLine, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Pilihan Redaksi" },
  { href: "/trending", label: "Trending" },
  { href: "/kategori/tekno", label: "Tekno" },
  { href: "/kategori/ekonomi", label: "Ekonomi" },
  { href: "/kategori/olahraga", label: "Olahraga" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-fixed w-full border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-[1040px] items-center justify-between gap-1 px-4 md:px-6">
        {/* Mobile */}
        <Sheet>
          <SheetTrigger
            className="flex md:hidden items-center justify-center size-9 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Buka menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex flex-col gap-1 p-4 pt-12">
              {navLinks.map((link) => (
                <SheetClose key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="border-t border-border p-4">
              <SheetClose>
                <Link
                  href="/auth/login"
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  Masuk
                </Link>
              </SheetClose>
              <div className="mt-2">
                <SheetClose>
                  <Link href="/auth/register">
                    <Button className="w-full">Daftar</Button>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <span className="text-lg font-bold tracking-tight text-foreground">
            Website<span className="text-primary">News</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Cari">
            <Search className="size-4" />
          </Button>
          <Link
            href="/tulis"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <PenLine className="size-4" />
            Tulis
          </Link>
          <Link href="/auth/login">
            <Button size="sm">Masuk</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
