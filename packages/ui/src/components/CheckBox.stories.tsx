import type { Meta, StoryObj } from "@storybook/react";

import { CheckBox } from "./CheckBox";

const meta: Meta<typeof CheckBox> = {
  component: CheckBox,
  parameters: {
    controls: {
      include: ["defaultChecked", "children", "disabled"],
    },
  },
  argTypes: {
    defaultChecked: {
      control: "inline-radio",
      options: [true, false, "indeterminate"],
    },
    children: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    defaultChecked: "indeterminate",
    children: "Label",
    disabled: false,
  },
  render: (args) => (
    <div key={args.defaultChecked?.toString()}>
      <CheckBox {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {};
