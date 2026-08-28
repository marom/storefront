import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { Sparkle } from "@/components/ui/decor/Sparkle";
import { CartCountBadge } from "./CartCountBadge";

const navLink = "text-sm font-medium text-ink-soft transition-colors hover:text-lilac-deep";

export function SiteHeader({
  userEmail,
  isAdmin = false,
}: {
  userEmail: string;
  isAdmin?: boolean;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-1.5">
          <Sparkle className="h-4 w-4 text-lilac-deep" />
          <span className="font-display text-2xl lowercase tracking-tight">storefront</span>
        </Link>

        <nav className="flex items-center gap-7">
          <Link href="/" className={navLink}>
            Shop
          </Link>
          <Link href="/orders" className={navLink}>
            Orders
          </Link>
          <Link href="/cart" className={`${navLink} flex items-center gap-1.5`}>
            Cart
            <CartCountBadge />
          </Link>
          {isAdmin && (
            <Link href="/admin/products" className={navLink}>
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-ink-soft sm:inline">
            {userEmail}
            {isAdmin && (
              <span className="ml-1 font-semibold uppercase text-lilac-deep">admin</span>
            )}
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border-2 border-line px-4 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-ink"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
