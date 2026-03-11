import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Content";

const meta = {
  component: Text,
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "You are the universe experiencing itself, but currently, you are just a person looking at a screen.",
  },
};
