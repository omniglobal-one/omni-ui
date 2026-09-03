import * as React from 'react';
import { cn } from './cn';

export interface NavDestination {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface BottomTabNavProps {
  destinations: NavDestination[];
  renderLink: (dest: NavDestination, children: React.ReactNode) => React.ReactNode;
}

/** Fixed, 56px tall, under `sm` only — 5 destinations max (doc's own rule;
 * enforced here, not just documented, so a sixth item fails loudly in dev
 * rather than silently squeezing). `renderLink` takes whatever router
 * component a product already uses (Next's <Link>, typically). */
export function BottomTabNav({ destinations, renderLink }: BottomTabNavProps) {
  if (destinations.length > 5 && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(`BottomTabNav: ${destinations.length} destinations passed, doc caps this at 5.`);
  }
  return (
    <nav
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex h-14 border-t border-omni-border bg-omni-surface sm:hidden',
        'pb-[env(safe-area-inset-bottom)]',
      )}
    >
      {destinations.slice(0, 5).map((dest) =>
        renderLink(
          dest,
          <div
            key={dest.key}
            className={cn(
              'flex min-w-[44px] flex-1 flex-col items-center justify-center gap-0.5 text-[11px]',
              dest.active ? 'text-accent' : 'text-omni-ink-faint',
            )}
          >
            <span className="text-[18px] leading-none">{dest.icon}</span>
            {dest.label}
          </div>,
        ),
      )}
    </nav>
  );
}
