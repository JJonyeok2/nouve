import type { CartItem } from '../../../types/commerce';
import { formatWon } from '../../../utils/currency';
import type { CheckoutTotals } from '../utils/orderTotals';

type OrderSummaryProps = {
  items: CartItem[];
  totals: CheckoutTotals;
};

export function OrderSummary({ items, totals }: OrderSummaryProps) {
  return (
    <aside className="h-fit border border-[var(--color-border)] bg-white p-5">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <div
            className="grid grid-cols-[64px_1fr_auto] gap-3"
            key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
          >
            <img
              alt={item.name}
              className="aspect-[4/5] w-16 bg-[#efede8] object-cover"
              src={item.image}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.name}</p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                {item.selectedColor} / {item.selectedSize} / Qty {item.quantity}
              </p>
            </div>
            <p className="text-sm font-semibold">{formatWon(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <dl className="mt-5 grid gap-3 border-t border-[var(--color-border)] pt-5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-[var(--color-text-secondary)]">Subtotal</dt>
          <dd>{formatWon(totals.subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[var(--color-text-secondary)]">Shipping</dt>
          <dd>{totals.shippingFee === 0 ? 'Free' : formatWon(totals.shippingFee)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[var(--color-text-secondary)]">Welcome coupon</dt>
          <dd className="text-[var(--color-primary)]">-{formatWon(totals.discount)}</dd>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-base font-semibold">
          <dt>Total</dt>
          <dd>{formatWon(totals.total)}</dd>
        </div>
      </dl>
    </aside>
  );
}
