import clsx from "clsx";

export type DividerProps = React.ComponentProps<"div">;

export const Divider = ({ className, ...props }: DividerProps) => {
  return (
    <div
      {...props}
      role="separator"
      className={clsx("h-px bg-neutral-800", className)}
    />
  );
};
