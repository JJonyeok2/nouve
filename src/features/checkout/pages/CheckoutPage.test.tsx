import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useCartStore } from '../../../stores/cartStore';
import { CheckoutPage } from './CheckoutPage';
import { OrderCompletePage } from './OrderCompletePage';

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

function renderCheckoutFlow() {
  render(
    <MemoryRouter initialEntries={['/checkout']}>
      <Routes>
        <Route element={<CheckoutPage />} path="/checkout" />
        <Route element={<OrderCompletePage />} path="/order-complete" />
      </Routes>
    </MemoryRouter>,
  );
}

describe('CheckoutPage', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('submits a mock order, clears the cart, and renders order completion', async () => {
    const user = userEvent.setup();
    useCartStore.getState().addItem(cartItem);

    renderCheckoutFlow();

    expect(screen.getByRole('heading', { name: 'Checkout' })).toBeInTheDocument();

    await user.type(screen.getByLabelText('Recipient name'), 'Kim Minjun');
    await user.type(screen.getByLabelText('Phone'), '010-1234-5678');
    await user.type(screen.getByLabelText('Address'), '12 Seongsu-dong, Seoul');
    await user.type(screen.getByLabelText('Delivery memo'), 'Leave at the door');
    await user.click(screen.getByRole('checkbox', { name: 'Agree to mock checkout terms' }));
    await user.click(screen.getByRole('button', { name: 'Place mock order' }));

    expect(await screen.findByRole('heading', { name: 'Order Complete' })).toBeInTheDocument();
    expect(screen.getByText('Ivory Structured Woven Shirt')).toBeInTheDocument();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
