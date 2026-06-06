import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('min-h-4 animate-pulse bg-[#e9e5dc]', className)}
      role="status"
      {...props}
    />
  );
}

