import { lazy, Suspense } from 'react';

const AdminDashboardPage = lazy(() =>
  import('../../features/admin/pages/AdminDashboardPage').then((module) => ({
    default: module.AdminDashboardPage,
  })),
);
const AdminInventoryPage = lazy(() =>
  import('../../features/admin/pages/AdminInventoryPage').then((module) => ({
    default: module.AdminInventoryPage,
  })),
);
const AdminOrdersPage = lazy(() =>
  import('../../features/admin/pages/AdminOrdersPage').then((module) => ({
    default: module.AdminOrdersPage,
  })),
);
const AdminProductsPage = lazy(() =>
  import('../../features/admin/pages/AdminProductsPage').then((module) => ({
    default: module.AdminProductsPage,
  })),
);

function AdminRouteFallback() {
  return <div aria-label="Loading admin route" />;
}

export function LazyAdminDashboardPage() {
  return (
    <Suspense fallback={<AdminRouteFallback />}>
      <AdminDashboardPage />
    </Suspense>
  );
}

export function LazyAdminInventoryPage() {
  return (
    <Suspense fallback={<AdminRouteFallback />}>
      <AdminInventoryPage />
    </Suspense>
  );
}

export function LazyAdminOrdersPage() {
  return (
    <Suspense fallback={<AdminRouteFallback />}>
      <AdminOrdersPage />
    </Suspense>
  );
}

export function LazyAdminProductsPage() {
  return (
    <Suspense fallback={<AdminRouteFallback />}>
      <AdminProductsPage />
    </Suspense>
  );
}
