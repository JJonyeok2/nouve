import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductListPage } from './ProductListPage';

function renderProductList(initialEntry = '/products') {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <ProductListPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('ProductListPage', () => {
  it('renders products loaded from the mock service', async () => {
    renderProductList();

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading products'));

    expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ivory Structured Woven Shirt/i })).toBeInTheDocument();
  });

  it('applies URL filters to product results', async () => {
    renderProductList('/products?category=Shirts&size=M&material=Cotton');

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading products'));

    expect(screen.getByRole('link', { name: /Ivory Structured Woven Shirt/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Charcoal Wide Trousers/i })).not.toBeInTheDocument();
  });
});

