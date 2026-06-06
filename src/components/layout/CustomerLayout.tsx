import { Heart, ShoppingBag } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const customerLinks = [
  { label: 'Shop', to: '/products' },
  { label: 'Collections', to: '/' },
  { label: 'About', to: '/' },
];

export function CustomerLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-page)] text-[var(--color-text-primary)]">
      <header className="sticky top-0 left-0 right-0 z-10 w-screen border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
        <div className="mx-0 flex h-16 w-screen max-w-none items-center justify-between px-5 md:mx-auto md:max-w-7xl">
          <Link className="text-xl font-semibold tracking-wide" to="/">
            Nouve
          </Link>
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
            {customerLinks.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-sm font-medium text-[var(--color-primary)]'
                    : 'text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }
                key={link.label}
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              aria-label="Wishlist"
              className="inline-flex h-10 w-10 items-center justify-center hover:bg-[var(--color-primary-soft)]"
              to="/wishlist"
            >
              <Heart aria-hidden="true" size={20} />
            </Link>
            <Link
              aria-label="Cart"
              className="inline-flex h-10 w-10 items-center justify-center bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
              to="/cart"
            >
              <ShoppingBag aria-hidden="true" size={20} />
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-[var(--color-border)] bg-white px-5 py-10">
        <div className="mx-auto max-w-7xl text-sm text-[var(--color-text-secondary)]">
          Premium unisex minimalwear for quiet daily repetition.
        </div>
      </footer>
    </div>
  );
}
