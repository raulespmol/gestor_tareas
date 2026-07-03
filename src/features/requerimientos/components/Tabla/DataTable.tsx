import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type FilterFn,
} from "@tanstack/react-table";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { normalizarTexto } from "@/utils/normalizarTexto";

const makeGlobalFilterFn = <TData,>(
  getSearchText: (row: TData) => string
): FilterFn<TData> =>
  (row, _, filterValue) => {
    const texto = normalizarTexto(String(filterValue));
    const contenido = normalizarTexto(getSearchText(row.original));
    return contenido.includes(texto);
  };

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  globalFilter: string;
  getSearchText: (row: TData) => string;
}

export function DataTable<TData>({
  columns,
  data,
  globalFilter,
  getSearchText,
}: DataTableProps<TData>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    globalFilterFn: makeGlobalFilterFn(getSearchText),
    columnResizeMode: "onChange"
  });

  const rows = table.getRowModel().rows;
  const containerRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  const getCellStyle = (
    size: number,
    isFlexible: boolean
  ): React.CSSProperties => {
    if (isFlexible) return { flex: "1 1 0", minWidth: 0, width: 0, overflow: "hidden" };
    return { width: `${size}px`, flex: `0 0 ${size}px` };
  };

  return (
    <div ref={containerRef} className="rounded-md border overflow-auto flex-1">
      <Table className="w-full">
        <TableHeader className="sticky top-0 z-10 bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} style={{ display: "flex", width: "100%" }}> 
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={getCellStyle(
                    header.getSize(),
                    Boolean((header.column.columnDef.meta as { flex?: boolean })?.flex)
                  )}
                  className="flex items-center"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody style={{ display: "block", width: "100%" }}>
          {rows.length ? (
            <tr style={{ height: `${totalHeight}px`, display: "block", position: "relative", width: "100%" }}>
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <TableRow
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    style={{
                      position: "absolute",
                      top: `${virtualRow.start}px`,
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={getCellStyle(
                          cell.column.getSize(),
                          Boolean((cell.column.columnDef.meta as { flex?: boolean })?.flex)
                        )}
                        className="overflow-hidden text-ellipsis whitespace-nowrap text-xs px-2 py-0.5 flex items-center"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </tr>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-24">
                Sin resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}