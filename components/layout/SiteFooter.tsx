import Link from "next/link";
import { Squiggle } from "@/components/ui/decor/Squiggle";
import { NewsletterForm } from "./NewsletterForm";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/" },
      { label: "Your orders", href: "/orders" },
      { label: "Cart", href: "/cart" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & returns", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our story", href: "#" },
      { label: "Ingredients", href: "#" },
      { label: "Reviews", href: "#" },
    ],
  },
];

function SocialGlyph({ path, label }: { path: string; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink transition-colors hover:bg-ink hover:text-cream"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d={path} />
      </svg>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 rounded-t-[2.5rem] bg-lilac/15">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-2xl">Let&rsquo;s keep in touch</p>
            <span className="mt-1 block h-2 w-28 text-lilac-deep">
              <Squiggle className="h-full w-full" />
            </span>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              Little updates, new arrivals, the occasional treat. No spam, promise.
            </p>
            <NewsletterForm />
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-ink-soft transition-colors hover:text-lilac-deep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <div className="flex gap-2">
            <SocialGlyph
              label="Instagram"
              path="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1a3.5 3.5 0 0 0-.8-1.3 3.5 3.5 0 0 0-1.3-.8c-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm5.1-8.3a1.1 1.1 0 1 1 0 2.3 1.1 1.1 0 0 1 0-2.3Z"
            />
            <SocialGlyph
              label="TikTok"
              path="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v2.5c-1.2.1-2.3-.2-3.5-.9v6.6c0 3.5-2.6 6-6 6a6 6 0 0 1-3-11.2v2.7a3.4 3.4 0 1 0 4.5 3.2V3h4Z"
            />
            <SocialGlyph
              label="YouTube"
              path="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z"
            />
          </div>
          <p className="text-center text-xs text-ink-soft">
            © {new Date().getFullYear()} storefront — demo over the Spring Boot ecommerce-api
          </p>
        </div>
      </div>
    </footer>
  );
}
