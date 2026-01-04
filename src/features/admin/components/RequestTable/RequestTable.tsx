import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import Button from "@/components/common/Button/Button";

import { useAdminRequests } from "../../hooks/useAdminDocumentRequest";
import { columns } from "./columns";
import style from "./RequestTable.module.css";

export default function RequestsTable() {
  const { data, pageIndex, pageSize, pageCount, setPageIndex, loading, error } = useAdminRequests();

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    state: {
      pagination: { pageIndex, pageSize },
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      const newState = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
      setPageIndex(newState.pageIndex);
    },
  });

  // UI Helper variables
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex + 1 >= pageCount;
  const hasNoData = data.length === 0 && !loading;

  return (
    <div className={style.tableWrapper}>
      {/* Feedback States */}
      {loading && <p>Loading...</p>}
      {error && <p className={style.error}>Failed to load: {error}</p>}

      <table className={style.table}>
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

          {hasNoData && (
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className={style.pagination}>
        <Button
          onClick={() => {
            setPageIndex(pageIndex - 1);
          }}
          disabled={isFirstPage}
        >
          {"<"}
        </Button>

        <span>
          Page {pageIndex + 1} of {pageCount || 1}
        </span>

        <Button
          onClick={() => {
            setPageIndex(pageIndex + 1);
          }}
          disabled={isLastPage}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}
