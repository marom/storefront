import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui/Card";
import { Sparkle } from "@/components/ui/decor/Sparkle";
import { Squiggle } from "@/components/ui/decor/Squiggle";

export const metadata: Metadata = { title: "Create account — Storefront" };

export default async function RegisterPage() {
  if (await getSession()) redirect("/");

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-12">
      <div className="mb-6 flex items-center gap-1.5">
        <Sparkle className="h-4 w-4 text-lilac-deep" />
        <span className="font-display text-2xl lowercase">storefront</span>
      </div>
      <Card>
        <h1 className="text-2xl">Create your account</h1>
        <span className="mt-1 mb-5 block h-2 w-24 text-lilac-deep">
          <Squiggle className="h-full w-full" />
        </span>
        <RegisterForm />
        <p className="mt-4 text-sm text-ink-soft">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-lilac-deep underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
