import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { CartCountBadge } from "./CartCountBadge";

export function SiteHeader({
  userEmail,
  isAdmin = false,
}: {
  userEmail: string;
  isAdmin?: boolean;
}) {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Storefront
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline">
            Products
          </Link>
          <Link href="/orders" className="hover:underline">
            Orders
          </Link>
          <Link href="/cart" className="flex items-center gap-1.5 hover:underline">
            Cart
            <CartCountBadge />
          </Link>
          {isAdmin && (
            <Link href="/admin/products" className="hover:underline">
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-zinc-500">
            {userEmail}
            {isAdmin && <span className="ml-1 text-xs uppercase text-amber-600">admin</span>}
          </span>
          <form action={logoutAction}>
            <button type="submit" className="font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
