import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, SelectItem } from "./Select";

interface Option {
  id: string;
  name: string;
}

const meta = {
  component: Select,
  title: "Common/Select",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const options: Option[] = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
  { id: "3", name: "Option 3" },
  { id: "4", name: "Option 4" },
  { id: "5", name: "Option 5" },
];

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Select<Option> label="Select an option" placeholder="Choose..." items={options}>
      {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
    </Select>
  ),
};

export const WithDescription: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Select<Option>
      label="Select an option"
      description="This is a helpful description for the select field."
      placeholder="Choose..."
      items={options}
    >
      {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
    </Select>
  ),
};

export const Required: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Select<Option> label="Select an option" isRequired placeholder="Choose..." items={options}>
      {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
    </Select>
  ),
};

export const Disabled: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Select<Option> label="Select an option" isDisabled placeholder="Choose..." items={options}>
      {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
    </Select>
  ),
};

export const WithError: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Select<Option>
      label="Select an option"
      isInvalid
      errorMessage="This field is required."
      placeholder="Choose..."
      items={options}
    >
      {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Select<Option>
      label="Select an option"
      defaultSelectedKey="2"
      placeholder="Choose..."
      items={options}
    >
      {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
    </Select>
  ),
};
