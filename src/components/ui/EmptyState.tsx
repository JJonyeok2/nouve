import type { ReactNode } from 'react';

type EmptyStateProps = {
  action?: ReactNode;
  description?: string;
  title: string;
};

export function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center border border-dashed border-[var(--color-border)] bg-white px-6 py-10 text-center">
      <h2 className="text-lg font-medium text-[var(--color-text-primary)]">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-[var(--color-text-secondary)]">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

