import * as React from 'react';
import { cn } from './cn';

export type BadgeTone = 'success' | 'warning' | 'error' | 'info' | 'accent';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  error: 'bg-error-soft text-error',
  info: 'bg-info-soft text-info',
  // The only place "accent" is a legitimate badge tone: a genuinely
  // product-specific status (e.g. Rewards' "VIP tier"), not a generic one —
  // see the doc's "does this communicate something?" rule.
  accent: 'bg-accent-soft text-accent',
};

/** A badge is a status, not a decoration — a dot plus a fill, from the
 * Level 1/Level 3 palettes for anything generic (approved/pending/overdue),
 * `tone="accent"` reserved for a genuine product-specific state. */
export function Badge({ tone, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-caption font-semibold uppercase tracking-wide',
        "before:content-[''] before:h-1.5 before:w-1.5 before:rounded-full before:bg-current",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
