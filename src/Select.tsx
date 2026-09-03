import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { cn } from './cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

/** Built on Radix Select for correct keyboard nav and focus handling —
 * skinned entirely in OMNI tokens, none of Radix's (nonexistent) default
 * look, none of shadcn's version of it either. */
export function Select({ label, options, value, defaultValue, onValueChange, placeholder }: SelectProps) {
  const id = React.useId();
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-small font-semibold text-omni-ink">
        {label}
      </label>
      <RadixSelect.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
        <RadixSelect.Trigger
          id={id}
          className={cn(
            'flex min-h-[44px] w-full items-center justify-between rounded-sm border border-omni-border-strong',
            'bg-omni-surface px-3 py-2 font-sans text-body text-omni-ink outline-none',
            'focus:border-accent focus:ring-4 focus:ring-accent/10 data-[placeholder]:text-omni-ink-faint',
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="text-omni-ink-faint">▾</RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={4}
            className="z-50 overflow-hidden rounded-md border border-omni-border bg-omni-surface shadow-md"
          >
            <RadixSelect.Viewport className="p-1">
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-body text-omni-ink outline-none',
                    'data-[highlighted]:bg-accent-subtle/8 data-[highlighted]:text-accent',
                    'data-[state=checked]:font-semibold',
                  )}
                >
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}
