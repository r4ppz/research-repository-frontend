import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./Content";

const meta = {
  component: Heading,
  argTypes: {
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Welcome to Content",
  },
};
