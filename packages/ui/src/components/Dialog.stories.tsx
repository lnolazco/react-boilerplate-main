import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { Dialog } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => {
    return (
      <>
        <Dialog>
          <Dialog.Trigger>
            <Button>Open dialog</Button>
          </Dialog.Trigger>
          <Dialog.Content title="Hello world">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              neque ipsum, tempor a risus non, rhoncus pretium ligula.
              Pellentesque lacinia nec velit sit amet condimentum.
            </p>
          </Dialog.Content>
        </Dialog>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {};
