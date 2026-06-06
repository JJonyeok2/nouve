import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import { ProductCard } from '../../products/components/ProductCard';
import { getProducts } from '../../../services/commerceService';
import { useWishlistStore } from '../../../stores/wishlistStore';

export function WishlistPage() {
  const productIds = useWishlistStore((state) => state.productIds);
  const toggleProduct = useWishlistStore((state) => state.toggleProduct);
  const productsQuery = useQuery({ queryFn: getProducts, queryKey: ['products'] });
  const savedProducts = (productsQuery.data ?? []).filter((product) => productIds.includes(product.id));

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Saved edits
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Wishlist</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {productsQuery.isLoading ? 'Loading' : `${savedProducts.length} saved`}
        </p>
      </div>

      {productsQuery.isLoading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton
              aria-label={index === 0 ? 'Loading wishlist' : undefined}
              className="aspect-[4/5]"
              key={index}
            />
          ))}
        </div>
      ) : savedProducts.length > 0 ? (
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {savedProducts.map((product) => (
            <div className="grid gap-3" key={product.id}>
              <ProductCard product={product} />
              <button
                aria-label={`Remove ${product.name} from saved products`}
                className="inline-flex h-10 items-center justify-center gap-2 border border-[var(--color-border)] bg-white px-4 text-sm font-medium hover:border-[var(--color-primary)]"
                onClick={() => toggleProduct(product.id)}
                type="button"
              >
                <X aria-hidden="true" size={16} />
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            action={
              <Link
                className="inline-flex h-11 items-center justify-center bg-[var(--color-primary)] px-5 text-sm font-medium text-white"
                to="/products"
              >
                Browse products
              </Link>
            }
            description="Save product edits while browsing and return here before checkout."
            title="No saved products yet"
          />
        </div>
      )}
      <div className="mt-8 flex justify-end">
        <Button
          disabled={productIds.length === 0}
          onClick={() => productIds.forEach((productId) => toggleProduct(productId))}
          type="button"
          variant="secondary"
        >
          Clear wishlist
        </Button>
      </div>
    </section>
  );
}
