import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Skeleton } from '../../../components/ui/Skeleton';
import { getOrders, updateOrderStatus } from '../../../services/commerceService';
import type { Order, OrderStatus } from '../../../types/commerce';
import { formatWon } from '../../../utils/currency';
import { AdminTable } from '../components/AdminTable';
import { StatusBadge } from '../components/StatusBadge';

const orderStatuses: OrderStatus[] = ['Paid', 'Preparing', 'Shipped', 'Delivered', 'Cancelled'];
const EMPTY_ORDERS: Order[] = [];

export function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const ordersQuery = useQuery({ queryFn: getOrders, queryKey: ['orders'] });
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const statusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
  const orders = ordersQuery.data ?? EMPTY_ORDERS;
  const visibleOrders = useMemo(
    () => orders.filter((order) => statusFilter === 'all' || order.status === statusFilter),
    [orders, statusFilter],
  );

  if (ordersQuery.isLoading) {
    return (
      <section aria-label="Loading admin orders" className="grid gap-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-80" />
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Fulfillment
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Orders</h1>
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Status
          <select
            className="h-10 min-w-44 border border-[var(--color-border)] bg-white px-3 text-sm"
            onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
            value={statusFilter}
          >
            <option value="all">All</option>
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6">
        <AdminTable columns={['Order', 'Customer', 'Items', 'Status', 'Total', 'Update']}>
          {visibleOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3 font-medium">{order.id}</td>
              <td className="px-4 py-3">
                <p>{order.customerName}</p>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  {order.shippingAddress}
                </p>
              </td>
              <td className="px-4 py-3">
                {order.items.reduce((total, item) => total + item.quantity, 0)}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-4 py-3">{formatWon(order.total)}</td>
              <td className="px-4 py-3">
                <select
                  aria-label={`Status for ${order.id}`}
                  className="h-9 border border-[var(--color-border)] bg-white px-2 text-sm"
                  disabled={statusMutation.isPending}
                  onChange={(event) =>
                    statusMutation.mutate({
                      orderId: order.id,
                      status: event.target.value as OrderStatus,
                    })
                  }
                  value={order.status}
                >
                  {orderStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </section>
  );
}
