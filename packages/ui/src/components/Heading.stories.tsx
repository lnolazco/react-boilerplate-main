import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  component: Heading,
  parameters: {
    controls: {
      include: ["level", "children"],
    },
  },
  argTypes: {
    level: {
      control: { type: "range", min: 1, max: 3, step: 1 },
    },
    children: {
      control: "text",
    },
  },
  args: {
    level: 1,
    children: "Heading",
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};
