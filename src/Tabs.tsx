import * as React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from './cn';

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
}

export function Tabs({ items, defaultValue }: TabsProps) {
  return (
    <RadixTabs.Root defaultValue={defaultValue ?? items[0]?.value}>
      <RadixTabs.List className="flex gap-6 border-b border-omni-border">
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              'border-b-2 border-transparent py-2.5 font-sans text-small font-semibold text-omni-ink-faint',
              'data-[state=active]:border-accent data-[state=active]:text-omni-ink',
              'outline-none focus-visible:text-accent',
            )}
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value} className="pt-4">
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
