import { beforeEach, describe, expect, it } from 'vitest';
import { useWishlistStore } from './wishlistStore';

describe('wishlistStore', () => {
  beforeEach(() => {
    useWishlistStore.getState().clearWishlist();
  });

  it('toggles product ids in the wishlist', () => {
    useWishlistStore.getState().toggleProduct('woven-shirt-ivory');
    expect(useWishlistStore.getState().productIds).toContain('woven-shirt-ivory');

    useWishlistStore.getState().toggleProduct('woven-shirt-ivory');
    expect(useWishlistStore.getState().productIds).not.toContain('woven-shirt-ivory');
  });
});

