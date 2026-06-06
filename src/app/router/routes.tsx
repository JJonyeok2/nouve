import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CustomerLayout } from '../../components/layout/CustomerLayout';
import {
  LazyAdminDashboardPage,
  LazyAdminInventoryPage,
  LazyAdminOrdersPage,
  LazyAdminProductsPage,
} from './LazyAdminPages';
import {
  LazyCartPage,
  LazyCheckoutPage,
  LazyHomePage,
  LazyOrderCompletePage,
  LazyProductDetailPage,
  LazyProductListPage,
  LazyWishlistPage,
} from './LazyCustomerPages';

export const routes: RouteObject[] = [
  {
    element: <CustomerLayout />,
    children: [
      { element: <LazyHomePage />, path: '/' },
      { element: <LazyProductListPage />, path: '/products' },
      { element: <LazyProductDetailPage />, path: '/products/:productId' },
      { element: <LazyCartPage />, path: '/cart' },
      { element: <LazyCheckoutPage />, path: '/checkout' },
      { element: <LazyOrderCompletePage />, path: '/order-complete' },
      { element: <LazyWishlistPage />, path: '/wishlist' },
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
