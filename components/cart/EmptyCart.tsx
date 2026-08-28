import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export function EmptyCart() {
  return (
    <div className="space-y-4 rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
      <p className="text-sm text-zinc-500">Your cart is empty.</p>
      <Link href="/" className={buttonClasses()}>
        Browse products
      </Link>
    </div>
  );
}
