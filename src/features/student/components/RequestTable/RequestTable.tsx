import { getCoreRowModel, useReactTable, flexRender } from "@tanstack/react-table";
import { DocumentRequest } from "@/types";
import { columns } from "./columns";
import style from "./RequestTable.module.css";

interface Props {
  data: DocumentRequest[];
}

function DocumentRequestTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroup = table.getHeaderGroups()[0];

  return (
    <div className={style.tableContainer}>
      {/* Desktop Table View */}
      <table className={style.table}>
        <caption className={style.tableCaption}>Document Requests</caption>
        <thead className={style.tableHead}>
          {table.getHeaderGroups().map((hg) => (
            <tr className={style.tableRow} key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className={style.tableHeaderData} scope="col">
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
                <td key={cell.id} className={style.tableBodyData}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className={style.mobileCardContainer}>
        {table.getRowModel().rows.map((row) => (
          <div key={row.id} className={style.card}>
            {headerGroup.headers.map((header) => {
              const cell = row.getVisibleCells().find((c) => c.column.id === header.column.id);
              if (!cell) return null;

              return (
                <div key={cell.id} className={style.cardRow}>
                  <div className={style.cardLabel}>
                    {flexRender(header.column.columnDef.header, {
                      column: header.column,
                      header,
                      table,
                      headerGroup,
                      depth: header.depth,
                      isPlaceholder: header.isPlaceholder,
                    })}
                  </div>
                  <div className={style.cardValue}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentRequestTable;
