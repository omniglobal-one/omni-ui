import * as React from 'react';
import { cn } from './cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/** Label is always visible above the field — never placeholder-as-label
 * (doc: "Forms," mobile section). `id` is generated if not supplied so
 * label/input stay associated without every call site wiring it by hand. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={inputId} className="text-small font-semibold text-omni-ink">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            'w-full min-h-[44px] rounded-sm border bg-omni-surface px-3 py-2 font-sans text-body text-omni-ink',
            'placeholder:text-omni-ink-faint outline-none transition-colors',
            'border-omni-border-strong focus:border-accent focus:ring-4 focus:ring-accent/10',
            error && 'border-error focus:border-error focus:ring-error/10',
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-small text-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = 'Input';
