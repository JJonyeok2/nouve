import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistState = {
  clearWishlist: () => void;
  hasProduct: (productId: string) => boolean;
  productIds: string[];
  toggleProduct: (productId: string) => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      clearWishlist: () => set({ productIds: [] }),
      hasProduct: (productId) => get().productIds.includes(productId),
      toggleProduct: (productId) =>
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId],
        })),
    }),
    {
      name: 'nouve-wishlist',
      partialize: (state) => ({ productIds: state.productIds }),
    },
  ),
);
