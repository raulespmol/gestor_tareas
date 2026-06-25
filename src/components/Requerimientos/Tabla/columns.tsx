import type { ColumnDef } from "@tanstack/react-table";

import type { Requerimiento } from "@/types/requerimiento";

import SelectEstado from "@/components/Requerimientos/SelectEstado"
import SelectResponsable from "@/components/Requerimientos/SelectResponsable";

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
    )
  },
  {
    id: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <SelectEstado
        estadoId={row.original.estadoId}
        requerimientoId={row.original.id}
      />
    ),
  },
  {
    id: "responsable",
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
    cell: ({ row }) =>
      `$${row.original.montoTotal.toLocaleString("es-CL")}`,
  },
  {
    accessorKey: "montoPagado",
    header: "Pagado",
    cell: ({ row }) =>
      `$${row.original.montoPagado.toLocaleString("es-CL")}`,
  },
  {
    accessorKey: "montoPendiente",
    header: "Pendiente",
    cell: ({ row }) =>
      `$${row.original.montoPendiente.toLocaleString("es-CL")}`,
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