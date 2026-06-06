import type { ReactNode } from 'react';

type AdminTableProps = {
  children: ReactNode;
  columns: string[];
};

export function AdminTable({ children, columns }: AdminTableProps) {
  return (
    <div className="overflow-x-auto border border-[var(--color-border)] bg-white">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-[#f6f4ef] text-xs uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
          <tr>
            {columns.map((column) => (
              <th className="border-b border-[var(--color-border)] px-4 py-3 font-medium" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">{children}</tbody>
      </table>
    </div>
  );
}
