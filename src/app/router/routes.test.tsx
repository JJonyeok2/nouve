import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

describe('routes', () => {
  it('renders the customer product route inside the customer layout', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/products'] });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('link', { name: 'Nouve' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
  });

  it('renders the admin orders route inside the admin layout', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/admin/orders'] });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('navigation', { name: 'Admin navigation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Orders' })).toBeInTheDocument();
  });
});

