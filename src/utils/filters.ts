import type { Product, ProductFilters, ProductSort } from '../types/commerce';

export function getTotalStock(product: Product) {
  return Object.values(product.stockBySize).reduce((total, quantity) => total + quantity, 0);
}

function matchesAvailability(product: Product, availability: ProductFilters['availability']) {
  const totalStock = getTotalStock(product);

  if (!availability || availability === 'all') {
    return true;
  }

  if (availability === 'in-stock') {
    return totalStock > 0;
  }

  if (availability === 'low-stock') {
    return totalStock > 0 && totalStock <= 4;
  }

  return totalStock === 0;
}

export function filterProducts(products: Product[], filters: ProductFilters) {
  return products.filter((product) => {
    const hasSelectedSize = filters.size
      ? (product.stockBySize[filters.size] ?? 0) > 0
      : true;

    return (
      product.isVisible &&
      (!filters.category || product.category === filters.category) &&
      (!filters.color ||
        product.colors.some((color) => color.name.toLowerCase() === filters.color?.toLowerCase())) &&
      (!filters.material || product.materials.includes(filters.material)) &&
      (!filters.minPrice || product.price >= filters.minPrice) &&
      (!filters.maxPrice || product.price <= filters.maxPrice) &&
      hasSelectedSize &&
      matchesAvailability(product, filters.availability)
    );
  });
}

export function sortProducts(products: Product[], sort: ProductSort) {
  return [...products].sort((left, right) => {
    if (sort === 'price-asc') {
      return left.price - right.price;
    }

    if (sort === 'price-desc') {
      return right.price - left.price;
    }

    if (sort === 'bestselling') {
      return Number(right.isFeatured) - Number(left.isFeatured);
    }

    return Number(right.isNew) - Number(left.isNew);
  });
}
