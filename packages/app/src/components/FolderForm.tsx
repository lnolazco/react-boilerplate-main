import { Button, FieldLabel, Input } from "@repo/ui";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";

import { Folder, imageStore } from "../stores/ImageStore";

export type FolderFormProps = Readonly<{
  defaultValues?: Partial<Folder>;
  onSuccess?: (values: Folder) => void;
  onCancel?: () => void;
}>;

export const FolderForm = observer(
  ({ defaultValues, onSuccess, onCancel }: FolderFormProps) => {
    const handleSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;

        let id = defaultValues?.id;
        if (id) {
          imageStore.renameFolder(id, name);
        } else {
          id = imageStore.createFolder(name);
        }

        e.currentTarget.reset();
        onSuccess?.({ id, name });
      },
      [defaultValues?.id, onSuccess]
    );

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="id" defaultValue={defaultValues?.id} />
        <FieldLabel label="Folder name">
          <Input
            name="name"
            placeholder="Folder name"
            defaultValue={defaultValues?.name}
            autoFocus
            autoComplete="off"
            required
          />
        </FieldLabel>
        <div className="flex flex-row-reverse items-center justify-start gap-2">
          <Button type="submit" variant="primary">
            {defaultValues?.id ? "Save" : "Create folder"}
          </Button>
          <Button onClick={onCancel} variant="muted">
            Cancel
          </Button>
        </div>
      </form>
    );
  }
);
