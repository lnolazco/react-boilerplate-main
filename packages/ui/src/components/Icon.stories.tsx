import type { Meta, StoryObj } from "@storybook/react";
import { SparklesIcon } from "lucide-react";

import { Icon, type IconProps } from "./Icon";

const meta: Meta<typeof Icon> = {
  component: Icon,
};

export default meta;

export const Default: StoryObj<IconProps & { fontSize?: number }> = {
  parameters: {
    controls: {
      include: ["fontSize"],
    },
  },
  argTypes: {
    fontSize: {
      control: { type: "range", min: 0.5, max: 2, step: 0.25 },
    },
  },
  args: {
    fontSize: 1,
  },
  render: ({ fontSize, ...props }) => (
    <div style={{ fontSize: `${fontSize}rem` }}>
      <Icon {...props}>
        <SparklesIcon />
      </Icon>
    </div>
  ),
};

export const ManualSize: StoryObj<IconProps & { height?: number }> = {
  parameters: {
    controls: {
      include: ["height"],
    },
  },
  argTypes: {
    height: {
      control: { type: "range", min: 12, max: 48, step: 4 },
    },
  },
  args: {
    height: 16,
  },
  render: ({ height, ...props }) => (
    <div style={{ height: `${height}px` }}>
      <Icon {...props} manualSize className="h-full">
        <SparklesIcon />
      </Icon>
    </div>
  ),
};
