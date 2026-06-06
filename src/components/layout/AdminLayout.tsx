import { BarChart3, Boxes, Package, ReceiptText } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const adminLinks = [
  { icon: BarChart3, label: 'Dashboard', to: '/admin' },
  { icon: Package, label: 'Products', to: '/admin/products' },
  { icon: ReceiptText, label: 'Orders', to: '/admin/orders' },
  { icon: Boxes, label: 'Inventory', to: '/admin/inventory' },
];

export function AdminLayout() {
  return (
    <div className="grid min-h-screen bg-[#f4f3ef] text-[var(--color-text-primary)] md:grid-cols-[240px_1fr]">
      <aside className="border-r border-[var(--color-border)] bg-white">
        <div className="border-b border-[var(--color-border)] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            Nouve
          </p>
          <p className="mt-1 text-lg font-semibold">Admin</p>
        </div>
        <nav aria-label="Admin navigation" className="grid gap-1 p-3">
          {adminLinks.map(({ icon: Icon, label, to }) => (
            <NavLink
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 text-sm transition',
                  isActive
                    ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[#f6f4ef] hover:text-[var(--color-text-primary)]',
                ].join(' ')
              }
              end={to === '/admin'}
              key={label}
              to={to}
            >
              <Icon aria-hidden="true" size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 p-5 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

