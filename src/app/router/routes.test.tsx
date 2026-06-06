import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

function renderRoute(initialEntry: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const router = createMemoryRouter(routes, { initialEntries: [initialEntry] });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('routes', () => {
  it('shows a customer route fallback while loading split customer pages', () => {
    renderRoute('/products');

    expect(screen.getByLabelText('Loading customer route')).toBeInTheDocument();
  });

  it('renders the customer product route inside the customer layout', async () => {
    renderRoute('/products');

    expect(screen.getByRole('link', { name: 'Nouve' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Products' })).toBeInTheDocument();
  });

  it('renders the admin orders route inside the admin layout', async () => {
    renderRoute('/admin/orders');

    expect(screen.getByRole('navigation', { name: 'Admin navigation' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Orders' })).toBeInTheDocument();
  });
});
