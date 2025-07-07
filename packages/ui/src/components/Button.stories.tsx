import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { SparklesIcon } from "lucide-react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "muted"],
    },
    iconPosition: {
      control: "inline-radio",
      options: ["start", "end"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    variant: "primary",
    children: "Label",
    onClick: action("onClick"),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  parameters: {
    controls: {
      include: ["children", "variant"],
    },
  },
};

export const AsLink: Story = {
  parameters: {
    controls: {
      include: ["children", "variant"],
    },
  },
  args: {
    as: "a",
    href: "#",
    onClick: undefined,
  },
};

export const WithIcon: Story = {
  parameters: {
    controls: {
      include: ["children", "variant", "iconPosition"],
    },
  },
  args: {
    icon: SparklesIcon,
  },
};

export const IconOnly: Story = {
  parameters: {
    controls: {
      include: ["variant"],
    },
  },
  args: {
    children: "",
    icon: SparklesIcon,
  },
};
