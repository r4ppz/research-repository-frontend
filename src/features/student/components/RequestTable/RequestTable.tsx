import { getCoreRowModel, useReactTable, flexRender } from "@tanstack/react-table";
import { DocumentRequest } from "@/types";
import { columns } from "./columns";
import style from "./RequestTable.module.css";
import clsx from "clsx";

interface Props {
  data: DocumentRequest[];
}

function DocumentRequestTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <caption className={style.tableCaption}>Document Requests</caption>
        <thead className={style.tableHead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={style.tableRow} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={clsx(style.tableData, style.tableHeaderData)}
                  key={header.id}
                  scope="col"
                >
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
        </tbody>
      </table>
    </div>
  );
}

export default DocumentRequestTable;
