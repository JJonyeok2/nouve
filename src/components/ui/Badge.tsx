import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'primary';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

const toneClassNames: Record<BadgeTone, string> = {
  neutral: 'bg-[#efede8] text-[var(--color-text-secondary)]',
  success: 'bg-[#e6f2ec] text-[#2f7d5b]',
  warning: 'bg-[#fff3dc] text-[#a66a00]',
  danger: 'bg-[#fae8e8] text-[var(--color-sale)]',
  primary: 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]',
};

export function Badge({ children, className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-xs font-medium',
        toneClassNames[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

