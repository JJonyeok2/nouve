# Nouve Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a frontend-only premium unisex fashion commerce app with customer shopping flows, admin operations screens, local assets, mock data, and portfolio-ready documentation.

**Architecture:** The app uses React, TypeScript, and Vite with feature-based folders. Mock data is accessed through service functions and TanStack Query so the UI behaves like an API-backed app without a backend. Zustand owns client state such as cart, wishlist, and selected UI state.

**Tech Stack:** React, TypeScript, Vite, React Router, TanStack Query, Zustand, React Hook Form, Zod, Tailwind CSS, Recharts, lucide-react, Vitest, Testing Library.

---

## Source Documents

- Root rules: `AGENTS.md`
- Design spec: `docs/superpowers/specs/2026-06-06-nouve-commerce-design.md`
- Agent guidelines: `docs/agents/agent-creation-guidelines.md`
- Frontend implementation role: `docs/agents/roles/frontend-implementation-agent.md`
- Image asset role: `docs/agents/roles/image-asset-agent.md`

## Agent Strategy

- Use Hybrid Mode by default.
- Use the Image Asset Agent before or alongside product UI work.
- Use Frontend Implementation Agents only with bounded write scopes.
- Use Frontend QA Review Agent after each major customer/admin flow.
- Do not spawn a backend agent for this project.

## Planned File Structure

```text
src/
  app/
    App.tsx
    main.tsx
    providers/AppProviders.tsx
    router/routes.tsx
  components/
    layout/
      AdminLayout.tsx
      CustomerLayout.tsx
    ui/
      Badge.tsx
      Button.tsx
      Drawer.tsx
      EmptyState.tsx
      Input.tsx
      Select.tsx
      Skeleton.tsx
      Table.tsx
  data/
    collections.ts
    orders.ts
    products.ts
  features/
    admin/
    cart/
    checkout/
    products/
    wishlist/
  services/
    commerceService.ts
  stores/
    cartStore.ts
    wishlistStore.ts
  styles/
    globals.css
  types/
    commerce.ts
  utils/
    currency.ts
    filters.ts
```

## Task 1: Scaffold Vite React App

**Agent:** Frontend Implementation Agent

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/app/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/styles/globals.css`

- [ ] **Step 1: Scaffold dependencies**

Run:

```powershell
npm create vite@latest . -- --template react-ts
npm install
npm install @tanstack/react-query zustand react-router-dom react-hook-form zod @hookform/resolvers recharts lucide-react clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/vite vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: Vite React TypeScript files are created and dependencies are installed.

- [ ] **Step 2: Preserve existing docs**

Run:

```powershell
git status --short
```

Expected: Existing `docs/`, `AGENTS.md`, and `public/assets/nouve/README.md` remain present.

- [ ] **Step 3: Add minimal app entry**

Ensure `src/app/App.tsx` exports:

```tsx
export function App() {
  return <div>Nouve</div>;
}
```

Ensure `src/app/main.tsx` renders `App`.

- [ ] **Step 4: Verify scaffold**

Run:

```powershell
npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```powershell
git add package.json package-lock.json index.html tsconfig*.json vite.config.ts src
git commit -m "chore: scaffold Nouve frontend"
```

## Task 2: Add Design Tokens and UI Primitives

**Agent:** Frontend Implementation Agent

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/EmptyState.tsx`
- Create: `src/components/ui/Skeleton.tsx`
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Add CSS tokens**

Add CSS variables for:

```css
:root {
  --color-primary: #064e52;
  --color-primary-hover: #043f43;
  --color-primary-soft: #e7f1f0;
  --color-text-primary: #111111;
  --color-text-secondary: #666666;
  --color-surface: #ffffff;
  --color-page: #f7f7f4;
  --color-border: #e5e1da;
  --color-sale: #d94a4a;
}
```

- [ ] **Step 2: Create `Button`**

Create a typed button component with `variant` values `primary`, `secondary`, and `ghost`.

- [ ] **Step 3: Create status UI**

Create `Badge`, `EmptyState`, and `Skeleton` primitives for product and admin states.

- [ ] **Step 4: Verify primitives compile**

Run:

```powershell
npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```powershell
git add src/components/ui src/styles/globals.css
git commit -m "feat: add Nouve UI primitives"
```

## Task 3: Add Commerce Types, Mock Data, and Services

**Agent:** Frontend Implementation Agent

**Files:**
- Create: `src/types/commerce.ts`
- Create: `src/data/products.ts`
- Create: `src/data/orders.ts`
- Create: `src/data/collections.ts`
- Create: `src/services/commerceService.ts`
- Create: `src/utils/currency.ts`
- Create: `src/utils/filters.ts`
- Create: `src/services/commerceService.test.ts`

- [ ] **Step 1: Define commerce types**

Define `Product`, `CartItem`, `Order`, `OrderStatus`, and `Collection` using the fields from the design spec.

- [ ] **Step 2: Add mock data**

Create at least 16 products, 4 collections, and 8 orders. Use local image paths under `/assets/nouve/`.

- [ ] **Step 3: Add service functions**

Create async functions:

```ts
getProducts()
getProductById(productId: string)
getCollections()
getOrders()
updateOrderStatus(orderId: string, status: OrderStatus)
updateProductVisibility(productId: string, isVisible: boolean)
```

- [ ] **Step 4: Add tests**

Test product filtering, product lookup, order status updates, and visibility updates.

- [ ] **Step 5: Verify**

Run:

```powershell
npm test -- --run src/services/commerceService.test.ts
npm run build
```

Expected: tests and build pass.

- [ ] **Step 6: Commit**

```powershell
git add src/types src/data src/services src/utils
git commit -m "feat: add commerce mock data services"
```

## Task 4: Add App Providers, Routing, and Layouts

**Agent:** Frontend Implementation Agent

**Files:**
- Create: `src/app/providers/AppProviders.tsx`
- Create: `src/app/router/routes.tsx`
- Create: `src/components/layout/CustomerLayout.tsx`
- Create: `src/components/layout/AdminLayout.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/app/main.tsx`

- [ ] **Step 1: Add providers**

Wrap the app with `QueryClientProvider` and router provider.

- [ ] **Step 2: Add route skeletons**

Create customer routes `/`, `/products`, `/products/:productId`, `/cart`, `/checkout`, `/order-complete`, `/wishlist`.

Create admin routes `/admin`, `/admin/products`, `/admin/orders`, `/admin/inventory`.

- [ ] **Step 3: Add layouts**

Customer layout includes brand header, nav, cart link, wishlist link, and footer.

Admin layout includes sidebar nav, page title region, and content area.

- [ ] **Step 4: Verify route rendering**

Run:

```powershell
npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```powershell
git add src/app src/components/layout
git commit -m "feat: add routing and app layouts"
```

## Task 5: Implement Customer Product Discovery

**Agent:** Frontend Implementation Agent

**Files:**
- Create: `src/features/products/pages/HomePage.tsx`
- Create: `src/features/products/pages/ProductListPage.tsx`
- Create: `src/features/products/components/ProductCard.tsx`
- Create: `src/features/products/components/ProductFilters.tsx`
- Create: `src/features/products/components/ProductSort.tsx`
- Create: `src/features/products/components/CollectionSection.tsx`

- [ ] **Step 1: Implement home page**

Use collections and featured products to build hero, new arrivals, signature categories, and editor pick sections.

- [ ] **Step 2: Implement product listing**

Use TanStack Query to load products from `commerceService`.

- [ ] **Step 3: Implement URL filters**

Read and write category, size, color, material, availability, and sort through URL search params.

- [ ] **Step 4: Add empty and loading states**

Use `Skeleton` while loading and `EmptyState` when no filtered products exist.

- [ ] **Step 5: Verify**

Run:

```powershell
npm run build
```

Expected: customer discovery pages compile.

- [ ] **Step 6: Commit**

```powershell
git add src/features/products
git commit -m "feat: build product discovery experience"
```

## Task 6: Implement Product Detail, Wishlist, and Cart Store

**Agent:** Frontend Implementation Agent

**Files:**
- Create: `src/features/products/pages/ProductDetailPage.tsx`
- Create: `src/stores/cartStore.ts`
- Create: `src/stores/wishlistStore.ts`
- Create: `src/features/wishlist/pages/WishlistPage.tsx`
- Create: `src/features/cart/pages/CartPage.tsx`

- [ ] **Step 1: Implement cart store**

Store cart items, add item, remove item, update quantity, and clear cart. Persist with Zustand middleware.

- [ ] **Step 2: Implement wishlist store**

Store product IDs, toggle wishlist, and persist with Zustand middleware.

- [ ] **Step 3: Implement product detail**

Require color and size selection before add to cart. Disable out-of-stock sizes.

- [ ] **Step 4: Implement cart page**

Show items, quantity controls, remove action, subtotal, shipping, coupon summary, and final total.

- [ ] **Step 5: Verify**

Run:

```powershell
npm run build
```

Expected: product detail, wishlist, and cart compile.

- [ ] **Step 6: Commit**

```powershell
git add src/features/products src/features/cart src/features/wishlist src/stores
git commit -m "feat: add product detail cart wishlist flows"
```

## Task 7: Implement Checkout and Order Complete

**Agent:** Frontend Implementation Agent

**Files:**
- Create: `src/features/checkout/pages/CheckoutPage.tsx`
- Create: `src/features/checkout/pages/OrderCompletePage.tsx`
- Create: `src/features/checkout/schemas/checkoutSchema.ts`
- Create: `src/features/checkout/components/OrderSummary.tsx`

- [ ] **Step 1: Add checkout schema**

Use Zod to validate recipient name, phone, address, delivery memo, payment method, and terms agreement.

- [ ] **Step 2: Add checkout form**

Use React Hook Form and `@hookform/resolvers/zod`.

- [ ] **Step 3: Add mock order completion**

On valid submit, create an order summary from cart state, clear cart, and navigate to `/order-complete`.

- [ ] **Step 4: Verify**

Run:

```powershell
npm run build
```

Expected: checkout flow compiles and typechecks.

- [ ] **Step 5: Commit**

```powershell
git add src/features/checkout
git commit -m "feat: add mock checkout flow"
```

## Task 8: Implement Admin Dashboard and Tables

**Agent:** Frontend Implementation Agent

**Files:**
- Create: `src/features/admin/pages/AdminDashboardPage.tsx`
- Create: `src/features/admin/pages/AdminProductsPage.tsx`
- Create: `src/features/admin/pages/AdminOrdersPage.tsx`
- Create: `src/features/admin/pages/AdminInventoryPage.tsx`
- Create: `src/features/admin/components/AdminMetricCard.tsx`
- Create: `src/features/admin/components/AdminTable.tsx`
- Create: `src/features/admin/components/StatusBadge.tsx`

- [ ] **Step 1: Build dashboard**

Show sales, order count, low stock, popular products, recent orders, and Recharts trend chart.

- [ ] **Step 2: Build product management**

Show product table, search, category/status/stock filters, visibility toggle, and an edit drawer with validated fields.

- [ ] **Step 3: Build order management**

Show order table, status filters, detail drawer, and status update controls.

- [ ] **Step 4: Build inventory page**

Show low-stock products and size-level stock display.

- [ ] **Step 5: Verify**

Run:

```powershell
npm run build
```

Expected: admin pages compile and render route skeletons.

- [ ] **Step 6: Commit**

```powershell
git add src/features/admin
git commit -m "feat: add admin operations console"
```

## Task 9: Add Image Assets

**Agent:** Image Asset Agent

**Files:**
- Modify: `public/assets/nouve/**`
- Modify: `docs/assets/image-sources.md`

- [ ] **Step 1: Source images**

Collect or generate images for hero, products, collections, and editorial sections.

- [ ] **Step 2: Save locally**

Save all files under:

```text
public/assets/nouve/
```

- [ ] **Step 3: Update source log**

For each image, update `docs/assets/image-sources.md` with filename, source, license/permission, usage, and notes.

- [ ] **Step 4: Verify files exist**

Run:

```powershell
Get-ChildItem -Recurse public/assets/nouve
```

Expected: image files exist and are organized by usage.

- [ ] **Step 5: Commit**

```powershell
git add public/assets/nouve docs/assets/image-sources.md
git commit -m "chore: add Nouve image assets"
```

## Task 10: Add Tests, README, and Portfolio Polish

**Agent:** Frontend Implementation Agent, then Frontend QA Review Agent

**Files:**
- Modify: `README.md`
- Create or modify: `src/**/*.test.ts`
- Create or modify: `src/**/*.test.tsx`

- [ ] **Step 1: Add core tests**

Cover product filtering, cart totals, checkout validation, and admin status changes.

- [ ] **Step 2: Update README**

Include purpose, screenshots, tech stack reasoning, customer/admin flows, mock data architecture, UI/UX notes, run commands, and future improvements.

- [ ] **Step 3: Run verification**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all commands pass.

- [ ] **Step 4: Run QA review**

Frontend QA Review Agent checks:

- Desktop customer flow
- Mobile customer flow
- Admin table usability
- Accessibility basics
- Visual consistency with `#064E52`
- Image quality and source log

- [ ] **Step 5: Commit**

```powershell
git add README.md src
git commit -m "test: verify Nouve commerce flows"
```

## Self-Review

Spec coverage:

- Premium unisex visual direction is covered by Tasks 2, 5, and 9.
- Customer discovery, detail, cart, checkout, and order complete are covered by Tasks 5, 6, and 7.
- Admin dashboard, product, order, and inventory views are covered by Task 8.
- Mock API-style data architecture is covered by Task 3.
- README portfolio requirements are covered by Task 10.
- Image local asset handling is covered by Task 9.

Incomplete-marker scan:

- This plan intentionally avoids incomplete markers and vague deferred work.
- Each task has concrete files, commands, and verification expectations.

Type consistency:

- Commerce types are introduced in Task 3 before dependent customer/admin tasks.
- Store files are introduced before cart, wishlist, and checkout pages depend on them.
- Route structure is introduced before feature pages are wired into navigation.

## Execution Options

Plan complete and saved to `docs/superpowers/plans/2026-06-06-nouve-frontend-implementation.md`.

1. Subagent-Driven (recommended): dispatch a fresh bounded agent per task and review between tasks.
2. Inline Execution: implement tasks in this session with checkpoints.
