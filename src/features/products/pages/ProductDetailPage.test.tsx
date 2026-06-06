import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useCartStore } from '../../../stores/cartStore';
import { useWishlistStore } from '../../../stores/wishlistStore';
import { ProductDetailPage } from './ProductDetailPage';

function renderProductDetail(productId = 'woven-shirt-ivory') {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/products/${productId}`]}>
        <Routes>
          <Route element={<ProductDetailPage />} path="/products/:productId" />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('ProductDetailPage', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useWishlistStore.getState().clearWishlist();
  });

  it('requires a size before adding a product to the cart', async () => {
    const user = userEvent.setup();
    renderProductDetail();

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading product detail'));

    expect(screen.getByRole('heading', { name: 'Ivory Structured Woven Shirt' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'M' }));
    await user.click(screen.getByRole('button', { name: 'Add to cart' }));

    expect(useCartStore.getState().items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: 'woven-shirt-ivory',
          quantity: 1,
          selectedColor: 'Ivory',
          selectedSize: 'M',
        }),
      ]),
    );
  });

  it('disables sold-out sizes', async () => {
    renderProductDetail('rib-knit-oatmeal');

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading product detail'));

    expect(screen.getByRole('button', { name: 'XS sold out' })).toBeDisabled();
  });
});
