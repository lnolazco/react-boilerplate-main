import clsx from "clsx";
import { forwardRef } from "react";

import { Icon } from "./Icon";

export type ButtonProps<C extends React.ElementType> = Readonly<{
  as?: C;
  variant?: "primary" | "secondary" | "muted";
  icon?: React.ElementType;
  iconPosition?: "start" | "end";
}> &
  React.ComponentProps<C>;

export const Button = forwardRef(
  <C extends React.ElementType = "button">(
    {
      as: Component = "button",
      variant = "secondary",
      icon: IconComponent,
      iconPosition = "start",
      children,
      className,
      ...props
    }: ButtonProps<C>,
    ref: React.ForwardedRef<C>
  ) => {
    const iconOnly = !children && IconComponent;
    return (
      <Component
        ref={ref}
        {...props}
        className={clsx(
          "cursor-pointer appearance-none",
          "inline-flex items-center justify-center gap-2",
          "h-9 rounded-sm",
          "outline-none outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent-ring",
          "font-medium",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "px-3": !iconOnly,
            "aspect-square": iconOnly,
            "flex-row-reverse": iconPosition === "end",
            "bg-accent hover:bg-accent-hover text-neutral-800 hover:text-neutral-900":
              variant === "primary",
            "bg-neutral-200 hover:bg-neutral-300 text-neutral-800 hover:text-neutral-900":
              variant === "secondary",
            "bg-transparent hover:bg-neutral-50/10 text-neutral-200 hover:text-neutral-50":
              variant === "muted",
          },
          className
        )}
      >
        {IconComponent && (
          <Icon>
            <IconComponent />
          </Icon>
        )}
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
