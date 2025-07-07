import { Button, NavLink } from "@repo/ui";
import { FolderIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";

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

    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          {imageStore.folders.map((folder) => (
            <NavLink
              as="button"
              key={folder.id}
              icon={FolderIcon}
              onClick={() => handleMove(folder.id)}
            >
              {folder.name}
            </NavLink>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
);
