import type { Meta, StoryObj } from "@storybook/react";

import { ImagePreview } from "./ImagePreview";

const meta: Meta<typeof ImagePreview> = {
  component: ImagePreview,
  parameters: {
    controls: {
      include: ["src", "alt"],
    },
  },
  argTypes: {
    src: {
      control: "text",
    },
    alt: {
      control: "text",
    },
  },
  args: {
    src: "https://picsum.photos/600/400",
    alt: "Random image",
    className: "w-64",
  },
};

export default meta;
type Story = StoryObj<typeof ImagePreview>;

export const Default: Story = {};
