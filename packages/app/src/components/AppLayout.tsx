import { Button } from "@repo/ui";
import clsx from "clsx";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

import { SideNav } from "./SideNav";

export type MainLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: MainLayoutProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <SideNav
        className={clsx(
          "fixed left-0 inset-y-0 z-50",
          "w-64",
          "border-r border-neutral-800 bg-neutral-950",
          "transition-transform max-md:transform-gpu",
          {
            "max-md:-translate-x-full": !isNavOpen,
            "max-md:translate-x-0": isNavOpen,
          }
        )}
      />
      <button
        className={clsx(
          "appearance-none cursor-pointer",
          "fixed inset-0 md:hidden",
          "outline-none",
          "transition-all",
          {
            "pointer-events-none -z-10 bg-transparent": !isNavOpen,
            "pointer-events-auto z-40 bg-neutral-950/80": isNavOpen,
          }
        )}
        aria-label="Close navigation"
        onClick={() => setIsNavOpen(false)}
      />
      <div
        className={clsx(
          "fixed top-0 inset-x-0 z-30 md:hidden",
          "h-12 px-4",
          "flex items-center",
          "border-b border-neutral-800"
        )}
      >
        <Button
          aria-label="Open navigation"
          variant="muted"
          icon={MenuIcon}
          onClick={() => setIsNavOpen(true)}
        />
      </div>
      <main className="md:pl-64 max-md:pt-12 min-h-screen">
        <div className="p-4 lg:p-12">{children}</div>
      </main>
    </>
  );
};
