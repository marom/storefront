import { Sparkle } from "@/components/ui/decor/Sparkle";

export function OrderConfirmationHeader({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="rounded-3xl bg-mint/40 p-8 text-center shadow-soft">
      <Sparkle className="mx-auto h-6 w-6 text-lilac-deep" />
      <h1 className="mt-2 text-2xl">Thank you for your order!</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Your order <span className="font-semibold text-ink">{orderNumber}</span> has been placed.
      </p>
    </div>
  );
}
