import { describe, expect, it } from 'vitest';
import { checkoutSchema } from './checkoutSchema';

const validCheckoutValues = {
  address: '12 Seongsu-dong, Seoul',
  deliveryMemo: 'Leave at the door',
  paymentMethod: 'card',
  phone: '010-1234-5678',
  recipientName: 'Kim Minjun',
  termsAccepted: true,
};

describe('checkoutSchema', () => {
  it('accepts a complete mock checkout payload', () => {
    expect(checkoutSchema.safeParse(validCheckoutValues).success).toBe(true);
  });

  it('rejects invalid phone numbers and missing terms agreement', () => {
    const result = checkoutSchema.safeParse({
      ...validCheckoutValues,
      phone: '123',
      termsAccepted: false,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phone).toBeDefined();
      expect(result.error.flatten().fieldErrors.termsAccepted).toBeDefined();
    }
  });
});
