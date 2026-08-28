export function OrderConfirmationHeader({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-950">
      <h1 className="text-xl font-semibold text-green-800 dark:text-green-300">
        Thank you for your order!
      </h1>
      <p className="mt-1 text-sm text-green-700 dark:text-green-400">
        Your order <span className="font-medium">{orderNumber}</span> has been placed.
      </p>
    </div>
  );
}
