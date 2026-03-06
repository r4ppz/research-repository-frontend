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
    },
    autoFocus: {
      control: "boolean",
    },
    disallowEmptySelection: {
      control: "boolean",
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

export const Controlled: Story = {
  args: {
    "aria-label": "Select an animal",
    selectionMode: "single",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<Selection>(new Set(["cat"]));

    return (
      <div
        style={{
          minWidth: "200px",
        }}
      >
        <ListBox {...args} selectedKeys={selected} onSelectionChange={setSelected}>
          {animals.map((item) => (
            <ListBoxItem key={item.id} id={item.id}>
              {item.name}
            </ListBoxItem>
          ))}
        </ListBox>
        <p
          style={{
            marginTop: "20px",
            fontSize: "15px",
            alignItems: "center",
          }}
        >
          Selected: {selected === "all" ? "all" : [...selected].join(", ") || "none"}
        </p>
      </div>
    );
  },
};

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
