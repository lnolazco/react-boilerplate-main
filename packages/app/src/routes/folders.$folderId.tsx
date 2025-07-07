import { Button, Dialog, Divider, Heading } from "@repo/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SettingsIcon, Trash2Icon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { FolderForm } from "../components/FolderForm";
import { ImagesList } from "../components/ImagesList";
import { imageStore } from "../stores/ImageStore";
import { autorun } from "mobx";

export const Route = createFileRoute("/folders/$folderId")({
  component: () => <RouteComponent />,
});

export const RouteComponent = observer(() => {
  const { folderId } = Route.useParams();
  const folder = imageStore.getFolder(folderId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() =>
    autorun(() => {
      if (!folder) {
        navigate({ to: "/" });
      }
    })
  );

  return !folder ? null : (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        <Heading level={1}>{folder.name}</Heading>
        <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger>
              <Button icon={SettingsIcon}>Settings</Button>
            </Dialog.Trigger>
            <Dialog.Content title="Folder settings">
              <FolderForm
                defaultValues={folder}
                onSuccess={() => setIsDialogOpen(false)}
                onCancel={() => setIsDialogOpen(false)}
              />
            </Dialog.Content>
          </Dialog>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <Dialog.Trigger>
              <Button icon={Trash2Icon} variant="muted">
                Delete folder
              </Button>
            </Dialog.Trigger>
            <Dialog.Content title="Delete folder?">
              <div className="space-y-4">
                <p>
                  Deleting a folder will also delete all subfolders and images
                  in them. This action can not be undone.
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
                      imageStore.deleteFolder(folder.id);
                      setIsDeleteDialogOpen(false);
                    }}
                  >
                    Delete folder
                  </Button>
                </div>
              </div>
            </Dialog.Content>
          </Dialog>
        </div>
      </header>
      <Divider />
      <ImagesList folderId={folderId} />
    </section>
  );
});
