import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { products } from '../../../data/products';
import { useCartStore } from '../../../stores/cartStore';
import { useWishlistStore } from '../../../stores/wishlistStore';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useWishlistStore.getState().clearWishlist();
  });

  it('renders product identity, price, colors, and product link', () => {
    render(
      <MemoryRouter>
        <ProductCard product={products[0]} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /Ivory Structured Woven Shirt/i })).toHaveAttribute(
      'href',
      '/products/woven-shirt-ivory',
    );
    expect(screen.getByText('Nouve Atelier')).toBeInTheDocument();
    expect(screen.getByText(/128,000/)).toBeInTheDocument();
    expect(screen.getByLabelText('Ivory')).toBeInTheDocument();
  });

  it('saves products to the wishlist from the card action', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductCard product={products[0]} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Save Ivory Structured Woven Shirt' }));

    expect(useWishlistStore.getState().productIds).toContain('woven-shirt-ivory');
    expect(
      screen.getByRole('button', { name: 'Remove Ivory Structured Woven Shirt from wishlist' }),
    ).toBeInTheDocument();
  });

  it('quick adds the first available product option to the cart', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductCard product={products[0]} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Quick add Ivory Structured Woven Shirt' }));

    expect(useCartStore.getState().items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: 'woven-shirt-ivory',
          quantity: 1,
          selectedColor: 'Ivory',
          selectedSize: 'XS',
        }),
      ]),
    );
  });
});
