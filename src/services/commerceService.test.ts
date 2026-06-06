import { describe, expect, it } from 'vitest';
import {
  getOrders,
  getProductById,
  getProducts,
  updateOrderStatus,
  updateProductVisibility,
} from './commerceService';
import { filterProducts, sortProducts } from '../utils/filters';

describe('commerceService', () => {
  it('loads a realistic product catalog', async () => {
    const products = await getProducts();

    expect(products).toHaveLength(16);
    expect(products[0]).toMatchObject({
      brand: expect.any(String),
      category: expect.any(String),
      images: expect.arrayContaining([expect.stringMatching('/assets/nouve/')]),
    });
  });

  it('finds a product by id', async () => {
    const product = await getProductById('woven-shirt-ivory');

    expect(product?.name).toBe('Ivory Structured Woven Shirt');
    expect(product?.stockBySize.M).toBeGreaterThan(0);
  });

  it('filters products by category, size, material, and availability', async () => {
    const products = await getProducts();
    const filtered = filterProducts(products, {
      availability: 'in-stock',
      category: 'Shirts',
      material: 'Cotton',
      size: 'M',
    });

    expect(filtered.map((product) => product.id)).toContain('woven-shirt-ivory');
    expect(filtered.every((product) => product.category === 'Shirts')).toBe(true);
  });

  it('sorts products by highest price first', async () => {
    const products = await getProducts();
    const sorted = sortProducts(products, 'price-desc');

    expect(sorted[0].price).toBeGreaterThanOrEqual(sorted[1].price);
  });

  it('updates an order status', async () => {
    const updated = await updateOrderStatus('NO-1002', 'Shipped');
    const orders = await getOrders();

    expect(updated.status).toBe('Shipped');
    expect(orders.find((order) => order.id === 'NO-1002')?.status).toBe('Shipped');
  });

  it('updates product visibility', async () => {
    const updated = await updateProductVisibility('wide-trouser-charcoal', false);
    const product = await getProductById('wide-trouser-charcoal');

    expect(updated.isVisible).toBe(false);
    expect(product?.isVisible).toBe(false);
  });
});

