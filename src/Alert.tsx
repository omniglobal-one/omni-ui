import * as React from 'react';
import { cn } from './cn';

export type AlertTone = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone: AlertTone;
  title?: string;
}

const toneClasses: Record<AlertTone, string> = {
  success: 'bg-success-soft border-success/20 text-success',
  warning: 'bg-warning-soft border-warning/20 text-warning',
  error: 'bg-error-soft border-error/20 text-error',
  info: 'bg-info-soft border-info/20 text-info',
};

export function Alert({ tone, title, className, children, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn('flex gap-3 rounded-sm border px-4 py-3 text-small', toneClasses[tone], className)}
      {...props}
    >
      <div>
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className="text-omni-ink-soft">{children}</div>
      </div>
    </div>
  );
}
