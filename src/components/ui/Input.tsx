import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  error?: string;
};

export function Input({
  className,
  error,
  helperText,
  id,
  label,
  ...props
}: InputProps) {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-[var(--color-text-primary)]" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className={cn(
          'h-11 border border-[var(--color-border)] bg-white px-3 text-sm text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)]',
          error && 'border-[var(--color-sale)] focus:border-[var(--color-sale)]',
          className,
        )}
        id={id}
        {...props}
      />
      {helperText ? (
        <p className="text-xs text-[var(--color-text-secondary)]" id={helperId}>
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p className="text-xs text-[var(--color-sale)]" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

