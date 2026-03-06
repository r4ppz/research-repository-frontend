import type { Meta, StoryObj } from "@storybook/react-vite";

import { Link } from "./Link";

const meta = {
  component: Link,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    href: {
      control: "text",
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "https://r4ppz.github.io/research-repo-docs/",
    children: "This is a link",
  },
};
