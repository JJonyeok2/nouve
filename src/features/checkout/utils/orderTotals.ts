import type { CartItem } from '../../../types/commerce';

const FREE_SHIPPING_THRESHOLD = 150000;
const STANDARD_SHIPPING_FEE = 3000;
const WELCOME_DISCOUNT = 5000;

export type CheckoutTotals = {
  discount: number;
  shippingFee: number;
  subtotal: number;
  total: number;
};

export type CheckoutOrderSummary = CheckoutTotals & {
  address: string;
  createdAt: string;
  deliveryMemo?: string;
  items: CartItem[];
  orderId: string;
  paymentMethod: string;
  phone: string;
  recipientName: string;
};

export function getCheckoutTotals(items: CartItem[]): CheckoutTotals {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const discount = subtotal > 0 ? Math.min(WELCOME_DISCOUNT, subtotal) : 0;

  return {
    discount,
    shippingFee,
    subtotal,
    total: subtotal + shippingFee - discount,
  };
}

export function createMockOrderId() {
  return `NV-${Date.now().toString().slice(-6)}`;
}
