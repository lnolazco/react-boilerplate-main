import { Button, FieldLabel, Input, Select, SelectOption } from "@repo/ui";
import { observer } from "mobx-react-lite";
import { useCallback, useMemo, useState } from "react";

import { Folder, imageStore } from "../stores/ImageStore";

export type FolderFormProps = Readonly<{
  defaultValues?: Partial<Folder>;
  onSuccess?: (values: Folder) => void;
  onCancel?: () => void;
}>;

export const FolderForm = observer(
  ({ defaultValues, onSuccess, onCancel }: FolderFormProps) => {
    const [parentId, setParentId] = useState<string>(
      defaultValues?.parentId ?? "__root__"
    );

    // Build hierarchical options for the Select
    const folderOptions = useMemo(() => {
      // Helper to recursively build options with depth
      const buildOptions = (
        folders: Folder[],
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
      const options: SelectOption[] = [
        { value: "__root__", label: "No parent", depth: 0 },
        ...buildOptions(imageStore.folders, undefined, 0),
      ];
      // Exclude self if editing
      if (defaultValues?.id) {
        return options.filter((opt) => opt.value !== defaultValues.id);
      }
      return options;
    }, [imageStore.folders, defaultValues?.id]);

    const handleSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        let id = defaultValues?.id;
        const selectedParentId = parentId === "__root__" ? undefined : parentId;
        if (id) {
          imageStore.renameFolder(id, name);
          // Optionally update parentId if editing
        } else {
          id = imageStore.createFolder(name, selectedParentId);
        }
        e.currentTarget.reset();
        onSuccess?.({ id, name, parentId: selectedParentId });
      },
      [defaultValues?.id, onSuccess, parentId]
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
        <FieldLabel label="Parent folder">
          <Select
            options={folderOptions}
            value={parentId}
            onValueChange={setParentId}
            label="Parent folder"
            placeholder="Select parent folder..."
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
