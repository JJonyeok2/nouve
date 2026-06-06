# Nouve Commerce Design Spec

## 1. Project Summary

Nouve is a premium unisex minimalwear commerce portfolio project. It focuses on polished UI/UX, realistic front-end state flows, and a balanced customer and admin experience without a backend.

The project will use mock data and client-side services to simulate a real commerce app. The goal is not to build a full production commerce system, but to show that the front-end can handle product discovery, cart state, checkout forms, admin tables, filtering, empty states, loading states, and responsive layouts with a coherent brand experience.

## 2. Confirmed Direction

- Project name: Nouve
- Repository: `JJonyeok2/nouve`
- Domain: fashion commerce
- Product category: premium unisex minimalwear
- Scope: frontend only, no backend
- Data source: local mock data exposed through service functions
- Main color: deep teal `#064E52`
- Mood: premium, minimal, calm, image-led, usability-first
- Product mix: shirts, knitwear, trousers, coats, bags, shoes, and seasonal essentials
- App balance: customer commerce experience 70%, admin operations console 30%

## 3. Product Positioning

Nouve is a curated select shop for unisex minimalwear. The experience should feel quieter and more intentional than mass-market fashion apps. It should emphasize silhouette, material, tone, and season rather than loud promotions or gender-first navigation.

The brand should sit between practical premium commerce and editorial select-shop browsing. It should feel refined enough for a portfolio screenshot, but still usable enough to show real front-end product thinking.

## 4. Goals

- Build a polished premium commerce UI with realistic product imagery.
- Show strong customer UX from discovery to mock order completion.
- Include a compact admin console to demonstrate tables, forms, filters, status changes, and dashboard states.
- Use mock data in a way that resembles API-driven development.
- Demonstrate state handling for cart, wishlist, filters, checkout, order status, and admin updates.
- Include responsive desktop and mobile experiences.
- Document the design and technical decisions clearly for portfolio review.

## 5. Non-Goals

- No real backend, database, authentication, payment provider, shipping provider, or external admin API.
- No real user accounts.
- No real payment processing.
- No inventory synchronization with an external system.
- No large marketplace feature set such as seller onboarding, reviews, Q&A, or live commerce.

## 6. Target Users

### Customer

A fashion-conscious user who prefers clean silhouettes, neutral tones, and curated products. They want to browse quickly, compare options clearly, understand sizing and stock, and complete a purchase flow without visual noise.

### Admin

A store operator who needs to monitor orders, product visibility, stock status, and basic sales performance. The admin experience should prioritize scanning, filtering, and fast status changes over brand storytelling.

## 7. Visual Identity

### Color System

- Primary: `#064E52`
- Primary hover/active: `#043F43`
- Soft teal background: `#E7F1F0`
- Text primary: `#111111`
- Text secondary: `#666666`
- Surface: `#FFFFFF`
- Page background: `#F7F7F4`
- Border: `#E5E1DA`
- Sale/error: `#D94A4A`
- Success: `#2F7D5B`
- Warning: `#A66A00`

The primary color should be used sparingly for purchase CTAs, selected states, active filters, focused controls, and important admin actions. Most of the customer UI should rely on white space, product images, typography, and black text.

### Image Direction

Images should carry the premium feeling. Use a mix of model shots and product-only shots.

- Off-white or neutral backgrounds
- Natural light
- Calm poses
- Unisex styling
- Neutral wardrobe colors: black, ivory, charcoal, navy, beige, grey, washed denim
- Clean product detail shots for materials and texture
- Avoid overly dark, overly glossy, or streetwear-heavy visuals

### Layout Feel

- Customer pages: spacious, image-led, calm, editorial but usable
- Admin pages: dense but not cramped, table-first, utility-focused
- Cards should be simple and restrained.
- Product cards should avoid excessive badges and loud discount styling.
- Typography should be quiet and legible rather than decorative.

## 8. Information Architecture

### Customer Routes

- `/`: home
- `/products`: product listing
- `/products/:productId`: product detail
- `/cart`: cart
- `/checkout`: mock checkout
- `/order-complete`: order completion
- `/wishlist`: wishlist

### Admin Routes

- `/admin`: dashboard
- `/admin/products`: product management
- `/admin/orders`: order management
- `/admin/inventory`: inventory management

## 9. Customer Experience

### Home

Purpose: introduce Nouve as a premium unisex select shop and guide users into curated shopping.

Core sections:

- Seasonal hero with a strong campaign image
- New arrivals
- Signature categories
- Curated collection module
- Bestseller or editor's pick products
- Lightweight brand message

UX notes:

- The first viewport should show the Nouve identity and at least a hint of product/category content below.
- CTA should be clear but restrained.
- Product imagery should be the main visual driver.

### Product Listing

Purpose: let users browse and narrow products efficiently.

Filters:

- Category
- Size
- Color
- Price range
- Material
- Availability

Sort options:

- Newest
- Price low to high
- Price high to low
- Bestselling

UX notes:

- Desktop can use a left or top filter region.
- Mobile should use a bottom sheet or full-screen filter panel.
- URL state is preferred for filters and sort so the state is shareable and refresh-safe.
- Product cards show image, brand, product name, price, color chips, stock hint, wishlist action, and quick add when possible.

### Product Detail

Purpose: support confident purchase decisions.

Core content:

- Image gallery
- Product name and brand
- Price
- Color selection
- Size selection
- Stock status
- Material and care details
- Fit note
- Add to cart
- Wishlist
- Related products

UX notes:

- Size cannot be skipped before adding to cart.
- Out-of-stock sizes should remain visible but disabled.
- Add-to-cart feedback should be immediate.
- Product imagery should support both emotional browsing and practical inspection.

### Cart

Purpose: let users review items and understand totals clearly.

Core content:

- Cart items
- Quantity controls
- Option summary
- Remove item
- Subtotal
- Shipping fee
- Coupon and discount summary
- Final total
- Checkout CTA

UX notes:

- Quantity changes update totals immediately.
- Empty cart state should guide users back to products.
- Cart state should persist locally.

### Checkout

Purpose: simulate checkout without real payment.

Core content:

- Shipping information form
- Delivery memo
- Payment method selection UI
- Order summary
- Terms agreement
- Place order button

UX notes:

- Use React Hook Form and Zod for validation.
- Payment is mock-only.
- On success, create a mock order summary and move to order completion.

### Order Complete

Purpose: close the purchase journey and show a credible commerce flow.

Core content:

- Order number
- Ordered items
- Shipping summary
- Payment method label
- Final total
- Continue shopping CTA

## 10. Admin Experience

### Dashboard

Purpose: provide a compact operational overview.

Widgets:

- Today's sales
- Order count
- Low-stock products
- Top-selling products
- Recent orders
- Sales trend chart

UX notes:

- Use charts sparingly and clearly.
- Surface urgent states like low stock and pending orders.

### Product Management

Purpose: manage product visibility and basic product data.

Core features:

- Search products
- Filter by category, status, stock state
- Product table
- Visibility toggle
- Stock status badge
- Product edit modal or drawer
- Mock create/edit flow

UX notes:

- Table should be scannable.
- Status changes should update local mock state.
- Forms should validate required fields.

### Order Management

Purpose: review and update mock order status.

Core features:

- Search by order number or customer
- Filter by status
- Order table
- Order detail drawer
- Status update controls

Order statuses:

- Paid
- Preparing
- Shipped
- Delivered
- Cancelled

UX notes:

- Status changes should feel immediate.
- Cancelled orders should be visually distinct but not overly loud.

### Inventory Management

Purpose: make stock state visible and actionable.

Core features:

- Low stock list
- Size-level stock display
- Stock adjustment mock control
- Sold-out and low-stock badges

UX notes:

- Inventory should connect back to product detail size availability.
- Low-stock thresholds should be visible in the UI.

## 11. Data Model

Mock data should live under a dedicated data directory and be accessed through service functions instead of directly imported across pages.

### Product

- `id`
- `brand`
- `name`
- `category`
- `price`
- `originalPrice`
- `colors`
- `sizes`
- `materials`
- `images`
- `description`
- `fit`
- `care`
- `stockBySize`
- `isNew`
- `isFeatured`
- `status`

### Cart Item

- `productId`
- `name`
- `brand`
- `image`
- `selectedColor`
- `selectedSize`
- `price`
- `quantity`

### Order

- `id`
- `customerName`
- `items`
- `total`
- `status`
- `createdAt`
- `shippingAddress`
- `paymentMethod`

### Collection

- `id`
- `title`
- `subtitle`
- `image`
- `productIds`

## 12. Technical Architecture

Recommended stack:

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Tailwind CSS
- Recharts
- lucide-react

Suggested structure:

```text
src/
  app/
    router/
    providers/
  components/
    ui/
    layout/
  data/
  features/
    admin/
    cart/
    checkout/
    products/
    wishlist/
  services/
  stores/
  styles/
  types/
  utils/
```

### State Strategy

- TanStack Query handles async-like mock service calls, loading states, cache behavior, and error states.
- Zustand handles cart, wishlist, and persistent UI state.
- URL search params handle product listing filters and sort.
- React Hook Form and Zod handle checkout and admin form validation.

## 13. Error, Loading, and Empty States

The project should include deliberate states because they are important for portfolio credibility.

- Product list loading skeleton
- Product list empty state when filters return no results
- Product detail not found state
- Empty cart state
- Checkout validation errors
- Admin table empty states
- Mock service error state for at least one route or demo mode

## 14. Responsive Behavior

### Desktop

- Wide product grid
- Persistent filter panel or clear top filter controls
- Admin tables with enough columns visible
- Dashboard cards in multi-column layout

### Mobile

- Compact header
- Product filters open in a bottom sheet or full-screen panel
- Product cards use a two-column or single-column layout depending on viewport
- Cart and checkout prioritize order summary clarity
- Admin pages should remain usable with horizontal table scroll or simplified cards

## 15. Accessibility and Usability

- All interactive controls need visible focus states.
- Buttons and icon controls need accessible names.
- Product image alt text should describe the product, not just say "image".
- Color choices should not rely only on color; include labels where needed.
- Disabled sizes need clear visual treatment.
- Form errors should be attached to fields.
- Contrast should remain readable against the deep teal primary color.

## 16. Verification Criteria

Core flows to verify:

- Product filtering and sorting work as expected.
- Product detail requires size selection before adding to cart.
- Cart quantity changes, removal, and totals work.
- Checkout form validates required fields.
- Mock order completion displays the selected items and totals.
- Admin product filtering and visibility changes work.
- Admin order status changes work.
- Inventory state is reflected in product size availability.
- Desktop and mobile layouts are visually coherent.
- Empty, loading, and error states are present.

## 17. README Requirements

The README should be portfolio-oriented, not just a run guide.

Include:

- Project purpose
- Screenshots
- Tech stack and why it was chosen
- Main customer and admin flows
- Mock data architecture
- UI/UX design notes
- Local run commands
- Future improvements

## 18. Implementation Decisions

These decisions are fixed for the first implementation plan:

- Product imagery will use a mixed approach: generated or curated product/model images as local assets, organized by product and collection.
- Admin create/edit forms will use drawers so the table context remains visible.
- Product listing filters will use a left sidebar on desktop and a bottom sheet on mobile.
- Cart will have a dedicated page. A mini-cart drawer can be added later, but it is not part of the first scope.

## 19. Approval Status

Approved direction so far:

- Premium unisex minimalwear commerce
- Frontend-only mock data implementation
- Deep teal primary color `#064E52`
- Balanced customer and admin scope
- React, TypeScript, Vite-centered architecture
