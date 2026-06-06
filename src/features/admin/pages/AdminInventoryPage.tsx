import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '../../../components/ui/Skeleton';
import { getProducts } from '../../../services/commerceService';
import { getTotalStock } from '../../../utils/filters';
import { AdminTable } from '../components/AdminTable';
import { StatusBadge } from '../components/StatusBadge';

export function AdminInventoryPage() {
  const productsQuery = useQuery({ queryFn: getProducts, queryKey: ['products'] });
  const products = productsQuery.data ?? [];
  const inventoryRows = products
    .map((product) => ({
      product,
      sizeEntries: Object.entries(product.stockBySize),
      totalStock: getTotalStock(product),
    }))
    .filter(({ sizeEntries, totalStock }) => totalStock <= 8 || sizeEntries.some(([, stock]) => stock <= 1))
    .sort((left, right) => left.totalStock - right.totalStock);

  if (productsQuery.isLoading) {
    return (
      <section aria-label="Loading admin inventory" className="grid gap-4">
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
            Stock control
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Inventory</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {inventoryRows.length} products need review
        </p>
      </div>

      <div className="mt-6">
        <AdminTable columns={['Product', 'Total', 'Status', 'Size Stock']}>
          {inventoryRows.map(({ product, sizeEntries, totalStock }) => {
            const status = totalStock === 0 ? 'Sold out' : totalStock <= 4 ? 'Low stock' : 'Visible';

            return (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{product.name}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{product.category}</p>
                </td>
                <td className="px-4 py-3">{totalStock}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {sizeEntries.map(([size, stock]) => (
                      <span
                        className="inline-flex items-center bg-[#f6f4ef] px-2.5 py-1 text-xs"
                        key={size}
                      >
                        {size}: {stock}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </AdminTable>
      </div>
    </section>
  );
}
