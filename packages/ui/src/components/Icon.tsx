import cx from "clsx";

export type IconProps = Readonly<{
  manualSize?: boolean;
  label?: string;
}> &
  React.ComponentProps<"i">;

export const Icon = ({
  manualSize,
  label,
  className,
  ...props
}: Readonly<IconProps>) => {
  return (
    <i
      role="img"
      {...props}
      aria-label={label}
      aria-hidden={!label}
      className={cx(
        "select-none aspect-square w-auto shrink-0",
        "inline-flex flex-none align-middle",
        "not-italic",
        {
          "h-[1em]": !manualSize,
        },
        "*:h-full *:w-auto *:flex-none",
        className,
      )}
    />
  );
};
