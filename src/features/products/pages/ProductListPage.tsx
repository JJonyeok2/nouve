import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import { getProducts } from '../../../services/commerceService';
import type {
  Product,
  ProductFilters as ProductFiltersValue,
  ProductSort,
} from '../../../types/commerce';
import { filterProducts, sortProducts } from '../../../utils/filters';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { ProductSort as ProductSortControl } from '../components/ProductSort';

const EMPTY_PRODUCTS: Product[] = [];

export function ProductListPage() {
  const [searchParams] = useSearchParams();
  const productsQuery = useQuery({ queryFn: getProducts, queryKey: ['products'] });

  const filters = useMemo<ProductFiltersValue>(
    () => ({
      availability: (searchParams.get('availability') as ProductFiltersValue['availability']) ?? 'all',
      category: searchParams.get('category') ?? undefined,
      material: searchParams.get('material') ?? undefined,
      size: searchParams.get('size') ?? undefined,
    }),
    [searchParams],
  );

  const sort = (searchParams.get('sort') as ProductSort | null) ?? 'newest';
  const products = productsQuery.data ?? EMPTY_PRODUCTS;
  const visibleProducts = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [filters, products, sort],
  );

  return (
    <section className="mx-0 w-screen max-w-none overflow-hidden px-5 py-12 md:mx-auto md:max-w-7xl">
      <div className="flex flex-col gap-6 border-b border-[var(--color-border)] pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Catalog
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Products</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
            Browse premium unisex essentials by silhouette, material, size, and stock
            availability.
          </p>
        </div>
        <ProductSortControl />
      </div>

      <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[280px_1fr]">
        <ProductFilters products={products} />
        <div className="min-w-0">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-text-secondary)]">
              {productsQuery.isLoading ? 'Loading selection' : `${visibleProducts.length} items`}
            </p>
          </div>

          {productsQuery.isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton
                  aria-label={index === 0 ? 'Loading products' : undefined}
                  className="aspect-[4/5]"
                  key={index}
                />
              ))}
            </div>
          ) : visibleProducts.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              description="Try clearing a filter or selecting a broader size range."
              title="No products match these filters"
            />
          )}
        </div>
      </div>
    </section>
  );
}
