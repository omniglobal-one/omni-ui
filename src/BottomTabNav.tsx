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
      {destinations.slice(0, 5).map((dest) => (
        // flex-1/min-w-0 live on this wrapper, not on whatever renderLink
        // returns — CSS flex properties only apply to direct children of
        // the flex container, and renderLink's <Link> is the direct child,
        // not the styled div passed as its children. The [&>a] rule forces
        // that <a> (or whatever single element renderLink wraps around
        // children) to actually fill this column instead of sizing to its
        // content — without it, a long label like "QR Check-in" doesn't
        // get a real 44px+ touch target and runs into its neighbor.
        <div key={dest.key} className="min-w-0 flex-1 [&>a]:flex [&>a]:h-full [&>a]:w-full">
          {renderLink(
            dest,
            <div
              className={cn(
                'flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 text-[11px]',
                dest.active ? 'text-accent' : 'text-omni-ink-faint',
              )}
            >
              <span className="text-[18px] leading-none">{dest.icon}</span>
              <span className="w-full truncate text-center leading-tight">{dest.label}</span>
            </div>,
          )}
        </div>
      ))}
    </nav>
  );
}
