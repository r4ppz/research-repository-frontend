import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DocumentRequest } from "@/types";
import { columns } from "./columns";
import style from "./RequestTable.module.css";

interface Props {
  data: DocumentRequest[];
}

function TableHeader({ table }: { table: ReturnType<typeof useReactTable<DocumentRequest>> }) {
  return (
    <thead>
      {table.getHeaderGroups().map((group) => (
        <tr key={group.id}>
          {group.headers.map((header) => (
            <th key={header.id}>
              {typeof header.column.columnDef.header === "function"
                ? header.column.columnDef.header(header.getContext())
                : header.column.columnDef.header}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

function TableBody({ table }: { table: ReturnType<typeof useReactTable<DocumentRequest>> }) {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {typeof cell.column.columnDef.cell === "function"
                ? cell.column.columnDef.cell(cell.getContext())
                : cell.getValue()}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
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
        <TableHeader table={table} />
        <TableBody table={table} />
      </table>
    </div>
  );
}

export default DocumentRequestTable;
