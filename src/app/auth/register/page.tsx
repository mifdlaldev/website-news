import Link from "next/link";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-sm flex-col justify-center px-4 py-16">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Daftar
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Buat akun baru untuk mulai membaca dan menulis.
      </p>

      <form className="mt-8 flex flex-col gap-5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
            <Input id="name" type="text" placeholder="Nama Anda" autoComplete="name" />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="nama@email.com" autoComplete="email" />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
            <Input id="password" type="password" placeholder="Minimal 8 karakter" autoComplete="new-password" />
          </Field>
        </FieldGroup>

        <Button type="submit" className="w-full">
          Daftar
        </Button>
      </form>

      <div className="mt-8 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">atau</span>
        <Separator className="flex-1" />
      </div>

      <a
        href="/auth/oauth/google"
        className={buttonVariants({ variant: "outline", className: "mt-6 w-full" })}
      >
        Lanjutkan dengan Google
      </a>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href="/auth/login" className="font-medium text-primary transition-colors duration-150 hover:text-primary/80">
          Masuk
        </Link>
      </p>
    </div>
  );
}
