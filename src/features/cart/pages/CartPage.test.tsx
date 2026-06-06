import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useCartStore } from '../../../stores/cartStore';
import { CartPage } from './CartPage';

const cartItem = {
  brand: 'Nouve Atelier',
  image: '/assets/nouve/products/woven-shirt-ivory-01.jpg',
  name: 'Ivory Structured Woven Shirt',
  price: 128000,
  productId: 'woven-shirt-ivory',
  quantity: 1,
  selectedColor: 'Ivory',
  selectedSize: 'M',
};

describe('CartPage', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('updates item quantity and order total from the cart store', async () => {
    const user = userEvent.setup();
    useCartStore.getState().addItem(cartItem);

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Shopping Bag' })).toBeInTheDocument();
    expect(screen.getByText('Ivory Structured Woven Shirt')).toBeInTheDocument();
    expect(screen.getAllByText('128,000')).not.toHaveLength(0);

    await user.click(screen.getByRole('button', { name: 'Increase Ivory Structured Woven Shirt quantity' }));

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('256,000')).toBeInTheDocument();
  });
});
