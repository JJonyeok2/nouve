import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { resetMockCommerceData } from '../../../services/commerceService';
import { AdminDashboardPage } from './AdminDashboardPage';
import { AdminInventoryPage } from './AdminInventoryPage';
import { AdminOrdersPage } from './AdminOrdersPage';
import { AdminProductsPage } from './AdminProductsPage';

function renderAdminPage(page: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{page}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('admin pages', () => {
  beforeEach(() => {
    resetMockCommerceData();
  });

  it('renders dashboard metrics from mock commerce data', async () => {
    renderAdminPage(<AdminDashboardPage />);

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading admin dashboard'));

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Recent Orders')).toBeInTheDocument();
  });

  it('toggles product visibility from the products table', async () => {
    const user = userEvent.setup();
    renderAdminPage(<AdminProductsPage />);

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading admin products'));

    await user.click(screen.getByRole('button', { name: 'Hide Ivory Structured Woven Shirt' }));

    expect(
      await screen.findByRole('button', { name: 'Show Ivory Structured Woven Shirt' }),
    ).toBeInTheDocument();
  });

  it('updates order status from the orders table', async () => {
    const user = userEvent.setup();
    renderAdminPage(<AdminOrdersPage />);

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading admin orders'));

    await user.selectOptions(screen.getByLabelText('Status for NO-1002'), 'Shipped');

    await waitFor(() => {
      expect(screen.getByLabelText('Status for NO-1002')).toHaveValue('Shipped');
    });
  });

  it('renders size-level low stock information', async () => {
    renderAdminPage(<AdminInventoryPage />);

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading admin inventory'));

    expect(screen.getByRole('heading', { name: 'Inventory' })).toBeInTheDocument();
    expect(screen.getByText('Ink Cotton Panel Cap')).toBeInTheDocument();
    expect(screen.getByText('OS: 0')).toBeInTheDocument();
  });
});
