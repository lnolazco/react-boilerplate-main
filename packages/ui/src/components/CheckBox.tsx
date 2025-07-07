import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { CheckIcon, MinusIcon } from "lucide-react";

import { Icon } from "./Icon";

export type CheckBoxProps = CheckboxPrimitive.CheckboxProps;

export const CheckBox = ({ className, children, ...props }: CheckBoxProps) => {
  return (
    <CheckboxPrimitive.Root {...props} asChild>
      <span
        className={clsx(
          "inline-flex items-start gap-2 leading-5",
          {
            "opacity-50 cursor-not-allowed": props.disabled,
            "cursor-pointer": !props.disabled,
          },
          className
        )}
      >
        <CheckboxPrimitive.Indicator
          forceMount
          className={clsx(
            "group flex-none select-none",
            "inline-flex items-center justify-center",
            "h-5 w-5",
            "rounded border outline-none",
            "text-neutral-800 text-xs/0 border-neutral-600 bg-neutral-950",
            "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
            "data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent"
          )}
        >
          <Icon>
            <MinusIcon
              strokeWidth={3}
              className="hidden group-data-[state=indeterminate]:inline"
            />
            <CheckIcon
              strokeWidth={3}
              className="hidden group-data-[state=checked]:inline"
            />
          </Icon>
        </CheckboxPrimitive.Indicator>
        {children}
      </span>
    </CheckboxPrimitive.Root>
  );
};
