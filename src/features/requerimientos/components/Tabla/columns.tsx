import type { ColumnDef } from "@tanstack/react-table";

import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

import SelectEstado from "@/features/requerimientos/components/SelectEstado"
import SelectResponsable from "@/features/requerimientos/components/SelectResponsable";
import { formatearMoneda } from "@/utils/formatearMoneda";
import { formatearFecha } from "@/utils/formatearFecha";

export const createColumns = (
  onEditar: (requerimiento: Requerimiento) => void,
  onVerDetalle: (requerimiento: Requerimiento) => void,
  onEliminar: (requerimiento: Requerimiento) => void,
  onActualizarEstado: (id: number, estadoId: number) => void,
  onActualizarResponsable: (id: number, responsableId: number) => void,
): ColumnDef<Requerimiento>[] => [
  {
    accessorKey: "fecha",
    header: "Fecha",
    size: 80,
    cell: ({ getValue }) =>
      formatearFecha(String(getValue())
    )
  },
  {
    accessorKey: "clienteEmpresa",
    header: "Cliente",
    size: 300,
  },
  {
    accessorKey: "numeroCotizacion",
    header: "Cotización",
    size: 80,
  },
  {
    accessorKey: "detalleDescripcion",
    header: "Descripción",
    meta: { flex: true },
    cell: ({ row }) => (
      <div className="w-full truncate">
        {row.original.detalleDescripcion}
      </div>
    ),
  },
  {
    accessorKey: "estadoId",
    header: "Estado",
    size: 150,
    cell: ({ row }) => (
      <SelectEstado
        estadoId={row.original.estadoId}
        requerimientoId={row.original.id}
        onChange={onActualizarEstado}
      />
    ),
  },
  {
    accessorKey: "responsableId",
    header: "Responsable",
    size: 200,
    cell: ({ row }) => (
      <SelectResponsable
        responsableId={row.original.responsableId}
        requerimientoId={row.original.id}
        onChange={onActualizarResponsable}
      />
    ),
  },
  {
    accessorKey: "montoTotal",
    header: "Total",
    size: 100,
    cell: ({ getValue }) =>
      formatearMoneda(Number(getValue()))
  },
  {
    accessorKey: "montoPagado",
    header: "Pagado",
    size: 100,
    cell: ({ getValue }) =>
      formatearMoneda(Number(getValue()))
  },
  {
    accessorKey: "montoPendiente",
    header: "Pendiente",
    size: 100,
    cell: ({ getValue }) =>
      formatearMoneda(Number(getValue()))
  },
  {
    accessorKey: "numeroFactura",
    header: "Factura",
    size: 80,
  },
  {
    id: "acciones",
    header: "",
    size: 50,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onVerDetalle(row.original)}>
            Ver detalles
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onEditar(row.original)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => onEliminar(row.original)}
            className="text-destructive focus:text-destructive"
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];