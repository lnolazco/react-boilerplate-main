import type { Meta, StoryObj } from "@storybook/react";

import { DropZone } from "./DropZone";

const meta: Meta<typeof DropZone> = {
  component: DropZone,
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropZone>;

export const Default: Story = {};
