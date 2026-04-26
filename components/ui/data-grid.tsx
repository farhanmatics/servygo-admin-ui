import type { ReactNode } from "react";

type Column<T> = {
  header: string;
  key: string;
  render: (row: T) => ReactNode;
};

export function ColumnVisibilityMenu({
  columns,
}: {
  columns: { label: string; visible?: boolean }[];
}) {
  return (
    <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone shadow-sm">
      Columns:{" "}
      <span className="font-medium text-ink">
        {columns.filter((column) => column.visible !== false).length}/{columns.length}
      </span>
    </div>
  );
}

export function DataGrid<T>({
  columns,
  emptyMessage,
  rows,
}: {
  columns: Column<T>[];
  emptyMessage?: string;
  rows: T[];
}) {
  return (
    <div className="overflow-x-auto" role="region">
      <table className="compact-table" role="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="text-[13px] text-stone" colSpan={columns.length}>
                {emptyMessage ?? "No results match the current filters."}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render(row)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
