import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type OnChangeFn,
  type PaginationState,
  type RowData,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { Button } from "@/components/common/Button/Button";
import style from "./DataTable.module.css";

interface DataTableProps<TData extends RowData> {
  // biome-ignore lint/suspicious/noExplicitAny: < Standard for TanStack ColumnDef >
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  caption: string;
  isLoading?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: < This is needed to make it generic >
  meta?: any;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  pageCount,
  pagination,
  onPaginationChange,
  caption,
  meta,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    meta,
  });

  const { pageIndex } = pagination;
  const hasNoData = data.length === 0;

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <caption className={style.tableCaption}>{caption}</caption>
        <thead className={style.tableHead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={style.tableRow} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className={clsx(style.tableData, style.tableHeaderData)} key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={style.tableBody}>
          {hasNoData ? (
            <tr className={style.tableRow}>
              <td
                className={clsx(style.tableData, style.tableBodyData, style.emptyStateCell)}
                colSpan={table.getAllLeafColumns().length}
              >
                No data available
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr className={style.tableRow} key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className={clsx(style.tableData, style.tableBodyData)} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className={style.pagination}>
        <Button
          className={style.paginationButton}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <span className={style.pageIndicator}>
          Page {pageIndex + 1} of {pageCount || 1}
        </span>

        <Button
          className={style.paginationButton}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
