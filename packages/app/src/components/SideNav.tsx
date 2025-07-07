import { Button, Dialog, Divider, NavLink } from "@repo/ui";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import clsx from "clsx";
import {
  FolderIcon,
  HomeIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react";
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderFolderTree = (
    parentId: string | undefined,
    depth: number = 0
  ): React.ReactNode[] => {
    const folders = parentId
      ? imageStore.getChildFolders(parentId)
      : imageStore.getRootFolders();
    return folders.flatMap((folder) => {
      const children = imageStore.getChildFolders(folder.id);
      const isExpanded = !!expanded[folder.id];
      return [
        <div key={folder.id} className="flex items-center">
          {children.length > 0 ? (
            <button
              type="button"
              aria-label={isExpanded ? "Collapse" : "Expand"}
              onClick={() => toggleExpand(folder.id)}
              tabIndex={0}
            >
              {isExpanded ? (
                <ChevronDownIcon size={16} />
              ) : (
                <ChevronRightIcon size={16} />
              )}
            </button>
          ) : (
            <span className={clsx("w-5", { invisible: depth === 0 })} />
          )}
          <NavLink
            as={Link}
            to={`/folders/${folder.id}`}
            icon={FolderIcon}
            aria-current={folderId === folder.id}
            className={clsx({ [`pl-${(depth + 1) * 4}`]: depth > 0 })}
          >
            {folder.name}
          </NavLink>
        </div>,
        ...(isExpanded ? renderFolderTree(folder.id, depth + 1) : []),
      ];
    });
  };

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
        {renderFolderTree(undefined, 0)}
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
