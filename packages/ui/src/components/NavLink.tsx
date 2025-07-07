import clsx from "clsx";
import { forwardRef } from "react";

import { Icon } from "./Icon";

export type NavLinkProps<C extends React.ElementType> = Readonly<{
  as?: C;
  icon?: React.ElementType;
}> &
  React.ComponentProps<C>;

export const NavLink = forwardRef(
  <C extends React.ElementType = "a">(
    {
      as: Component = "button",
      icon: IconComponent,
      children,
      className,
      ...props
    }: NavLinkProps<C>,
    ref: React.ForwardedRef<C>
  ) => {
    const isCurrent = !!props["aria-current"];
    return (
      <Component
        ref={ref}
        {...props}
        className={clsx(
          "cursor-pointer appearance-none",
          "inline-flex items-center gap-2 px-3",
          "h-9 rounded-sm",
          "outline-none outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent-ring",
          "font-medium",
          {
            "bg-transparent hover:bg-neutral-50/10 text-neutral-200 hover:text-neutral-50":
              !isCurrent,
            "bg-neutral-50/10 text-neutral-50": isCurrent,
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

NavLink.displayName = "NavLink";
