import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Button from "@/components/common/Button/Button";
import { safeToString } from "@/util/safeToString";
import style from "./Table.module.css";

export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  render?: (item: T) => React.ReactNode;
  width?: string | number;
}

interface TableProps<T extends object> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: (item: T) => string | number;
  pagination?: {
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    totalElements: number;
  };
  className?: string;
  emptyText?: string;
  rowClassName?: (item: T, index: number) => string;
  onRowClick?: (item: T, index: number) => void;
}

const Table = <T extends object>({
  data,
  columns,
  rowKey,
  pagination,
  className,
  emptyText = "No data",
  rowClassName,
  onRowClick,
}: TableProps<T>) => {
  const [internalPageSize, setInternalPageSize] = useState(10);

  const currentPageSize = pagination ? pagination.pageSize : internalPageSize;
  const currentPage = pagination ? pagination.currentPage : 0;
  const totalPages = pagination ? Math.ceil(pagination.totalElements / currentPageSize) : 1;

  const paginatedData = pagination
    ? data.slice(currentPage * currentPageSize, currentPage * currentPageSize + currentPageSize)
    : data;

  // Local helper functions
  const handleRowClick = (item: T, index: number) => {
    onRowClick?.(item, index);
  };

  const renderColumnValue = (column: TableColumn<T>, item: T) => {
    return column.render ? column.render(item) : safeToString(item[column.key as keyof T]);
  };

  const handlePageChange = (newPage: number) => {
    if (pagination) {
      pagination.onPageChange(newPage);
    } else {
      setInternalPageSize(newPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) handlePageChange(currentPage + 1);
  };

  // Precompute row handlers
  const getMobileRowProps = (item: T, index: number) => {
    return {
      key: String(rowKey(item)),
      className: clsx(style.mobileCard, rowClassName?.(item, index) || ""),
      onClick: () => {
        handleRowClick(item, index);
      },
    };
  };

  const getDesktopRowProps = (item: T, index: number) => {
    return {
      key: String(rowKey(item)),
      className: clsx(style.row, rowClassName?.(item, index) || ""),
      onClick: () => {
        handleRowClick(item, index);
      },
    };
  };

  // Subcomponent for Mobile Row
  const MobileRow = ({ column, item }: { column: TableColumn<T>; item: T }) => {
    return (
      <div key={String(column.key)} className={style.mobileRow}>
        <span className={style.mobileLabel}>{column.title}:</span>
        <span className={style.mobileValue}>{renderColumnValue(column, item)}</span>
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className={clsx(style.tableContainer, className)}>
        <div className={style.emptyState}>{emptyText}</div>
      </div>
    );
  }

  return (
    <div className={clsx(style.tableContainer, className)}>
      {/* Mobile Card View */}
      <div className={style.mobileView}>
        {paginatedData.map((item, index) => {
          const rowProps = getMobileRowProps(item, index);
          return (
            <div {...rowProps}>
              {columns.map((column) => (
                <MobileRow key={String(column.key)} column={column} item={item} />
              ))}
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className={style.desktopView}>
        <table className={style.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={style.headerCell}
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => {
              const rowProps = getDesktopRowProps(item, index);
              return (
                <tr {...rowProps}>
                  {columns.map((column) => (
                    <td
                      key={`${String(rowKey(item))}-${String(column.key)}`}
                      className={style.cell}
                    >
                      {renderColumnValue(column, item)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pagination && totalPages > 1 && (
        <div className={style.pagination}>
          <span className={style.pageInfo}>
            Page {currentPage + 1} of {totalPages}
          </span>

          <div className={style.paginationButtonsWrapper}>
            <Button
              variant="secondary"
              className={style.paginationButton}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className={style.iconChevron} />
              Previous
            </Button>

            <Button
              variant="secondary"
              className={style.paginationButton}
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Next
              <ChevronRight className={style.iconChevron} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
