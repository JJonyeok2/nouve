import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from './cartStore';

const cartItem = {
  brand: 'Nouve Atelier',
  image: '/assets/nouve/products/woven-shirt-ivory-01.jpg',
  name: 'Ivory Structured Woven Shirt',
  price: 128000,
  productId: 'woven-shirt-ivory',
  quantity: 1,
  selectedColor: 'Ivory',
  selectedSize: 'M',
};

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('adds the same product option by increasing quantity', () => {
    useCartStore.getState().addItem(cartItem);
    useCartStore.getState().addItem(cartItem);

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it('updates quantity and calculates subtotal', () => {
    useCartStore.getState().addItem(cartItem);
    useCartStore.getState().updateQuantity(cartItem.productId, cartItem.selectedSize, 3);

    expect(useCartStore.getState().items[0].quantity).toBe(3);
    expect(useCartStore.getState().getSubtotal()).toBe(384000);
  });

  it('removes cart items by product and size', () => {
    useCartStore.getState().addItem(cartItem);
    useCartStore.getState().removeItem(cartItem.productId, cartItem.selectedSize);

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});

