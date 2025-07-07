import { Button, Dialog, Divider, NavLink } from "@repo/ui";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import clsx from "clsx";
import { FolderIcon, HomeIcon, PlusIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { imageStore } from "../stores/ImageStore";
import { FolderForm } from "./FolderForm";

export type SideNavProps = Omit<React.ComponentProps<"nav">, "children">;

export const SideNav = observer(({ className, ...props }: SideNavProps) => {
  const { folderId } = useParams({
    strict: false,
  });
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <nav
      {...props}
      className={clsx("flex flex-col h-full p-4 gap-2", className)}
    >
      <NavLink icon={HomeIcon} as={Link} to="/" aria-current={!folderId}>
        All images
      </NavLink>
      <Divider />
      <div className="grow overflow-y-auto scrollbar-none flex flex-col gap-1">
        {imageStore.folders.map((folder) => (
          <NavLink
            as={Link}
            key={folder.id}
            to={`/folders/${folder.id}`}
            icon={FolderIcon}
            aria-current={folderId === folder.id}
          >
            {folder.name}
          </NavLink>
        ))}
      </div>
      <Divider />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger>
          <Button icon={PlusIcon}>Create folder</Button>
        </Dialog.Trigger>
        <Dialog.Content title="New folder">
          <FolderForm
            onSuccess={({ id }) => {
              setIsDialogOpen(false);
              navigate({
                to: "/folders/$folderId",
                params: { folderId: id },
              });
            }}
            onCancel={() => setIsDialogOpen(false)}
          />
        </Dialog.Content>
      </Dialog>
    </nav>
  );
});
