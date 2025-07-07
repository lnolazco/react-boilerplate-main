import clsx from "clsx";
import { useContext } from "react";

import { FieldLabelContext } from "./FieldLabel";

export type InputProps = Readonly<{
  type?:
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}> &
  React.ComponentProps<"input">;

export const Input = ({
  type = "text",
  className,
  ...props
}: Readonly<InputProps>) => {
  const { id } = useContext(FieldLabelContext);

  return (
    <input
      id={id}
      {...props}
      type={type}
      className={clsx(
        "appearance-none",
        "inline-flex",
        "h-9 min-w-0 py-1 px-2",
        "rounded-sm border border-neutral-600 bg-neutral-900",
        "outline-none focus-visible:outline-2 focus-visible:outline-accent-ring outline-offset-2",
        "text-neutral-100 text-base/5 font-sans",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "[&:user-invalid]:border-danger [&:user-invalid]:text-danger",
        {
          "file:h-full file:px-2": type === "file",
          "file:border-neutral-800 file:rounded-sm file:border":
            type === "file",
          "file:bg-neutral-900 file:hover:bg-neutral-950": type === "file",
          "file:text-sm/4 file:font-medium": type === "file",
          "file:text-neutral-200 file:hover:text-current": type === "file",
          "file:cursor-pointer": type === "file",
        },
        {
          "[-moz-appearance:textfield]": type === "number",
          "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none":
            type === "number",
          "[&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0":
            type === "number",
        },
        className
      )}
    />
  );
};
