import { collections } from '../data/collections';
import { orders as initialOrders } from '../data/orders';
import { products as initialProducts } from '../data/products';
import type { Order, OrderStatus, Product } from '../types/commerce';

let products: Product[] = structuredClone(initialProducts);
let orders: Order[] = structuredClone(initialOrders);

function waitForMockApi() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 10);
  });
}

export async function getProducts() {
  await waitForMockApi();
  return structuredClone(products);
}

export async function getProductById(productId: string) {
  await waitForMockApi();
  const product = products.find((item) => item.id === productId);
  return product ? structuredClone(product) : undefined;
}

export async function getCollections() {
  await waitForMockApi();
  return structuredClone(collections);
}

export async function getOrders() {
  await waitForMockApi();
  return structuredClone(orders);
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await waitForMockApi();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    throw new Error(`Order not found: ${orderId}`);
  }

  order.status = status;
  return structuredClone(order);
}

export async function updateProductVisibility(productId: string, isVisible: boolean) {
  await waitForMockApi();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  product.isVisible = isVisible;
  return structuredClone(product);
}

export function resetMockCommerceData() {
  products = structuredClone(initialProducts);
  orders = structuredClone(initialOrders);
}

