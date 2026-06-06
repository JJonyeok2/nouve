import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { Input } from './Input';
import { Skeleton } from './Skeleton';

describe('UI primitives', () => {
  it('renders a primary button with accessible label', () => {
    render(<Button>Shop now</Button>);

    expect(screen.getByRole('button', { name: 'Shop now' })).toBeInTheDocument();
  });

  it('renders a badge with its status text', () => {
    render(<Badge tone="success">In stock</Badge>);

    expect(screen.getByText('In stock')).toBeInTheDocument();
  });

  it('connects input label and helper text', () => {
    render(<Input id="email" label="Email" helperText="Receipt email address" />);

    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'Receipt email address',
    );
  });

  it('renders an empty state action', () => {
    render(<EmptyState title="No products" action={<Button>Reset filters</Button>} />);

    expect(screen.getByText('No products')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset filters' })).toBeInTheDocument();
  });

  it('renders a skeleton with an accessible label', () => {
    render(<Skeleton aria-label="Loading products" />);

    expect(screen.getByLabelText('Loading products')).toBeInTheDocument();
  });
});

