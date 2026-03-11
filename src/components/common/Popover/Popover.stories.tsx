import type { Meta, StoryObj } from "@storybook/react-vite";
import { DialogTrigger } from "react-aria-components";
import { Button } from "../Button/Button";
import { Heading, Text } from "../Content/Content";
import { Popover } from "./Popover";

const meta = {
  component: Popover,
  argTypes: {
    placement: {
      control: { type: "select" },
      options: ["bottom", "top", "left", "right"],
    },
    hideArrow: {
      control: "boolean",
    },
    offset: {
      control: "number",
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

const PopoverContent = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: "20px",
    }}
  >
    <Heading level={4}>The meaning of life isn't here, I checked</Heading>
    <div style={{ fontSize: "14px" }}>
      <Text>bla bla bla bla bla bla bla bla nothing bla bla testing bla bla</Text>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    placement: "bottom",
    hideArrow: true,
    offset: 20,
    children: <PopoverContent />,
  },

  render: (args) => {
    return (
      <div style={{ padding: "100px", display: "flex", justifyContent: "center" }}>
        <DialogTrigger>
          <Button>Open Popover</Button>
          <Popover placement={args.placement} {...args}></Popover>
        </DialogTrigger>
      </div>
    );
  },
};
