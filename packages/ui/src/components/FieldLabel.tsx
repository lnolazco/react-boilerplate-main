import clsx from "clsx";
import { createContext, useId } from "react";

export type FieldLabelContextProps = { id?: string };
export const FieldLabelContext = createContext<FieldLabelContextProps>({});

export type FieldLabelProps = Readonly<{
  label: React.ReactNode;
  help?: React.ReactNode;
}> &
  React.ComponentProps<"div">;

export function FieldLabel({
  label,
  help,
  className,
  children,
  ...props
}: Readonly<FieldLabelProps>) {
  const autoId = useId();
  const id = props.id || autoId;

  return (
    <div
      {...props}
      className={clsx(
        "group/fieldlabel leading-5",
        "has-[:user-invalid]:text-danger",
        {
          "flex flex-col space-y-1": label || help,
        },
        className
      )}
    >
      {!!label && (
        <label
          htmlFor={id}
          aria-describedby={clsx({
            [`${id}-help`]: help,
          })}
          className="inline-flex items-center gap-1 text-sm font-medium"
        >
          {label}
        </label>
      )}
      <FieldLabelContext.Provider value={{ id }}>
        {children}
      </FieldLabelContext.Provider>
      {!!help && (
        <p
          id={`${id}-help`}
          role="note"
          className="text-neutral-300 text-sm group-has-[:user-invalid]/fieldlabel:text-current"
        >
          {help}
        </p>
      )}
    </div>
  );
}
