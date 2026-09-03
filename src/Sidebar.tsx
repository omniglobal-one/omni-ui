import * as React from 'react';
import { cn } from './cn';
import type { NavDestination } from './BottomTabNav';

export interface SidebarProps {
  destinations: NavDestination[];
  renderLink: (dest: NavDestination, children: React.ReactNode) => React.ReactNode;
  productName: string;
  productLogo?: React.ReactNode;
  /** Account info, sign-out — whatever a product pins to the bottom.
   * Almost every real sidebar needs this, so it's part of the shared
   * component rather than something each pilot hand-rolls around it. */
  footer?: React.ReactNode;
}

/**
 * Desktop (lg, 1024px+): always expanded, full labels.
 * Tablet (sm–lg, 640–1023px): collapses to an icon rail — same active-state
 * and hover rules, just no label text.
 * Under `sm`: hidden entirely (BottomTabNav takes over).
 */
export function Sidebar({ destinations, renderLink, productName, productLogo, footer }: SidebarProps) {
  return (
    <aside className="hidden w-16 shrink-0 flex-col border-r border-omni-border bg-omni-surface sm:flex lg:w-56">
      <div className="flex h-14 items-center gap-2 border-b border-omni-border px-4">
        {productLogo}
        <span className="hidden font-display text-h2 font-semibold text-omni-ink lg:inline">{productName}</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {destinations.map((dest) => (
          // See BottomTabNav for why [&>a] is needed: renderLink's <Link>
          // is the actual flex child here, not the div passed as its
          // children, so width/rounded-corner/highlight styling on that
          // div alone won't reliably fill or clip to the row.
          <div key={dest.key} className="[&>a]:flex [&>a]:w-full">
            {renderLink(
              dest,
              <div
                className={cn(
                  'flex min-h-[44px] w-full items-center gap-3 rounded-sm px-3 text-small font-semibold',
                  dest.active
                    ? 'bg-accent-subtle/8 text-accent'
                    : 'text-omni-ink-soft hover:bg-omni-surface-sunk hover:text-omni-ink',
                )}
              >
                <span className="text-[16px] leading-none">{dest.icon}</span>
                <span className="hidden truncate lg:inline">{dest.label}</span>
              </div>,
            )}
          </div>
        ))}
      </nav>
      {footer ? <div className="border-t border-omni-border p-2">{footer}</div> : null}
    </aside>
  );
}
