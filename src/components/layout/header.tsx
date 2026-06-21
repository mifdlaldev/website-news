"use client";

import Link from "next/link";
import { Search, PenLine, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

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
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between gap-4 px-4 md:px-8">
        {/* Mobile menu trigger */}
        <Sheet>
          <SheetTrigger
            className="flex md:hidden items-center justify-center size-9 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Buka menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="mt-8 flex flex-col gap-1" aria-label="Navigasi utama">
              {navLinks.map((link) => (
                <SheetClose key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-4 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <Separator className="my-4" />
              <SheetClose>
                <Link
                  href="/auth/login"
                  className="block rounded-md px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  Masuk
                </Link>
              </SheetClose>
              <div className="px-4 pt-2">
                <SheetClose>
                  <Link href="/auth/register">
                    <Button size="sm" className="w-full">
                      Daftar
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <span className="text-xl font-bold tracking-tight text-foreground font-ui">
            Website<span className="text-primary">News</span>
          </span>
        </Link>

        {/* Desktop nav - minimal */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Cari">
            <Search className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex gap-1.5 text-muted-foreground"
          >
            <PenLine className="size-4" />
            Tulis
          </Button>
          <Button size="sm" className="hidden md:inline-flex">
            <Link href="/auth/login">Masuk</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
