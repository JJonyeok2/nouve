import { useQuery } from '@tanstack/react-query';
import { SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
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
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
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
          <p className="mt-3 max-w-2xl break-keep text-sm leading-6 text-[var(--color-text-secondary)]">
            실루엣, 소재, 사이즈, 재고 상태를 기준으로 프리미엄 유니섹스
            에센셜을 탐색해보세요.
          </p>
        </div>
        <ProductSortControl />
      </div>

      <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <ProductFilters products={products} />
        </div>
        <div className="min-w-0">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-text-secondary)]">
              {productsQuery.isLoading ? 'Loading selection' : `${visibleProducts.length} items`}
            </p>
            <Button
              aria-controls="mobile-product-filters"
              aria-expanded={isFilterDrawerOpen}
              aria-label="Open filters"
              className="h-10 px-4 lg:hidden"
              onClick={() => setIsFilterDrawerOpen(true)}
              variant="secondary"
            >
              <SlidersHorizontal aria-hidden="true" size={16} />
              Filters
            </Button>
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
              description="필터를 줄이거나 더 넓은 사이즈 범위를 선택해보세요."
              title="조건에 맞는 상품이 없습니다"
            />
          )}
        </div>
      </div>

      {isFilterDrawerOpen ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <button
            aria-label="Close filters"
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsFilterDrawerOpen(false)}
            type="button"
          />
          <div
            aria-label="Product filters"
            aria-modal="true"
            className="absolute inset-x-0 bottom-0 max-h-[82vh] overflow-y-auto bg-white p-5 shadow-2xl"
            id="mobile-product-filters"
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  Refine
                </p>
                <h2 className="mt-2 text-xl font-semibold">Product filters</h2>
              </div>
              <button
                aria-label="Close filters"
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] bg-white"
                onClick={() => setIsFilterDrawerOpen(false)}
                type="button"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <ProductFilters className="mt-5 border-0 p-0" products={products} />
            <div className="sticky bottom-0 mt-6 border-t border-[var(--color-border)] bg-white pt-4">
              <Button className="h-12 w-full" onClick={() => setIsFilterDrawerOpen(false)}>
                Show results ({visibleProducts.length})
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
