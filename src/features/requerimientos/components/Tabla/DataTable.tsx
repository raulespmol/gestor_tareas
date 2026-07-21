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
  onCellClick?: (row: TData, columnId: string) => void;
}

export function DataTable<TData>({
  columns,
  data,
  globalFilter,
  getSearchText,
  onCellClick,
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
    overscan: 20,
    getItemKey: (index) => rows[index].id,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  const centeredColumns = ["numeroCotizacion", "numeroFactura"];  
  const monospaceColumns = ["fecha", "numeroCotizacion", "montoTotal", "montoPagado", "montoPendiente", "numeroFactura"];
  const mutedColumns = ["fecha", "numeroCotizacion", "numeroFactura"];
  const rightAlignColumns = ["montoTotal", "montoPagado", "montoPendiente" ]

  const getCellStyle = (
    size: number,
    isFlexible: boolean
  ): React.CSSProperties => {
    if (isFlexible) return { flex: "1 1 0", minWidth: 10, width: 0, overflow: "hidden" };
    return { width: `${size}px`, flex: `0 0 ${size}px` };
  };

  return (
    <div className="max-w-7xl mx-auto w-full h-full min-h-0 overflow-hidden">
      <div
        ref={containerRef}
        className="h-full min-h-0 overflow-y-auto overflow-x-hidden rounded-md border bg-popover"
      >
        <Table className="w-full min-w-full">
          <TableHeader className="sticky top-0 z-20 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="flex items-center w-full uppercase text-[10px] h-8 bg-card/50 pointer-events-none"
              >
                {headerGroup.headers.map((header) => {
                  const isCentered = centeredColumns.includes(header.column.id);
                  return (
                    <TableHead
                      key={header.id}
                      style={getCellStyle(
                        header.getSize(),
                        Boolean((header.column.columnDef.meta?.flex))
                      )}
                      className={
                        `flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap
                        ${isCentered ? "text-center" : ""}`
                      }
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

        <TableBody
          style={{
            display: "block",
            width: "100%",
            height: `${totalHeight}px`,
            position: "relative",
          }}
        >
          {rows.length ? (
            virtualRows.map((virtualRow) => {
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
                  className="hover:bg-secondary/80"
                >
                  {row.getVisibleCells().map((cell) => {
                    const isCentered = centeredColumns.includes(cell.column.id);
                    const isMonospace = monospaceColumns.includes(cell.column.id);
                    const isMuted = mutedColumns.includes(cell.column.id);
                    const isRightAligned = rightAlignColumns.includes(cell.column.id);
                    const isDescriptionCell = cell.column.id === "detalleDescripcion";

                    return (
                      <TableCell
                        key={cell.id}
                        style={getCellStyle(
                          cell.column.getSize(),
                          Boolean((cell.column.columnDef.meta?.flex))
                        )}
                        className={
                          `overflow-hidden text-ellipsis whitespace-nowrap text-xs px-2 py-0.5 flex items-center
                          ${isCentered && "justify-center" } 
                          ${isMonospace && "font-mono" } 
                          ${isMuted && "text-gray-500" }
                          ${isRightAligned && "justify-end" }
                          ${isDescriptionCell ? "cursor-pointer hover:bg-secondary/40" : ""}
                          `
                        }
                        role={isDescriptionCell ? "button" : undefined}
                        tabIndex={isDescriptionCell ? 0 : undefined}
                        onClick={(e) => {
                          if (!isDescriptionCell || !onCellClick) return;
                          e.stopPropagation();
                          onCellClick(row.original, cell.column.id);
                        }}
                        onKeyDown={(e) => {
                          if (!isDescriptionCell || !onCellClick) return;
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            onCellClick(row.original, cell.column.id);
                          }
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
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
  </div>
  );
}