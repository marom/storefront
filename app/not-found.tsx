import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { Sparkle } from "@/components/ui/decor/Sparkle";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md space-y-4 py-20 text-center">
      <Sparkle className="mx-auto h-7 w-7 text-lilac-deep" />
      <h2 className="text-2xl">Nothing here</h2>
      <p className="text-sm text-ink-soft">
        We couldn&apos;t find what you were looking for.
      </p>
      <Link href="/" className={buttonClasses()}>
        Back to the shop
      </Link>
    </div>
  );
}
