import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '../../../components/ui/Skeleton';
import { getCollections, getProducts } from '../../../services/commerceService';
import { CollectionSection } from '../components/CollectionSection';
import { ProductCard } from '../components/ProductCard';

export function HomePage() {
  const productsQuery = useQuery({ queryFn: getProducts, queryKey: ['products'] });
  const collectionsQuery = useQuery({ queryFn: getCollections, queryKey: ['collections'] });
  const featuredProducts = productsQuery.data?.filter((product) => product.isFeatured).slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:grid-cols-[1.1fr_0.9fr] md:items-end md:py-14">
        <div className="relative min-h-[520px] overflow-hidden bg-[#e9e3d8]">
          <img
            alt="Nouve seasonal minimalwear campaign"
            className="absolute inset-0 h-full w-full object-cover"
            src="/assets/nouve/hero/hero-seasonal-minimalwear-01.png"
          />
        </div>
        <div className="pb-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-primary)]">
            Premium unisex edit
          </p>
          <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-tight md:text-6xl">
            Quiet pieces for a considered wardrobe.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-[var(--color-text-secondary)]">
            Nouve curates clean silhouettes, neutral tones, and season-ready essentials
            for unisex daily wear.
          </p>
          <Link
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 bg-[var(--color-primary)] px-5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
            to="/products"
          >
            Shop the edit <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
              New arrivals
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Freshly selected</h2>
          </div>
          <Link className="text-sm text-[var(--color-primary)]" to="/products?sort=newest">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productsQuery.isLoading
            ? Array.from({ length: 4 }, (_, index) => (
                <Skeleton
                  aria-label={index === 0 ? 'Loading products' : undefined}
                  className="aspect-[4/5]"
                  key={index}
                />
              ))
            : featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>

      {collectionsQuery.data ? (
        <CollectionSection collections={collectionsQuery.data} />
      ) : (
        <section className="mx-auto max-w-7xl px-5 py-16">
          <Skeleton aria-label="Loading collections" className="h-80" />
        </section>
      )}
    </>
  );
}
