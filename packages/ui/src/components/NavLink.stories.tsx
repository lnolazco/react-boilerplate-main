import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { SparklesIcon } from "lucide-react";

import { NavLink } from "./NavLink";

const meta: Meta<typeof NavLink> = {
  component: NavLink,
  parameters: {
    controls: {
      include: ["children", "aria-current"],
    },
  },
  argTypes: {
    "aria-current": {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    variant: "primary",
    children: "Label",
    icon: SparklesIcon,
    "aria-current": false,
  },
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  args: {
    href: "#",
  },
};

export const AsButton: Story = {
  args: {
    as: "button",
    onClick: action("onClick"),
  },
};
