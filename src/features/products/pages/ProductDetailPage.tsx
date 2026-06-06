import { useQuery } from '@tanstack/react-query';
import { Check, Heart, ShoppingBag } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import { getProductById } from '../../../services/commerceService';
import { useCartStore } from '../../../stores/cartStore';
import { useWishlistStore } from '../../../stores/wishlistStore';
import { formatWon } from '../../../utils/currency';
import { getTotalStock } from '../../../utils/filters';

export function ProductDetailPage() {
  const { productId = '' } = useParams();
  const productQuery = useQuery({
    queryFn: () => getProductById(productId),
    queryKey: ['product', productId],
  });
  const addItem = useCartStore((state) => state.addItem);
  const hasProduct = useWishlistStore((state) => state.hasProduct);
  const toggleProduct = useWishlistStore((state) => state.toggleProduct);
  const product = productQuery.data;
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [addedSize, setAddedSize] = useState<string | undefined>(undefined);

  const activeColor = selectedColor ?? product?.colors[0]?.name;
  const totalStock = product ? getTotalStock(product) : 0;
  const isSaved = product ? hasProduct(product.id) : false;
  const selectedSizeStock = selectedSize && product ? product.stockBySize[selectedSize] ?? 0 : 0;
  const canAddToCart = Boolean(product && activeColor && selectedSize && selectedSizeStock > 0);

  const stockTone = useMemo(() => {
    if (totalStock === 0) {
      return 'danger';
    }

    if (totalStock <= 4) {
      return 'warning';
    }

    return 'success';
  }, [totalStock]);

  if (productQuery.isLoading) {
    return (
      <section
        aria-label="Loading product detail"
        className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]"
      >
        <Skeleton className="aspect-[4/5]" />
        <div className="grid content-start gap-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState
          action={
            <Link
              className="inline-flex h-11 items-center justify-center bg-[var(--color-primary)] px-5 text-sm font-medium text-white"
              to="/products"
            >
              Back to products
            </Link>
          }
          description="상품이 숨김 처리되었거나 더 이상 판매되지 않을 수 있습니다."
          title="상품을 찾을 수 없습니다"
        />
      </section>
    );
  }

  const handleAddToCart = () => {
    if (!canAddToCart || !activeColor || !selectedSize) {
      return;
    }

    addItem({
      brand: product.brand,
      image: product.images[0],
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1,
      selectedColor: activeColor,
      selectedSize,
    });
    setAddedSize(selectedSize);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <div className="grid gap-4 sm:grid-cols-[1fr_0.78fr]">
          <div className="overflow-hidden bg-[#efede8] sm:row-span-2">
            <img
              alt={`${product.name} product view`}
              className="aspect-[4/5] h-full w-full object-cover"
              src={product.images[0]}
            />
          </div>
          {(product.images[1] ? product.images.slice(1, 3) : product.images).map((image) => (
            <div className="overflow-hidden bg-[#efede8]" key={image}>
              <img
                alt={`${product.name} alternate view`}
                className="aspect-[4/5] w-full object-cover"
                src={image}
              />
            </div>
          ))}
        </div>

        <div className="content-start lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
                {product.brand}
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
                {product.name}
              </h1>
            </div>
            <button
              aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]"
              onClick={() => toggleProduct(product.id)}
              type="button"
            >
              <Heart
                aria-hidden="true"
                fill={isSaved ? 'var(--color-primary)' : 'none'}
                size={19}
                strokeWidth={1.8}
              />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="text-2xl font-semibold">{formatWon(product.price)}</p>
            {product.originalPrice ? (
              <p className="text-sm text-[var(--color-text-secondary)] line-through">
                {formatWon(product.originalPrice)}
              </p>
            ) : null}
            <Badge tone={stockTone}>
              {totalStock === 0 ? 'Sold out' : totalStock <= 4 ? 'Low stock' : 'In stock'}
            </Badge>
          </div>

          <p className="mt-6 break-keep text-sm leading-7 text-[var(--color-text-secondary)]">
            {product.description}
          </p>

          <div className="mt-8 border-y border-[var(--color-border)] py-6">
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">Color</p>
                {activeColor ? (
                  <p className="text-sm text-[var(--color-text-secondary)]">{activeColor}</p>
                ) : null}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    aria-label={color.name}
                    aria-pressed={activeColor === color.name}
                    className="inline-flex h-10 items-center gap-2 border border-[var(--color-border)] bg-white px-3 text-sm aria-pressed:border-[var(--color-primary)]"
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">Size</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {selectedSize ? `${selectedSize} / ${selectedSizeStock} left` : 'Select one'}
                </p>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {product.sizes.map((size) => {
                  const stock = product.stockBySize[size] ?? 0;
                  const isSoldOut = stock === 0;

                  return (
                    <button
                      aria-label={isSoldOut ? `${size} sold out` : size}
                      aria-pressed={selectedSize === size}
                      className="h-11 border border-[var(--color-border)] bg-white text-sm font-medium aria-pressed:border-[var(--color-primary)] aria-pressed:bg-[var(--color-primary-soft)] disabled:bg-[#f1f0ec] disabled:text-[var(--color-text-secondary)]"
                      disabled={isSoldOut}
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      type="button"
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <Button
              className="h-12"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
              type="button"
            >
              {addedSize !== undefined && addedSize === selectedSize ? <Check aria-hidden="true" size={18} /> : <ShoppingBag aria-hidden="true" size={18} />}
              Add to cart
            </Button>
            <Link
              className="inline-flex h-12 items-center justify-center border border-[var(--color-border)] bg-white px-5 text-sm font-medium hover:border-[var(--color-primary)]"
              to="/cart"
            >
              View bag
            </Link>
          </div>

          <dl className="mt-8 grid gap-4 border-t border-[var(--color-border)] pt-6 text-sm">
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <dt className="text-[var(--color-text-secondary)]">Fit</dt>
              <dd>{product.fit}</dd>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <dt className="text-[var(--color-text-secondary)]">Material</dt>
              <dd>{product.materials.join(', ')}</dd>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <dt className="text-[var(--color-text-secondary)]">Care</dt>
              <dd>{product.care}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
