import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SimpleErrorBoundary } from "./SimpleErrorBoundary";
import { Button } from "@/components/common/Button/Button";

const meta: Meta<typeof SimpleErrorBoundary> = {
  parameters: {
    layout: "centered",
  },
  component: SimpleErrorBoundary,
};

export default meta;

type Story = StoryObj<typeof SimpleErrorBoundary>;

// Example component that can throw an error
function BuggyComponent() {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error("Oops, this is a simulated error!");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        textAlign: "center",
      }}
    >
      <p>No errors yet.</p>
      <Button
        onClick={() => {
          setThrowError(true);
        }}
      >
        Trigger Error
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <SimpleErrorBoundary>
      <BuggyComponent />
    </SimpleErrorBoundary>
  ),
};
