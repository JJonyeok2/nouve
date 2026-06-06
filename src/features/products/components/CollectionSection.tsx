import { Link } from 'react-router-dom';
import type { Collection } from '../../../types/commerce';

type CollectionSectionProps = {
  collections: Collection[];
};

export function CollectionSection({ collections }: CollectionSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Curated edits
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Seasonal collections</h2>
        </div>
        <Link className="hidden text-sm text-[var(--color-primary)] md:inline" to="/products">
          Shop all
        </Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {collections.map((collection) => (
          <Link
            className="group block overflow-hidden bg-white"
            key={collection.id}
            to={`/products?collection=${collection.id}`}
          >
            <img
              alt={collection.title}
              className="aspect-[4/5] w-full bg-[#efede8] object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              src={collection.image}
            />
            <div className="p-4">
              <h3 className="font-medium">{collection.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {collection.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

