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
        <Button
          style={{
            fontSize: "13px",
            borderRadius: "5px",
          }}
          variant="primary"
        >
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{
          maxWidth: "400px",
        }}
      >
        <DialogTitle
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Dialog Title
        </DialogTitle>
        <DialogDescription>
          This is a dialog component that displays information or requests user action. I am
          currently using Radix primitive for this. We are planning on trasitioning to React Aria
          for consistency.{" "}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export const Default: Story = {
  args: {},
  render: () => <DialogDemo />,
};
