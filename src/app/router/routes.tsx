import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CustomerLayout } from '../../components/layout/CustomerLayout';
import { CartPage } from '../../features/cart/pages/CartPage';
import { HomePage } from '../../features/products/pages/HomePage';
import { ProductDetailPage } from '../../features/products/pages/ProductDetailPage';
import { ProductListPage } from '../../features/products/pages/ProductListPage';
import { WishlistPage } from '../../features/wishlist/pages/WishlistPage';
import { AdminHeading, PageHeading } from './RoutePlaceholders';

export const routes: RouteObject[] = [
  {
    element: <CustomerLayout />,
    children: [
      { element: <HomePage />, path: '/' },
      { element: <ProductListPage />, path: '/products' },
      { element: <ProductDetailPage />, path: '/products/:productId' },
      { element: <CartPage />, path: '/cart' },
      { element: <PageHeading eyebrow="Secure mock flow" title="Checkout" />, path: '/checkout' },
      {
        element: <PageHeading eyebrow="Order complete" title="Order Complete" />,
        path: '/order-complete',
      },
      { element: <WishlistPage />, path: '/wishlist' },
    ],
  },
  {
    element: <AdminLayout />,
    path: '/admin',
    children: [
      { element: <AdminHeading title="Dashboard" />, index: true },
      { element: <AdminHeading title="Products" />, path: 'products' },
      { element: <AdminHeading title="Orders" />, path: 'orders' },
      { element: <AdminHeading title="Inventory" />, path: 'inventory' },
    ],
  },
];

export function createAppRouter() {
  return createBrowserRouter(routes);
}
