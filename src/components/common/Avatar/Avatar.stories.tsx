import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta = {
  component: Avatar,
  title: "Common/Avatar",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    src: {
      control: "text",
    },
    alt: {
      control: "text",
    },
    fallbackName: {
      control: "text",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithInitials: Story = {
  args: {
    src: undefined,
    alt: "John Doe",
    fallbackName: "John Doe",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    src: undefined,
    alt: "Jane Smith",
    fallbackName: "Jane Smith",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    src: undefined,
    alt: "Bob Johnson",
    fallbackName: "Bob Johnson",
    size: "lg",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User Avatar",
    fallbackName: "User Name",
    size: "md",
  },
};
