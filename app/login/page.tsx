import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Sign in — Storefront" };

export default async function LoginPage() {
  if (await getSession()) redirect("/");

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-1 mb-6 text-sm text-zinc-500">to the Storefront demo</p>
      <LoginForm />
      <p className="mt-4 text-sm text-zinc-500">
        No account?{" "}
        <Link href="/register" className="font-medium underline">
          Create one
        </Link>
      </p>
      <p className="mt-6 text-xs text-zinc-400">
        Demo accounts: <code>john.doe@example.com</code> / <code>password123</code>
      </p>
    </div>
  );
}
