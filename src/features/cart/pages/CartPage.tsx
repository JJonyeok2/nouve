import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useCartStore } from '../../../stores/cartStore';
import { formatWon } from '../../../utils/currency';

const FREE_SHIPPING_THRESHOLD = 150000;
const STANDARD_SHIPPING_FEE = 3000;
const WELCOME_DISCOUNT = 5000;

function formatPlainWon(amount: number) {
  return new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 }).format(amount);
}

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const discount = subtotal > 0 ? Math.min(WELCOME_DISCOUNT, subtotal) : 0;
  const total = subtotal + shippingFee - discount;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState
          action={
            <Link
              className="inline-flex h-11 items-center justify-center bg-[var(--color-primary)] px-5 text-sm font-medium text-white"
              to="/products"
            >
              Shop products
            </Link>
          }
          description="Add a product from the collection to review checkout details."
          title="Your bag is empty"
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Checkout preview
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Shopping Bag</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {items.reduce((total, item) => total + item.quantity, 0)} items
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4">
          {items.map((item) => (
            <article
              className="grid gap-4 border border-[var(--color-border)] bg-white p-4 sm:grid-cols-[112px_1fr_auto]"
              key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
            >
              <Link className="block overflow-hidden bg-[#efede8]" to={`/products/${item.productId}`}>
                <img
                  alt={item.name}
                  className="aspect-[4/5] w-full object-cover"
                  src={item.image}
                />
              </Link>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  {item.brand}
                </p>
                <Link
                  className="mt-1 block font-medium hover:text-[var(--color-primary)]"
                  to={`/products/${item.productId}`}
                >
                  {item.name}
                </Link>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {item.selectedColor} / {item.selectedSize}
                </p>
                <p className="mt-4 text-sm font-semibold">{formatPlainWon(item.price)}</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <div className="inline-grid h-10 grid-cols-3 border border-[var(--color-border)]">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    className="inline-flex w-10 items-center justify-center hover:bg-[var(--color-primary-soft)]"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.selectedSize,
                        item.quantity - 1,
                        item.selectedColor,
                      )
                    }
                    type="button"
                  >
                    <Minus aria-hidden="true" size={15} />
                  </button>
                  <span className="inline-flex w-10 items-center justify-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    className="inline-flex w-10 items-center justify-center hover:bg-[var(--color-primary-soft)]"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.selectedSize,
                        item.quantity + 1,
                        item.selectedColor,
                      )
                    }
                    type="button"
                  >
                    <Plus aria-hidden="true" size={15} />
                  </button>
                </div>
                <button
                  aria-label={`Remove ${item.name} from cart`}
                  className="inline-flex h-10 w-10 items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"
                  onClick={() => removeItem(item.productId, item.selectedSize, item.selectedColor)}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit border border-[var(--color-border)] bg-white p-5">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <dl className="mt-5 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-[var(--color-text-secondary)]">Subtotal</dt>
              <dd>{formatPlainWon(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--color-text-secondary)]">Shipping</dt>
              <dd>{shippingFee === 0 ? 'Free' : formatWon(shippingFee)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--color-text-secondary)]">Welcome coupon</dt>
              <dd className="text-[var(--color-primary)]">-{formatWon(discount)}</dd>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPlainWon(total)}</dd>
            </div>
          </dl>
          <Link
            className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[var(--color-primary)] px-5 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)]"
            to="/checkout"
          >
            Continue to checkout
          </Link>
          <p className="mt-4 text-xs leading-5 text-[var(--color-text-secondary)]">
            Mock checkout uses local cart data only. Shipping and coupon values are simulated.
          </p>
        </aside>
      </div>
    </section>
  );
}
