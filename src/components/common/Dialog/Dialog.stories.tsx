import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./Dialog";

const meta = {
  component: Dialog,
  title: "Common/Dialog",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          This is a dialog component that displays information or requests user action. It includes
          a close button and supports custom content.
        </DialogDescription>
        <div style={{ marginTop: "16px" }}>
          <Button
            variant="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const Default: Story = {
  args: {},
  render: () => <DialogDemo />,
};
