import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectOption } from "./Select";

const options: SelectOption[] = [
  { value: "root", label: "Root", depth: 0 },
  { value: "folder1", label: "Folder 1", depth: 1 },
  { value: "folder2", label: "Folder 2", depth: 1 },
  { value: "subfolder1", label: "Subfolder 1", depth: 2 },
  { value: "folder3", label: "Folder 3", depth: 1, disabled: true },
];

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Components/Select",
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Hierarchical: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-64">
        <Select
          label="Parent Folder"
          options={options}
          value={value}
          onValueChange={setValue}
          placeholder="Choose a folder..."
        />
        <div className="mt-2 text-sm text-neutral-400">
          Selected: {value || "(none)"}
        </div>
      </div>
    );
  },
};
