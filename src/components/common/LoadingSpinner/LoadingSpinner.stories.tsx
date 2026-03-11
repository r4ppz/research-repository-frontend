import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingSpinner } from "./LoadingSpinner";

const meta = {
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    message: {
      control: "text",
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: undefined,
  },
};

export const WithMessage: Story = {
  args: {
    message: "Everything you have ever done has led you to this spinning circle. Was it worth it?",
  },
};
