import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { Sparkle } from "@/components/ui/decor/Sparkle";

export function EmptyCart() {
  return (
    <div className="space-y-4 rounded-3xl bg-lilac/15 p-14 text-center">
      <Sparkle className="mx-auto h-6 w-6 text-lilac-deep" />
      <p className="font-display text-lg">Your cart is empty</p>
      <Link href="/" className={buttonClasses()}>
        Browse products
      </Link>
    </div>
  );
}
