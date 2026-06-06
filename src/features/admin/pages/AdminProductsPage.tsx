import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, EyeOff, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Skeleton } from '../../../components/ui/Skeleton';
import { getProducts, updateProductVisibility } from '../../../services/commerceService';
import type { Product } from '../../../types/commerce';
import { formatWon } from '../../../utils/currency';
import { getTotalStock } from '../../../utils/filters';
import { AdminTable } from '../components/AdminTable';
import { StatusBadge } from '../components/StatusBadge';

const EMPTY_PRODUCTS: Product[] = [];

export function AdminProductsPage() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery({ queryFn: getProducts, queryKey: ['products'] });
  const [search, setSearch] = useState('');
  const [visibility, setVisibility] = useState<'all' | 'hidden' | 'visible'>('all');
  const visibilityMutation = useMutation({
    mutationFn: ({ isVisible, productId }: { isVisible: boolean; productId: string }) =>
      updateProductVisibility(productId, isVisible),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const products = productsQuery.data ?? EMPTY_PRODUCTS;
  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = [product.name, product.brand, product.category]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesVisibility =
          visibility === 'all' ||
          (visibility === 'visible' && product.isVisible) ||
          (visibility === 'hidden' && !product.isVisible);

        return matchesSearch && matchesVisibility;
      }),
    [products, search, visibility],
  );

  if (productsQuery.isLoading) {
    return (
      <section aria-label="Loading admin products" className="grid gap-4">
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
            Catalog operations
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Products</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">{visibleProducts.length} rows</p>
      </div>

      <div className="mt-6 grid gap-3 border border-[var(--color-border)] bg-white p-4 md:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-9 text-[var(--color-text-secondary)]"
            size={17}
          />
          <Input
            className="pl-9"
            id="admin-product-search"
            label="Search products"
            onChange={(event) => setSearch(event.target.value)}
            value={search}
          />
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Visibility
          <select
            className="h-11 border border-[var(--color-border)] bg-white px-3 text-sm"
            onChange={(event) => setVisibility(event.target.value as typeof visibility)}
            value={visibility}
          >
            <option value="all">All</option>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </select>
        </label>
      </div>

      <div className="mt-4">
        <AdminTable columns={['Product', 'Category', 'Price', 'Stock', 'Visibility', 'Action']}>
          {visibleProducts.map((product) => {
            const stock = getTotalStock(product);

            return (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      alt={product.name}
                      className="h-14 w-11 bg-[#efede8] object-cover"
                      src={product.images[0]}
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{formatWon(product.price)}</td>
                <td className="px-4 py-3">{stock}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={product.isVisible ? 'Visible' : 'Hidden'} />
                </td>
                <td className="px-4 py-3">
                  <Button
                    aria-label={product.isVisible ? `Hide ${product.name}` : `Show ${product.name}`}
                    className="h-9 px-3"
                    disabled={visibilityMutation.isPending}
                    onClick={() =>
                      visibilityMutation.mutate({
                        isVisible: !product.isVisible,
                        productId: product.id,
                      })
                    }
                    variant="secondary"
                  >
                    {product.isVisible ? (
                      <EyeOff aria-hidden="true" size={16} />
                    ) : (
                      <Eye aria-hidden="true" size={16} />
                    )}
                    {product.isVisible ? 'Hide' : 'Show'}
                  </Button>
                </td>
              </tr>
            );
          })}
        </AdminTable>
      </div>
    </section>
  );
}
