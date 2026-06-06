import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CustomerLayout } from '../../components/layout/CustomerLayout';
import { HomePage } from '../../features/products/pages/HomePage';
import { ProductListPage } from '../../features/products/pages/ProductListPage';
import { AdminHeading, PageHeading } from './RoutePlaceholders';

export const routes: RouteObject[] = [
  {
    element: <CustomerLayout />,
    children: [
      { element: <HomePage />, path: '/' },
      { element: <ProductListPage />, path: '/products' },
      {
        element: <PageHeading eyebrow="Product detail" title="Product Detail" />,
        path: '/products/:productId',
      },
      { element: <PageHeading eyebrow="Shopping bag" title="Cart" />, path: '/cart' },
      { element: <PageHeading eyebrow="Secure mock flow" title="Checkout" />, path: '/checkout' },
      {
        element: <PageHeading eyebrow="Order complete" title="Order Complete" />,
        path: '/order-complete',
      },
      { element: <PageHeading eyebrow="Saved edits" title="Wishlist" />, path: '/wishlist' },
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
