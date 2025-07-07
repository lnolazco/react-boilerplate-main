import clsx from "clsx";

export type HeadingProps = Readonly<{
  level?: 1 | 2 | 3;
}> &
  React.ComponentProps<"h1">;

export const Heading = ({ level = 2, className, ...props }: HeadingProps) => {
  const Component = `h${level}` as const;
  return (
    <Component
      {...props}
      className={clsx(
        "font-medium",
        {
          "text-2xl": level === 1,
          "text-xl": level === 2,
          "text-lg": level === 3,
        },
        className,
      )}
    />
  );
};
