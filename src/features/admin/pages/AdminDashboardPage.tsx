import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, Package, ReceiptText, Wallet } from 'lucide-react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Skeleton } from '../../../components/ui/Skeleton';
import { getOrders, getProducts } from '../../../services/commerceService';
import { formatWon } from '../../../utils/currency';
import { getTotalStock } from '../../../utils/filters';
import { AdminMetricCard } from '../components/AdminMetricCard';
import { AdminTable } from '../components/AdminTable';
import { StatusBadge } from '../components/StatusBadge';

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export function AdminDashboardPage() {
  const productsQuery = useQuery({ queryFn: getProducts, queryKey: ['products'] });
  const ordersQuery = useQuery({ queryFn: getOrders, queryKey: ['orders'] });
  const products = productsQuery.data ?? [];
  const orders = ordersQuery.data ?? [];
  const isLoading = productsQuery.isLoading || ordersQuery.isLoading;

  if (isLoading) {
    return (
      <section aria-label="Loading admin dashboard" className="grid gap-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-72" />
      </section>
    );
  }

  const revenue = orders
    .filter((order) => order.status !== 'Cancelled')
    .reduce((total, order) => total + order.total, 0);
  const lowStockProducts = products.filter((product) => getTotalStock(product) <= 4);
  const trendData = orders
    .slice()
    .reverse()
    .map((order) => ({
      date: dateFormatter.format(new Date(order.createdAt)),
      revenue: order.status === 'Cancelled' ? 0 : order.total,
    }));
  const recentOrders = orders.slice(0, 5);

  return (
    <section>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Operations
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Dashboard</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Mock commerce snapshot</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard
          helper="Cancelled orders excluded"
          icon={<Wallet aria-hidden="true" size={20} />}
          label="Revenue"
          value={formatWon(revenue)}
        />
        <AdminMetricCard
          helper="Across current mock data"
          icon={<ReceiptText aria-hidden="true" size={20} />}
          label="Orders"
          value={String(orders.length)}
        />
        <AdminMetricCard
          helper="Visible and hidden products"
          icon={<Package aria-hidden="true" size={20} />}
          label="Products"
          value={String(products.length)}
        />
        <AdminMetricCard
          helper="Total stock of 4 or less"
          icon={<AlertTriangle aria-hidden="true" size={20} />}
          label="Low Stock"
          value={String(lowStockProducts.length)}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="overflow-x-auto border border-[var(--color-border)] bg-white p-5">
          <h2 className="text-lg font-semibold">Revenue Trend</h2>
          <div className="mt-4 min-w-[560px]">
            <LineChart
              data={trendData}
              height={220}
              margin={{ bottom: 0, left: 8, right: 20, top: 10 }}
              width={640}
            >
              <CartesianGrid stroke="#e5e1da" strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} />
              <YAxis tickFormatter={(value) => `${Math.round(Number(value) / 1000)}k`} tickLine={false} />
              <Tooltip formatter={(value) => formatWon(Number(value))} />
              <Line dataKey="revenue" dot={false} stroke="var(--color-primary)" strokeWidth={2} />
            </LineChart>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Recent Orders</h2>
          <AdminTable columns={['Order', 'Customer', 'Status', 'Total']}>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">{order.customerName}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3">{formatWon(order.total)}</td>
              </tr>
            ))}
          </AdminTable>
        </section>
      </div>
    </section>
  );
}
