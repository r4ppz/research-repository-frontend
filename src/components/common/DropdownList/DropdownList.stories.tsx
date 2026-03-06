import type { Meta, StoryObj } from "@storybook/react-vite";

import { DropdownItem, DropdownListBox } from "./DropdownList";

const meta = {
  component: DropdownListBox,
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
} satisfies Meta<typeof DropdownListBox>;

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
    <DropdownListBox {...args}>
      {animals.map((item) => (
        <DropdownItem key={item.id} id={item.id}>
          {item.name}
        </DropdownItem>
      ))}
    </DropdownListBox>
  ),
};

export const WithDisabledItems: Story = {
  args: {
    "aria-label": "Select an animal",
    selectionMode: "single",
  },
  render: (args) => (
    <DropdownListBox {...args}>
      {animals.map((item) => (
        <DropdownItem key={item.id} id={item.id} isDisabled={item.id === "snake"}>
          {item.name}
        </DropdownItem>
      ))}
    </DropdownListBox>
  ),
};
