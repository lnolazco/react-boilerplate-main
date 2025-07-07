import { Button, Select, SelectOption } from "@repo/ui";
import { observer } from "mobx-react-lite";
import { useCallback, useMemo, useState } from "react";

import { imageStore } from "../stores/ImageStore";

export type MoveImagesProps = {
  imageIds: string[];
  onSuccess?: (folderId: string) => void;
  onCancel?: () => void;
};

export const MoveImages = observer(
  ({ imageIds, onSuccess, onCancel }: MoveImagesProps) => {
    const [selectedFolder, setSelectedFolder] = useState<string>("");

    // Build hierarchical options for the Select
    const folderOptions = useMemo(() => {
      const buildOptions = (
        folders: typeof imageStore.folders,
        parent: string | undefined,
        depth: number
      ): SelectOption[] => {
        return folders
          .filter((f) => f.parentId === parent)
          .flatMap((f) => [
            { value: f.id, label: f.name, depth },
            ...buildOptions(folders, f.id, depth + 1),
          ]);
      };
      return buildOptions(imageStore.folders, undefined, 0);
    }, [imageStore.folders]);

    const handleMove = useCallback(
      (folderId: string) => {
        imageStore.moveImages(imageIds, folderId);
        onSuccess?.(folderId);
      },
      [imageIds, onSuccess]
    );

    return (
      <div className="space-y-4">
        <Select
          options={folderOptions}
          value={selectedFolder}
          onValueChange={setSelectedFolder}
          label="Move to folder"
          placeholder="Select target folder..."
        />
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => handleMove(selectedFolder)}
            disabled={!selectedFolder}
            variant="primary"
          >
            Move
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
);
