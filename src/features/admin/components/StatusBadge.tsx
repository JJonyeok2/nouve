import { Badge } from '../../../components/ui/Badge';
import type { OrderStatus, ProductStatus } from '../../../types/commerce';

type StatusBadgeProps = {
  status: OrderStatus | ProductStatus | 'Hidden' | 'Low stock' | 'Sold out' | 'Visible';
};

const statusTone = {
  Active: 'success',
  Archived: 'neutral',
  Cancelled: 'danger',
  Delivered: 'success',
  Draft: 'warning',
  Hidden: 'neutral',
  'Low stock': 'warning',
  Paid: 'primary',
  Preparing: 'warning',
  Shipped: 'primary',
  'Sold out': 'danger',
  Visible: 'success',
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge tone={statusTone[status]}>{status}</Badge>;
}
