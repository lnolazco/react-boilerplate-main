import { Button, NavLink } from "@repo/ui";
import { FolderIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import clsx from "clsx";

import { imageStore } from "../stores/ImageStore";

export type MoveImagesProps = {
  imageIds: string[];
  onSuccess?: (folderId: string) => void;
  onCancel?: () => void;
};

export const MoveImages = observer(
  ({ imageIds, onSuccess, onCancel }: MoveImagesProps) => {
    const handleMove = useCallback(
      (folderId: string) => {
        imageStore.moveImages(imageIds, folderId);
        onSuccess?.(folderId);
      },
      [imageIds, onSuccess]
    );

    // Recursive rendering of folder tree for move target selection
    const renderFolderTree = (
      parentId: string | undefined,
      depth: number = 0
    ): React.ReactNode[] => {
      const folders = parentId
        ? imageStore.getChildFolders(parentId)
        : imageStore.getRootFolders();
      return folders.flatMap((folder) => [
        <NavLink
          as="button"
          key={folder.id}
          icon={FolderIcon}
          onClick={() => handleMove(folder.id)}
          className={clsx({ [`pl-${(depth + 1) * 4}`]: depth > 0 })}
        >
          {folder.name}
        </NavLink>,
        ...renderFolderTree(folder.id, depth + 1),
      ]);
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          {renderFolderTree(undefined, 0)}
        </div>
        <div className="flex justify-end">
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
);
