import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Render the button's classes onto its one child instead of a <button>
   * — e.g. <Button asChild><Link href="/x">Go</Link></Button> for a Link
   * that needs to look like the primary action it is. */
  asChild?: boolean;
}

/**
 * The one button. No product forks this — a product's identity shows up
 * automatically because "primary" resolves through the accent tokens,
 * which are already set to that product's hex before this ever renders.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 rounded-sm px-4 py-2 font-sans text-small font-semibold',
        // transition-colors already picks up the 120ms/ease DEFAULT set in
        // the preset — no separate duration-*/ease-* utility needed.
        'transition-colors active:translate-y-px',
        'disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2',
        variant === 'primary' &&
          'bg-accent text-accent-contrast hover:bg-accent-hover active:bg-accent-active',
        variant === 'secondary' &&
          'bg-omni-surface text-omni-ink border border-omni-border-strong hover:border-accent hover:text-accent',
        variant === 'ghost' && 'bg-transparent text-omni-ink-soft hover:bg-omni-surface-sunk hover:text-omni-ink',
        className,
      )}
      {...props}
    />
    );
  },
);
Button.displayName = 'Button';
