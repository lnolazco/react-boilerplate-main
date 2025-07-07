import type { Meta, StoryObj } from "@storybook/react";

import { FieldLabel } from "./FieldLabel";
import { Input } from "./Input";

const meta: Meta<typeof FieldLabel> = {
  component: FieldLabel,
  parameters: {
    controls: {
      include: ["label", "help"],
    },
  },
  argTypes: {
    label: {
      control: "text",
    },
    help: {
      control: "text",
    },
  },
  args: {
    label: "Your email",
    help: "We'll never share your email with anyone else.",
  },
  render: (props) => (
    <FieldLabel {...props}>
      <Input type="email" placeholder="you@example.com" autoComplete="off" />
    </FieldLabel>
  ),
};

export default meta;
type Story = StoryObj<typeof FieldLabel>;

export const Default: Story = {};
