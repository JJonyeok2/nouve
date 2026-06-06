import { lazy, Suspense } from 'react';

const CartPage = lazy(() =>
  import('../../features/cart/pages/CartPage').then((module) => ({
    default: module.CartPage,
  })),
);
const CheckoutPage = lazy(() =>
  import('../../features/checkout/pages/CheckoutPage').then((module) => ({
    default: module.CheckoutPage,
  })),
);
const HomePage = lazy(() =>
  import('../../features/products/pages/HomePage').then((module) => ({
    default: module.HomePage,
  })),
);
const OrderCompletePage = lazy(() =>
  import('../../features/checkout/pages/OrderCompletePage').then((module) => ({
    default: module.OrderCompletePage,
  })),
);
const ProductDetailPage = lazy(() =>
  import('../../features/products/pages/ProductDetailPage').then((module) => ({
    default: module.ProductDetailPage,
  })),
);
const ProductListPage = lazy(() =>
  import('../../features/products/pages/ProductListPage').then((module) => ({
    default: module.ProductListPage,
  })),
);
const WishlistPage = lazy(() =>
  import('../../features/wishlist/pages/WishlistPage').then((module) => ({
    default: module.WishlistPage,
  })),
);

function CustomerRouteFallback() {
  return <div aria-label="Loading customer route" />;
}

export function LazyCartPage() {
  return (
    <Suspense fallback={<CustomerRouteFallback />}>
      <CartPage />
    </Suspense>
  );
}

export function LazyCheckoutPage() {
  return (
    <Suspense fallback={<CustomerRouteFallback />}>
      <CheckoutPage />
    </Suspense>
  );
}

export function LazyHomePage() {
  return (
    <Suspense fallback={<CustomerRouteFallback />}>
      <HomePage />
    </Suspense>
  );
}

export function LazyOrderCompletePage() {
  return (
    <Suspense fallback={<CustomerRouteFallback />}>
      <OrderCompletePage />
    </Suspense>
  );
}

export function LazyProductDetailPage() {
  return (
    <Suspense fallback={<CustomerRouteFallback />}>
      <ProductDetailPage />
    </Suspense>
  );
}

export function LazyProductListPage() {
  return (
    <Suspense fallback={<CustomerRouteFallback />}>
      <ProductListPage />
    </Suspense>
  );
}

export function LazyWishlistPage() {
  return (
    <Suspense fallback={<CustomerRouteFallback />}>
      <WishlistPage />
    </Suspense>
  );
}
