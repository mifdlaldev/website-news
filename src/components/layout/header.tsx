"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Berita" },
  { href: "/trending", label: "Trending" },
  { href: "/kategori/tekno", label: "Tekno" },
  { href: "/kategori/ekonomi", label: "Ekonomi" },
  { href: "/kategori/olahraga", label: "Olahraga" },
];

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-fixed w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden flex items-center justify-center size-9 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" aria-label="Buka menu navigasi">
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="mt-8 flex flex-col gap-2" aria-label="Navigasi utama">
              {navLinks.map((link) => (
                <SheetClose key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md px-4 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <Separator className="my-4" />
              <SheetClose>
                <Link
                  href="/auth/login"
                  className="rounded-md px-4 py-2.5 text-base font-medium text-primary transition-colors hover:bg-muted"
                >
                  Masuk
                </Link>
              </SheetClose>
              <SheetClose>
                <Link
                  href="/auth/register"
                  className="mx-4 rounded-md bg-primary px-4 py-2.5 text-center text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Daftar
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Website<span className="text-primary">News</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="mx-auto hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search & Auth */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Cari berita..."
                className="h-9 w-48 md:w-64"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setSearchOpen(false)} aria-label="Tutup pencarian">
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Buka pencarian">
              <Search className="size-5" />
            </Button>
          )}

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Masuk</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Daftar</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
