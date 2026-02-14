import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Content";

const meta = {
  title: "Common/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a text component that displays body text.",
  },
};
