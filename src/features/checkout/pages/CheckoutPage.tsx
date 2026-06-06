import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, Landmark, MessageCircle } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Input } from '../../../components/ui/Input';
import { useCartStore } from '../../../stores/cartStore';
import { OrderSummary } from '../components/OrderSummary';
import { checkoutSchema, type CheckoutFormValues } from '../schemas/checkoutSchema';
import {
  createMockOrderId,
  getCheckoutTotals,
  type CheckoutOrderSummary,
} from '../utils/orderTotals';

const paymentMethods = [
  { icon: CreditCard, label: 'Card', value: 'card' },
  { icon: MessageCircle, label: 'Kakao Pay', value: 'kakao-pay' },
  { icon: Landmark, label: 'Bank Transfer', value: 'bank-transfer' },
] as const;

export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totals = useMemo(() => getCheckoutTotals(items), [items]);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      deliveryMemo: '',
      paymentMethod: 'card',
      termsAccepted: false,
    },
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (values: CheckoutFormValues) => {
    const orderSummary: CheckoutOrderSummary = {
      ...totals,
      address: values.address,
      createdAt: new Date().toISOString(),
      deliveryMemo: values.deliveryMemo,
      items,
      orderId: createMockOrderId(),
      paymentMethod: values.paymentMethod,
      phone: values.phone,
      recipientName: values.recipientName,
    };

    clearCart();
    navigate('/order-complete', { state: orderSummary });
  };

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
          description="Add products to your bag before starting the mock checkout."
          title="Your bag is empty"
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="border-b border-[var(--color-border)] pb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Secure mock flow
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Checkout</h1>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <form className="grid gap-8" onSubmit={handleSubmit(onSubmit)}>
          <section className="border border-[var(--color-border)] bg-white p-5">
            <h2 className="text-lg font-semibold">Shipping Details</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Input
                error={errors.recipientName?.message}
                id="recipientName"
                label="Recipient name"
                {...register('recipientName')}
              />
              <Input
                error={errors.phone?.message}
                helperText="Example: 010-1234-5678"
                id="phone"
                label="Phone"
                {...register('phone')}
              />
              <Input
                className="md:col-span-2"
                error={errors.address?.message}
                id="address"
                label="Address"
                {...register('address')}
              />
              <Input
                className="md:col-span-2"
                error={errors.deliveryMemo?.message}
                id="deliveryMemo"
                label="Delivery memo"
                {...register('deliveryMemo')}
              />
            </div>
          </section>

          <section className="border border-[var(--color-border)] bg-white p-5">
            <h2 className="text-lg font-semibold">Payment Method</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <label
                    className="flex cursor-pointer items-center gap-3 border border-[var(--color-border)] px-4 py-3 text-sm font-medium has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-[var(--color-primary-soft)]"
                    key={method.value}
                  >
                    <input
                      className="h-4 w-4 accent-[var(--color-primary)]"
                      type="radio"
                      value={method.value}
                      {...register('paymentMethod')}
                    />
                    <Icon aria-hidden="true" size={18} />
                    {method.label}
                  </label>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4 border border-[var(--color-border)] bg-white p-5">
            <label className="flex items-start gap-3 text-sm">
              <input
                className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
                type="checkbox"
                {...register('termsAccepted')}
              />
              <span>Agree to mock checkout terms</span>
            </label>
            {errors.termsAccepted?.message ? (
              <p className="text-xs text-[var(--color-sale)]">{errors.termsAccepted.message}</p>
            ) : null}
            <Button className="h-12 w-full sm:w-fit" disabled={isSubmitting} type="submit">
              Place mock order
            </Button>
          </section>
        </form>

        <OrderSummary items={items} totals={totals} />
      </div>
    </section>
  );
}
