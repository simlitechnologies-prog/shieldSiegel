import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: (row: T) => string;
}

export function DataTable<T>({ columns, data, keyField }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-black/5 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-black/5 bg-[var(--color-ivory)]">
            {columns.map((col) => (
              <th key={col.header} className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={keyField(row)} className="border-b border-black/5 last:border-0 hover:bg-[var(--color-ivory)]/50">
              {columns.map((col) => (
                <td key={col.header} className={cn("px-5 py-3.5 text-[var(--color-navy)]", col.className)}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <p className="px-5 py-8 text-center text-sm text-[var(--color-slate)]">No records found.</p>
      )}
    </div>
  );
}
