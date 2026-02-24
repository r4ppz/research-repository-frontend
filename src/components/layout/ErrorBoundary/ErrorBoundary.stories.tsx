import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { ApiError } from "@/types";

const meta: Meta<typeof ErrorBoundary> = {
  parameters: {
    layout: "centered",
  },
  component: ErrorBoundary,
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

// Example component that can throw an error
function BuggyComponent() {
  useEffect(() => {
    throw new ApiError("INTERNAL_ERROR", "An unexpected error occurred", undefined);
  });

  return <div>Bug just happened :0</div>;
}

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  ),
};
