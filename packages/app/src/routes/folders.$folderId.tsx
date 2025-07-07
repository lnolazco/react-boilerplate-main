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

const RouteComponent = observer(() => {
  const { folderId } = Route.useParams();
  const folder = imageStore.getFolder(folderId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
          <Button
            onClick={() => imageStore.deleteFolder(folder.id)}
            icon={Trash2Icon}
          >
            Delete folder
          </Button>
        </div>
      </header>
      <Divider />
      <ImagesList folderId={folderId} />
    </section>
  );
});
