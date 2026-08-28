import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { Blob } from "@/components/ui/decor/Blob";
import { Squiggle } from "@/components/ui/decor/Squiggle";
import { Stars } from "@/components/product/Stars";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-lilac/25 px-6 py-16 text-center sm:px-12 sm:py-20">
      <Blob className="pointer-events-none absolute -left-16 -top-10 h-64 w-64 text-peach/70 blur-2xl" />
      <Blob className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 text-butter/70 blur-2xl" />

      <div className="relative mx-auto max-w-2xl">
        <p className="eyebrow">Everyday essentials</p>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
          Good things,
          <br />
          nicely boxed.
        </h1>
        <span className="mx-auto mt-2 block h-3 w-48 text-lilac-deep">
          <Squiggle className="h-full w-full" />
        </span>
        <p className="mx-auto mt-5 max-w-md text-ink-soft">
          A tidy little catalogue of the stuff you actually use — picked well,
          priced fairly, shipped fast.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Link href="#shop" className={buttonClasses("primary")}>
            Shop all
          </Link>
          <div className="flex items-center gap-2 text-sm text-ink-soft">
            <Stars rating={5} className="text-butter" />
            loved by 5,000+ shoppers
          </div>
        </div>
      </div>
    </section>
  );
}
