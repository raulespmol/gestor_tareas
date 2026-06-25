import type { ColumnDef } from "@tanstack/react-table";

import type { Requerimiento } from "@/types/requerimiento";

import SelectEstado from "@/components/Requerimientos/SelectEstado"
import SelectResponsable from "@/components/Requerimientos/SelectResponsable";
import { formatearMoneda } from "@/utils/formatearMoneda";

export const columns: ColumnDef<Requerimiento>[] = [
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "clienteEmpresa",
    header: "Cliente",
  },
  {
    accessorKey: "numeroCotizacion",
    header: "Cotización",
  },
  {
    accessorKey: "detalleDescripcion",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="max-w-xs truncate">
        {row.original.detalleDescripcion}
      </div>
    ),
    enableSorting: false
  },
  {
    accessorKey: "estadoId",
    header: "Estado",
    cell: ({ row }) => (
      <SelectEstado
        estadoId={row.original.estadoId}
        requerimientoId={row.original.id}
      />
    ),
    enableSorting: false
  },
  {
    accessorKey: "responsableId",
    header: "Responsable",
    cell: ({ row }) => (
      <SelectResponsable
        responsableId={row.original.responsableId}
        requerimientoId={row.original.id}
      />
    ),
    enableSorting: false
  },
  {
    accessorKey: "montoTotal",
    header: "Total",
    cell: ({ getValue }) =>
      formatearMoneda(Number(getValue()))
  },
  {
    accessorKey: "montoPagado",
    header: "Pagado",
    cell: ({ getValue }) =>
      formatearMoneda(Number(getValue()))
  },
  {
    accessorKey: "montoPendiente",
    header: "Pendiente",
    cell: ({ getValue }) =>
      formatearMoneda(Number(getValue()))
  },
  {
    accessorKey: "medioPago",
    header: "Medio Pago",
    enableSorting: false
  },
  {
    accessorKey: "numeroFactura",
    header: "Factura",
  },
  {
    accessorKey: "otrosDatos",
    header: "Otros Datos",
    enableSorting: false
  },
];