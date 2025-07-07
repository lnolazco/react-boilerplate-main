import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "lucide-react";
import clsx from "clsx";
import React from "react";

export type SelectOption = {
  value: string;
  label: string;
  depth?: number; // for indentation
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onValueChange,
  label,
  placeholder = "Select...",
  disabled,
  className,
}) => {
  const triggerId = React.useId();
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={triggerId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <RadixSelect.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          id={triggerId}
          className={clsx(
            "inline-flex items-center justify-between h-9 px-3 rounded-sm border border-neutral-600 bg-neutral-900 text-neutral-100",
            "outline-none focus-visible:outline-2 focus-visible:outline-accent-ring outline-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          aria-label={label}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="ml-2">
            <ChevronDownIcon size={16} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="z-50 min-w-[180px] rounded-sm border border-neutral-700 bg-neutral-950 shadow-lg">
            <RadixSelect.ScrollUpButton className="flex items-center justify-center h-6">
              <ChevronUpIcon size={16} />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="py-1">
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer select-none",
                    "data-[highlighted]:bg-accent data-[highlighted]:text-neutral-900",
                    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
                    opt.depth ? `pl-${(opt.depth + 1) * 4}` : "pl-4"
                  )}
                >
                  <RadixSelect.ItemIndicator>
                    <CheckIcon size={14} className="mr-2" />
                  </RadixSelect.ItemIndicator>
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className="flex items-center justify-center h-6">
              <ChevronDownIcon size={16} />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
};
