import * as React from "react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  title: string;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
  className?: string;
  searchable?: boolean;
}

interface CustomTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  className?: string;
}

export function CustomTable<T extends { [key: string]: any }>({
  columns,
  data,
  pageSize = 10,
  className,
}: CustomTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filter data by search
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      columns.some((col) => {
        if (col.searchable === false) return false;
        const value = row[col.key];
        return value && value.toString().toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, data, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pagedData = useMemo(
    () => filteredData.slice((page - 1) * pageSize, page * pageSize),
    [filteredData, page, pageSize]
  );

  React.useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        {/* Pagination Controls */}
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Prev
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages || 1}
          </span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0}>
            Next
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={cn("px-4 py-2 text-left font-semibold text-gray-700", col.className)}>
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                  No data found
                </td>
              </tr>
            ) : (
              pagedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className={cn("px-4 py-2", col.className)}>
                      {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
