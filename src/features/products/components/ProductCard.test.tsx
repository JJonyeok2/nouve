import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { products } from '../../../data/products';

describe('ProductCard', () => {
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
    expect(screen.getByText('₩128,000')).toBeInTheDocument();
    expect(screen.getByLabelText('Ivory')).toBeInTheDocument();
  });
});

