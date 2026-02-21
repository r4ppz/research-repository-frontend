import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { Selection } from "react-aria-components";

import { ListBox, ListBoxItem } from "./ListBox";

const meta = {
  component: ListBox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    selectionMode: {
      control: { type: "select" },
      options: ["none", "single", "multiple"],
      description: "Determines how many items can be selected",
    },
    autoFocus: {
      control: "boolean",
      description: "Whether to auto-focus the first item",
    },
    disallowEmptySelection: {
      control: "boolean",
      description: "Whether the collection allows empty selection",
    },
  },
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const animals = [
  { id: "aardvark", name: "Aardvark" },
  { id: "cat", name: "Cat" },
  { id: "dog", name: "Dog" },
  { id: "kangaroo", name: "Kangaroo" },
  { id: "panda", name: "Panda" },
  { id: "snake", name: "Snake" },
];

// Basic story with static items and props controls
export const Basic: Story = {
  args: {
    "aria-label": "Favorite animal",
    selectionMode: "single",
    autoFocus: false,
    disallowEmptySelection: false,
  },
  render: (args) => (
    <ListBox {...args}>
      {animals.map((item) => (
        <ListBoxItem key={item.id} id={item.id}>
          {item.name}
        </ListBoxItem>
      ))}
    </ListBox>
  ),
};

// Story demonstrating controlled selection state
export const Controlled: Story = {
  args: {
    "aria-label": "Select an animal",
    selectionMode: "single",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<Selection>(new Set(["cat"]));

    return (
      <div>
        <ListBox {...args} selectedKeys={selected} onSelectionChange={setSelected}>
          {animals.map((item) => (
            <ListBoxItem key={item.id} id={item.id}>
              {item.name}
            </ListBoxItem>
          ))}
        </ListBox>
        <p style={{ marginTop: "1rem", fontSize: "14px" }}>
          Selected: {selected === "all" ? "all" : [...selected].join(", ") || "none"}
        </p>
      </div>
    );
  },
};

// Story demonstrating multiple selection
export const Multiple: Story = {
  args: {
    "aria-label": "Select favorite animals",
    selectionMode: "multiple",
  },
  render: (args) => (
    <ListBox {...args}>
      {animals.map((item) => (
        <ListBoxItem key={item.id} id={item.id}>
          {item.name}
        </ListBoxItem>
      ))}
    </ListBox>
  ),
};

// Story demonstrating disabled items
export const WithDisabledItems: Story = {
  args: {
    "aria-label": "Select an animal",
    selectionMode: "single",
  },
  render: (args) => (
    <ListBox {...args}>
      {animals.map((item) => (
        <ListBoxItem key={item.id} id={item.id} isDisabled={item.id === "snake"}>
          {item.name}
        </ListBoxItem>
      ))}
    </ListBox>
  ),
};
