import { z } from 'zod';

export const checkoutSchema = z.object({
  address: z.string().min(6, 'Enter a shipping address.'),
  deliveryMemo: z.string().max(80, 'Delivery memo must be 80 characters or less.').optional(),
  paymentMethod: z.enum(['card', 'kakao-pay', 'bank-transfer']),
  phone: z
    .string()
    .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, 'Enter a valid Korean mobile number.'),
  recipientName: z.string().min(2, 'Enter the recipient name.'),
  termsAccepted: z.boolean().refine((value) => value, {
    message: 'Agree to the mock checkout terms.',
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
