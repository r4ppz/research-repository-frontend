import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";
import { Button } from "@/components/common/Button/Button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useAdminRequests } from "../../hooks/useAdminDocumentRequest";
import { columns } from "./columns";
import style from "./RequestTable.module.css";

export function RequestsTable() {
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

  const handlePrevPage = () => {
    setPageIndex(pageIndex - 1);
  };

  const handleNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  //
  // UI Helper variables
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex + 1 >= pageCount;
  const hasNoData = data.length === 0 && !loading;

  if (loading) {
    return <LoadingSpinner message="Loading requests..." />;
  } else if (error) {
    return <p>Failed to load: {error}</p>;
  } else {
    return (
      <div className={style.tableContainer}>
        <table className={style.table}>
          <caption className={style.tableCaption}>Document Requests</caption>
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
            {table.getRowModel().rows.map((row) => (
              <tr className={style.tableRow} key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className={clsx(style.tableData, style.tableBodyData)} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {hasNoData && (
              <tr>
                <td>No data available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className={style.pagination}>
          <Button onClick={handlePrevPage} disabled={isFirstPage}>
            Previous
          </Button>

          <span>
            Page {pageIndex + 1} of {pageCount || 1}
          </span>

          <Button onClick={handleNextPage} disabled={isLastPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }
}
