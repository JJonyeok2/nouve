import { SlidersHorizontal } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import type { Product } from '../../../types/commerce';

type ProductFiltersProps = {
  products: Product[];
};

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((left, right) => left.localeCompare(right));
}

export function ProductFilters({ products }: ProductFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      categories: uniqueSorted(products.map((product) => product.category)),
      materials: uniqueSorted(products.flatMap((product) => product.materials)),
      sizes: uniqueSorted(products.flatMap((product) => product.sizes)),
    }),
    [products],
  );

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams);

    if (next.get(key) === value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    setSearchParams(next);
  }

  function resetFilters() {
    const next = new URLSearchParams(searchParams);
    next.delete('category');
    next.delete('size');
    next.delete('material');
    next.delete('availability');
    setSearchParams(next);
  }

  return (
    <aside className="min-w-0 border border-[var(--color-border)] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal aria-hidden="true" size={18} />
          <h2 className="text-sm font-semibold">Filters</h2>
        </div>
        <button
          className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
          onClick={resetFilters}
          type="button"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 grid gap-6">
        <FilterGroup
          activeValue={searchParams.get('category')}
          label="Category"
          onSelect={(value) => updateFilter('category', value)}
          values={filters.categories}
        />
        <FilterGroup
          activeValue={searchParams.get('size')}
          label="Size"
          onSelect={(value) => updateFilter('size', value)}
          values={filters.sizes}
        />
        <FilterGroup
          activeValue={searchParams.get('material')}
          label="Material"
          onSelect={(value) => updateFilter('material', value)}
          values={filters.materials}
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
            Availability
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['in-stock', 'low-stock', 'sold-out'].map((value) => (
              <Button
                className="h-9 max-w-full whitespace-normal px-3"
                key={value}
                onClick={() => updateFilter('availability', value)}
                variant={searchParams.get('availability') === value ? 'primary' : 'secondary'}
              >
                {value.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function FilterGroup({
  activeValue,
  label,
  onSelect,
  values,
}: {
  activeValue: string | null;
  label: string;
  onSelect: (value: string) => void;
  values: string[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
        {label}
      </p>
      <div className="mt-3 flex min-w-0 flex-wrap gap-2">
        {values.map((value) => (
          <Button
            className="h-9 max-w-full whitespace-normal px-3"
            key={value}
            onClick={() => onSelect(value)}
            variant={activeValue === value ? 'primary' : 'secondary'}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
}
