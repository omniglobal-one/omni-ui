import * as React from 'react';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { cn } from './cn';

export interface DropdownMenuItemDef {
  label: string;
  onSelect: () => void;
  destructive?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactElement;
  items: DropdownMenuItemDef[];
}

export function DropdownMenu({ trigger, items }: DropdownMenuProps) {
  return (
    <RadixDropdown.Root>
      <RadixDropdown.Trigger asChild>{trigger}</RadixDropdown.Trigger>
      <RadixDropdown.Portal>
        <RadixDropdown.Content
          align="end"
          sideOffset={6}
          className="z-50 min-w-[180px] rounded-md border border-omni-border bg-omni-surface p-1 shadow-md"
        >
          {items.map((item) => (
            <RadixDropdown.Item
              key={item.label}
              onSelect={item.onSelect}
              className={cn(
                'cursor-pointer select-none rounded-sm px-3 py-2 text-small text-omni-ink outline-none',
                'data-[highlighted]:bg-omni-surface-sunk',
                item.destructive && 'text-error data-[highlighted]:bg-error-soft',
              )}
            >
              {item.label}
            </RadixDropdown.Item>
          ))}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  );
}
