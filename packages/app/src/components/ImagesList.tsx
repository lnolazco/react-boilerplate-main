import { Button, CheckBox, Dialog, DropZone, ImagePreview } from "@repo/ui";
import { FolderInputIcon, Trash2Icon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { imageStore } from "../stores/ImageStore";
import { MoveImages } from "./MoveImages";

export type ImagesListProps = {
  folderId?: string;
};

export const ImagesList = observer(({ folderId }: ImagesListProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const images = imageStore.getImagesInFolder(folderId);

  const toggle = (imageId: string) => {
    setSelected((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  const toggleAll = () => {
    setSelected((prev) =>
      prev.length === images.length ? [] : images.map((image) => image.id)
    );
  };

  const moveLabel = `Move ${selected.length} ${selected.length < 2 ? "image" : "images"}`;

  return (
    <section className="space-y-4">
      <DropZone
        onDrop={(files: File[]) =>
          imageStore.uploadMultipleImages(files, folderId)
        }
      />

      {images.length > 0 && (
        <div className="flex items-center justify-end gap-4">
          <CheckBox
            checked={
              selected.length > 0
                ? selected.length < images.length
                  ? "indeterminate"
                  : true
                : false
            }
            onCheckedChange={toggleAll}
          >
            {selected.length === images.length ? "Deselect all" : "Select all"}
          </CheckBox>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger>
              <Button
                disabled={
                  selected.length === 0 || imageStore.folders.length === 0
                }
                icon={FolderInputIcon}
              >
                {moveLabel}
              </Button>
            </Dialog.Trigger>
            <Dialog.Content
              title={moveLabel}
              description="Select a folder to move the selected images to."
            >
              <MoveImages
                imageIds={selected}
                onSuccess={() => {
                  setSelected([]);
                  setIsDialogOpen(false);
                }}
                onCancel={() => {
                  setIsDialogOpen(false);
                }}
              />
            </Dialog.Content>
          </Dialog>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <Dialog.Trigger>
              <Button
                variant="muted"
                disabled={selected.length === 0}
                icon={Trash2Icon}
              >
                Delete selected
              </Button>
            </Dialog.Trigger>
            <Dialog.Content
              title="Delete selected images?"
              description="This will permanently delete the selected images. This action cannot be undone."
            >
              <div className="space-y-4">
                <p>
                  This will permanently delete the selected images. This action
                  can not be undone.
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="muted"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      imageStore.deleteImages(selected);
                      setSelected([]);
                      setIsDeleteDialogOpen(false);
                    }}
                  >
                    Delete images
                  </Button>
                </div>
              </div>
            </Dialog.Content>
          </Dialog>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4" data-testid="gallery">
        {imageStore.getImagesInFolder(folderId).map((image) => (
          <div
            className="relative select-none"
            key={image.id}
            data-testid={`gallery-${image.id}`}
          >
            <CheckBox
              aria-label="Select image"
              className="absolute top-2 right-2 z-10"
              checked={selected.includes(image.id)}
              onCheckedChange={() => toggle(image.id)}
            />
            <ImagePreview src={image.base64} alt={image.name} />
          </div>
        ))}
      </div>
    </section>
  );
});
