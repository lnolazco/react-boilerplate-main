import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  parameters: {
    controls: {
      include: ["type", "placeholder", "required"],
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["text", "email"],
    },
    placeholder: {
      control: "text",
    },
    required: {
      control: "boolean",
    },
  },
  args: {
    type: "text",
    placeholder: "Placeholder...",
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
