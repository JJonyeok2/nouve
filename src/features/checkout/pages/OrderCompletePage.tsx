import { CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { EmptyState } from '../../../components/ui/EmptyState';
import { OrderSummary } from '../components/OrderSummary';
import type { CheckoutOrderSummary } from '../utils/orderTotals';

export function OrderCompletePage() {
  const location = useLocation();
  const orderSummary = location.state as CheckoutOrderSummary | null;

  if (!orderSummary) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState
          action={
            <Link
              className="inline-flex h-11 items-center justify-center bg-[var(--color-primary)] px-5 text-sm font-medium text-white"
              to="/products"
            >
              Continue shopping
            </Link>
          }
          description="Mock 주문 정보는 현재 결제 이동 흐름 안에서만 유지됩니다."
          title="최근 주문 정보가 없습니다"
        />
      </section>
    );
  }

  const totals = {
    discount: orderSummary.discount,
    shippingFee: orderSummary.shippingFee,
    subtotal: orderSummary.subtotal,
    total: orderSummary.total,
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <div className="border-b border-[var(--color-border)] pb-8">
            <CheckCircle2
              aria-hidden="true"
              className="text-[var(--color-primary)]"
              size={34}
              strokeWidth={1.8}
            />
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
              {orderSummary.orderId}
            </p>
            <h1 className="mt-3 text-4xl font-semibold">Order Complete</h1>
            <p className="mt-3 max-w-2xl break-keep text-sm leading-6 text-[var(--color-text-secondary)]">
              로컬에서 Mock 주문이 생성되었습니다. 실제 결제는 진행되지 않았습니다.
            </p>
          </div>

          <dl className="mt-8 grid gap-4 border border-[var(--color-border)] bg-white p-5 text-sm">
            <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
              <dt className="text-[var(--color-text-secondary)]">Recipient</dt>
              <dd>{orderSummary.recipientName}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
              <dt className="text-[var(--color-text-secondary)]">Phone</dt>
              <dd>{orderSummary.phone}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
              <dt className="text-[var(--color-text-secondary)]">Address</dt>
              <dd>{orderSummary.address}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
              <dt className="text-[var(--color-text-secondary)]">Payment</dt>
              <dd>{orderSummary.paymentMethod}</dd>
            </div>
          </dl>

          <Link
            className="mt-6 inline-flex h-11 items-center justify-center bg-[var(--color-primary)] px-5 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)]"
            to="/products"
          >
            Continue shopping
          </Link>
        </div>

        <OrderSummary items={orderSummary.items} totals={totals} />
      </div>
    </section>
  );
}
