import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from './cn';

export interface DialogProps {
  trigger?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * One primitive, two renderings. Below `sm` (640px) it anchors to the
 * bottom edge — full width, rounded top corners only, a drag handle with
 * real swipe-to-dismiss — instead of centering (doc: "Modal → bottom
 * sheet"). At `sm` and up it's a centered dialog. Radix Dialog supplies
 * the focus trap, ESC handling, and scroll lock either way.
 */
export function Dialog({ trigger, open, onOpenChange, title, description, children }: DialogProps) {
  const [dragY, setDragY] = React.useState(0);
  const dragState = React.useRef<{ startY: number; dragging: boolean }>({ startY: 0, dragging: false });

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startY: e.clientY, dragging: true };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const delta = e.clientY - dragState.current.startY;
    if (delta > 0) setDragY(delta);
  };
  const endDrag = () => {
    if (dragY > 80) onOpenChange?.(false);
    dragState.current.dragging = false;
    setDragY(0);
  };

  // Spread conditionally rather than passing open={open}: under
  // exactOptionalPropertyTypes (Rewards' tsconfig, and a real strict
  // config other consumers may share), an explicit `open: undefined`
  // doesn't type-check the same as omitting the prop entirely.
  const rootProps = {
    ...(open !== undefined ? { open } : {}),
    ...(onOpenChange !== undefined ? { onOpenChange } : {}),
  };

  return (
    <RadixDialog.Root {...rootProps}>
      {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-omni-ink/40 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <RadixDialog.Content
          style={dragY ? { transform: `translateY(${dragY}px)` } : undefined}
          className={cn(
            'fixed z-50 bg-omni-surface outline-none',
            // Mobile: bottom sheet
            'inset-x-0 bottom-0 rounded-t-md border-t border-omni-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]',
            // sm and up: centered dialog
            'sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2',
            'sm:rounded-md sm:border sm:p-6 sm:shadow-lg',
          )}
        >
          {/* Drag handle — mobile only, real pointer-driven swipe-to-dismiss */}
          <div
            className="mx-auto mb-3 h-1.5 w-10 shrink-0 touch-none rounded-full bg-omni-border-strong sm:hidden"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          />
          <RadixDialog.Title className="font-display text-h2 font-semibold text-omni-ink">{title}</RadixDialog.Title>
          {description ? (
            <RadixDialog.Description className="mt-1 text-small text-omni-ink-soft">
              {description}
            </RadixDialog.Description>
          ) : null}
          <div className="mt-4">{children}</div>
          <RadixDialog.Close
            className="absolute right-4 top-4 min-h-[44px] min-w-[44px] rounded-sm text-omni-ink-faint hover:text-omni-ink sm:right-5 sm:top-5"
            aria-label="Close"
          >
            ✕
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
