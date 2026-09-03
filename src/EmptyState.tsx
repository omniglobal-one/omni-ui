import * as React from 'react';

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

/** No icon-in-a-circle. Copy does the work — the doc's own complaint about
 * filler empty-state text ("will appear here in real time") means the
 * title/description are required props, not optional decoration. */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md bg-omni-surface-sunk px-6 py-10 text-center">
      <h4 className="font-display text-h2 font-semibold text-omni-ink">{title}</h4>
      <p className="max-w-[34ch] text-small text-omni-ink-soft">{description}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
