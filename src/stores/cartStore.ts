import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../types/commerce';

type CartState = {
  addItem: (item: CartItem) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  items: CartItem[];
  removeItem: (productId: string, selectedSize: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, selectedSize: string, quantity: number, selectedColor?: string) => void;
};

const isSameOption = (
  item: CartItem,
  productId: string,
  selectedSize: string,
  selectedColor?: string,
) =>
  item.productId === productId &&
  item.selectedSize === selectedSize &&
  (selectedColor === undefined || item.selectedColor === selectedColor);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((cartItem) =>
            isSameOption(cartItem, item.productId, item.selectedSize, item.selectedColor),
          );

          if (!existingItem) {
            return { items: [...state.items, { ...item, quantity: Math.max(1, item.quantity) }] };
          }

          return {
            items: state.items.map((cartItem) =>
              isSameOption(cartItem, item.productId, item.selectedSize, item.selectedColor)
                ? { ...cartItem, quantity: cartItem.quantity + Math.max(1, item.quantity) }
                : cartItem,
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      getItemCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getSubtotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      removeItem: (productId, selectedSize, selectedColor) =>
        set((state) => ({
          items: state.items.filter((item) => !isSameOption(item, productId, selectedSize, selectedColor)),
        })),
      updateQuantity: (productId, selectedSize, quantity, selectedColor) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => !isSameOption(item, productId, selectedSize, selectedColor)),
            };
          }

          return {
            items: state.items.map((item) =>
              isSameOption(item, productId, selectedSize, selectedColor) ? { ...item, quantity } : item,
            ),
          };
        }),
    }),
    {
      name: 'nouve-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
