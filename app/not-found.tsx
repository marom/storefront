import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md space-y-4 py-16 text-center">
      <h2 className="text-lg font-semibold">Not found</h2>
      <p className="text-sm text-zinc-500">
        We couldn&apos;t find what you were looking for.
      </p>
      <Link href="/" className={buttonClasses()}>
        Back to products
      </Link>
    </div>
  );
}
