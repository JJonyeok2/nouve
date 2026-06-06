import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useWishlistStore } from '../../../stores/wishlistStore';
import { WishlistPage } from './WishlistPage';

function renderWishlist() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <WishlistPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('WishlistPage', () => {
  beforeEach(() => {
    useWishlistStore.getState().clearWishlist();
  });

  it('renders saved products and removes them from the wishlist', async () => {
    const user = userEvent.setup();
    useWishlistStore.getState().toggleProduct('woven-shirt-ivory');

    renderWishlist();

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading wishlist'));

    expect(screen.getByRole('heading', { name: 'Wishlist' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ivory Structured Woven Shirt/i })).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Remove Ivory Structured Woven Shirt from saved products' }),
    );

    expect(screen.queryByRole('link', { name: /Ivory Structured Woven Shirt/i })).not.toBeInTheDocument();
  });
});
