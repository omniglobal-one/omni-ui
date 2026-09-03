import * as React from 'react';
import { cn } from './cn';

export interface Stat {
  label: string;
  value: string;
  delta?: { direction: 'up' | 'down'; label: string };
}

export interface StatRowProps {
  stats: Stat[];
}

/**
 * A top rule and a mono figure — no card, no icon circle. Below `sm`
 * (640px) this becomes a horizontal, scroll-snapped strip instead of
 * crushing 3+ numbers into a third of the width each (doc: "Dashboard
 * stats," mobile section); at `sm` and up it's a static grid.
 */
export function StatRow({ stats }: StatRowProps) {
  return (
    <div
      className={cn(
        'flex gap-6 overflow-x-auto snap-x snap-mandatory pb-1',
        'sm:grid sm:overflow-visible sm:pb-0',
      )}
      style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
    >
      {stats.map((s) => (
        <div key={s.label} className="min-w-[140px] shrink-0 snap-start border-t-2 border-omni-ink pt-2 sm:min-w-0">
          <div className="text-small text-omni-ink-faint">{s.label}</div>
          <div className="font-mono text-[32px] font-medium leading-none text-omni-ink tabular-nums">{s.value}</div>
          {s.delta ? (
            <div className={cn('mt-1 text-[12.5px]', s.delta.direction === 'up' ? 'text-success' : 'text-error')}>
              {s.delta.direction === 'up' ? '↑' : '↓'} {s.delta.label}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
