import { Heart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { useCartStore } from '../../../stores/cartStore';
import { useWishlistStore } from '../../../stores/wishlistStore';
import type { Product } from '../../../types/commerce';
import { formatWon } from '../../../utils/currency';
import { getTotalStock } from '../../../utils/filters';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isSaved = useWishlistStore((state) => state.productIds.includes(product.id));
  const toggleProduct = useWishlistStore((state) => state.toggleProduct);
  const totalStock = getTotalStock(product);
  const stockLabel = totalStock === 0 ? 'Sold out' : totalStock <= 4 ? 'Low stock' : 'In stock';
  const firstAvailableSize = product.sizes.find((size) => (product.stockBySize[size] ?? 0) > 0);
  const firstColor = product.colors[0]?.name;

  const handleQuickAdd = () => {
    if (!firstAvailableSize || !firstColor) {
      return;
    }

    addItem({
      brand: product.brand,
      image: product.images[0],
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1,
      selectedColor: firstColor,
      selectedSize: firstAvailableSize,
    });
  };

  return (
    <article className="group">
      <Link
        aria-label="Open product media"
        className="block overflow-hidden bg-[#efede8]"
        to={`/products/${product.id}`}
      >
        <img
          alt={`${product.name} in ${product.colors[0]?.name ?? 'selected color'}`}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          src={product.images[0]}
        />
      </Link>
      <div className="mt-4 grid gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              {product.brand}
            </p>
            <Link
              className="mt-1 block text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)]"
              to={`/products/${product.id}`}
            >
              {product.name}
            </Link>
          </div>
          <button
            aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center hover:bg-[var(--color-primary-soft)]"
            onClick={() => toggleProduct(product.id)}
            type="button"
          >
            <Heart
              aria-hidden="true"
              fill={isSaved ? 'var(--color-primary)' : 'none'}
              size={18}
            />
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">{formatWon(product.price)}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{stockLabel}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <span
                aria-label={color.name}
                className="h-4 w-4 border border-black/10"
                key={color.name}
                role="img"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
          <Button
            aria-label={`Quick add ${product.name}`}
            className="h-9 px-3"
            disabled={totalStock === 0}
            onClick={handleQuickAdd}
            variant="ghost"
          >
            <Plus aria-hidden="true" size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
}
