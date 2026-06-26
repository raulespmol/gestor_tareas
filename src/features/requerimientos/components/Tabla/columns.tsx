import type { ColumnDef } from "@tanstack/react-table";

import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";

import SelectEstado from "@/features/requerimientos/components/SelectEstado"
import SelectResponsable from "@/features/requerimientos/components/SelectResponsable";
import { formatearMoneda } from "@/utils/formatearMoneda";
import { formatearFecha } from "@/utils/formatearFecha";

export const columns: ColumnDef<Requerimiento>[] = [
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ getValue }) =>
      formatearFecha(String(getValue())
    )
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
  },
  {
    accessorKey: "numeroFactura",
    header: "Factura",
  },
  {
    accessorKey: "otrosDatos",
    header: "Otros Datos",
  },
];