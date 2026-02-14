import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "./DataTable";

const meta = {
  component: DataTable,
  title: "Common/DataTable",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
}

function DataTableDemo() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  const data: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", status: "Active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", status: "Active" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", status: "Inactive" },
    { id: "4", name: "Alice Williams", email: "alice@example.com", status: "Active" },
    { id: "5", name: "Charlie Brown", email: "charlie@example.com", status: "Active" },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={1}
      pagination={pagination}
      onPaginationChange={setPagination}
      caption="User Data Table"
    />
  );
}

export const Default: Story = {
  args: {
    columns: [],
    data: [],
    pageCount: 1,
    pagination: { pageIndex: 0, pageSize: 5 },
    onPaginationChange: (updater) => {
      console.log("Pagination changed:", updater);
    },
    caption: "",
  },
  render: () => <DataTableDemo />,
};
