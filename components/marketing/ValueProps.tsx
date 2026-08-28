import { Sparkle } from "@/components/ui/decor/Sparkle";

const items = [
  { title: "Fast, free shipping", note: "On every order, every time." },
  { title: "Easy 30-day returns", note: "Changed your mind? No worries." },
  { title: "Secure checkout", note: "Your details stay yours." },
  { title: "Real human support", note: "We actually reply." },
];

export function ValueProps() {
  return (
    <section className="rounded-[2.5rem] bg-butter/20 px-6 py-12 sm:px-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="text-center sm:text-left">
            <Sparkle className="mx-auto h-5 w-5 text-lilac-deep sm:mx-0" />
            <p className="mt-2 font-display text-lg">{item.title}</p>
            <p className="mt-1 text-sm text-ink-soft">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
