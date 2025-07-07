import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { XIcon } from "lucide-react";

import { Button } from "./Button";
import { Divider } from "./Divider";
import { Heading } from "./Heading";

export type DialogProps = DialogPrimitive.DialogProps;

export type DialogTriggerProps = DialogPrimitive.DialogTriggerProps;
export type DialogContentProps = DialogPrimitive.DialogContentProps &
  Readonly<{
    title: React.ReactNode;
  }>;

export const Dialog = (props: DialogProps) => {
  return <DialogPrimitive.Root {...props} />;
};

const DialogTrigger = (props: DialogTriggerProps) => {
  return <DialogPrimitive.DialogTrigger asChild {...props} />;
};

const DialogContent = ({
  title,
  className,
  children,
  ...props
}: DialogContentProps) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-neutral-950/80" />
      <DialogPrimitive.Content
        {...props}
        className={clsx(
          "pointer-events-none overflow-hidden",
          "fixed inset-0 z-50",
          "flex items-center justify-center p-4"
        )}
      >
        <div
          className={clsx(
            "pointer-events-auto relative overflow-auto",
            "min-w-0 w-full max-w-96 min-h-0 max-h-full p-4",
            "rounded-sm border-2 border-neutral-800 bg-neutral-950",
            className
          )}
        >
          <header className="mb-4">
            <DialogPrimitive.Title asChild>
              <Heading level={2} className="pe-16">
                {title}
              </Heading>
            </DialogPrimitive.Title>
            <Divider className="mt-1" />
            <DialogPrimitive.Close asChild>
              <Button
                type="submit"
                variant="muted"
                icon={XIcon}
                aria-label="Close"
                className="absolute top-1.5 right-1.5 z-10"
              />
            </DialogPrimitive.Close>
          </header>
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
