import type { ReactNode } from 'react';

type AdminMetricCardProps = {
  helper?: string;
  icon?: ReactNode;
  label: string;
  value: string;
};

export function AdminMetricCard({ helper, icon, label, value }: AdminMetricCardProps) {
  return (
    <article className="border border-[var(--color-border)] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </div>
        {icon ? (
          <div className="inline-flex h-10 w-10 items-center justify-center bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
            {icon}
          </div>
        ) : null}
      </div>
      {helper ? <p className="mt-3 text-xs text-[var(--color-text-secondary)]">{helper}</p> : null}
    </article>
  );
}
