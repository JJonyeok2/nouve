import { useSearchParams } from 'react-router-dom';
import type { ProductSort as ProductSortValue } from '../../../types/commerce';

const sortOptions: { label: string; value: ProductSortValue }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price low to high', value: 'price-asc' },
  { label: 'Price high to low', value: 'price-desc' },
  { label: 'Bestselling', value: 'bestselling' },
];

export function ProductSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') ?? 'newest';

  function handleSortChange(value: string) {
    const next = new URLSearchParams(searchParams);
    next.set('sort', value);
    setSearchParams(next);
  }

  return (
    <label className="grid w-full gap-2 text-sm text-[var(--color-text-secondary)] md:w-auto">
      Sort
      <select
        className="h-11 w-full min-w-0 border border-[var(--color-border)] bg-white px-3 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] md:min-w-52"
        onChange={(event) => handleSortChange(event.target.value)}
        value={currentSort}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
