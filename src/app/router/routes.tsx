import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CustomerLayout } from '../../components/layout/CustomerLayout';
import { CartPage } from '../../features/cart/pages/CartPage';
import { CheckoutPage } from '../../features/checkout/pages/CheckoutPage';
import { OrderCompletePage } from '../../features/checkout/pages/OrderCompletePage';
import { HomePage } from '../../features/products/pages/HomePage';
import { ProductDetailPage } from '../../features/products/pages/ProductDetailPage';
import { ProductListPage } from '../../features/products/pages/ProductListPage';
import { WishlistPage } from '../../features/wishlist/pages/WishlistPage';
import {
  LazyAdminDashboardPage,
  LazyAdminInventoryPage,
  LazyAdminOrdersPage,
  LazyAdminProductsPage,
} from './LazyAdminPages';

export const routes: RouteObject[] = [
  {
    element: <CustomerLayout />,
    children: [
      { element: <HomePage />, path: '/' },
      { element: <ProductListPage />, path: '/products' },
      { element: <ProductDetailPage />, path: '/products/:productId' },
      { element: <CartPage />, path: '/cart' },
      { element: <CheckoutPage />, path: '/checkout' },
      { element: <OrderCompletePage />, path: '/order-complete' },
      { element: <WishlistPage />, path: '/wishlist' },
    ],
  },
  {
    element: <AdminLayout />,
    path: '/admin',
    children: [
      { element: <LazyAdminDashboardPage />, index: true },
      { element: <LazyAdminProductsPage />, path: 'products' },
      { element: <LazyAdminOrdersPage />, path: 'orders' },
      { element: <LazyAdminInventoryPage />, path: 'inventory' },
    ],
  },
];

export function createAppRouter() {
  return createBrowserRouter(routes);
}
