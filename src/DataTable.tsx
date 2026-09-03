import * as React from 'react';
import { cn } from './cn';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  /** The one column promoted to the card title below `sm` (640px). Exactly
   * one column per table should set this. */
  primary?: boolean;
  align?: 'left' | 'right';
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  /** Row keys currently selected — paints `accent-subtle` per the doc's
   * tier system (a real selection, not decoration). */
  selectedKeys?: Set<string>;
}

/**
 * Below `sm` (640px) a table stops being a table (doc: "Table → list, not
 * table → scroll"). Both markups render — CSS, not JS, switches between
 * them — so there's no resize listener and no server/client mismatch.
 */
export function DataTable<T>({ columns, rows, rowKey, onRowClick, selectedKeys }: DataTableProps<T>) {
  const primaryCol = columns.find((c) => c.primary) ?? columns[0];
  const restCols = columns.filter((c) => c !== primaryCol);

  return (
    <>
      {/* Desktop / tablet: real table, sm and up */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-small">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    'border-b border-omni-border-strong px-3.5 py-2.5 font-mono text-caption font-semibold uppercase tracking-wide text-omni-ink-faint',
                    c.align === 'right' ? 'text-right' : 'text-left',
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const key = rowKey(row);
              const selected = selectedKeys?.has(key);
              return (
                <tr
                  key={key}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'border-b border-omni-border last:border-none',
                    onRowClick && 'cursor-pointer hover:bg-omni-surface-sunk',
                    selected && 'bg-accent-subtle/8',
                  )}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={cn('px-3.5 py-3 text-omni-ink', c.align === 'right' && 'text-right font-mono tabular-nums')}
                    >
                      {c.render(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: each row becomes a card, under sm */}
      <div className="flex flex-col gap-3 sm:hidden">
        {rows.map((row) => {
          const key = rowKey(row);
          const selected = selectedKeys?.has(key);
          return (
            <div
              key={key}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'rounded-md border border-omni-border bg-omni-surface p-4',
                onRowClick && 'cursor-pointer',
                selected && 'border-accent bg-accent-subtle/8',
              )}
            >
              <div className="mb-2 font-sans text-body font-semibold text-omni-ink">{primaryCol.render(row)}</div>
              {restCols.map((c) => (
                <div
                  key={c.key}
                  className="flex items-center justify-between border-t border-omni-border py-1.5 text-small"
                >
                  <span className="text-omni-ink-faint">{c.header}</span>
                  <span className={cn('text-omni-ink', c.align === 'right' && 'font-mono tabular-nums')}>
                    {c.render(row)}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
