import { useReactTable, getCoreRowModel, flexRender, PaginationState } from "@tanstack/react-table";
import { columns } from "./columns"; // Your column file
import { DocumentRequest } from "@/types";
import Button from "@/components/common/Button/Button";

interface RequestTableProps {
  data: DocumentRequest[];
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
}

const RequestTable = ({ data, pageCount, pagination, onPaginationChange }: RequestTableProps) => {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination },
    onPaginationChange: (updater) => {
      // This handles the state update correctly whether it's a function or object
      const nextState = typeof updater === "function" ? updater(pagination) : updater;
      onPaginationChange(nextState);
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <Button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <Button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RequestTable;
