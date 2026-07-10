import type { ColumnDef } from "@tanstack/react-table";

import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";

import DropdownAcciones from "./DropdownAcciones";

import SelectEstado from "@/features/requerimientos/components/SelectEstado"
import SelectResponsable from "@/features/requerimientos/components/SelectResponsable";
import { formatearMoneda } from "@/utils/formatearMoneda";
import { formatearFecha } from "@/utils/formatearFecha";
import { getEstadoPago, clasesEstadoPago } from "../../utils/colorMonto";

export const createColumns = (
  onEditar: (requerimiento: Requerimiento) => void,
  onVerDetalle: (requerimiento: Requerimiento) => void,
  onEliminar: (requerimiento: Requerimiento) => void,
  onRegistrarPago: (requerimiento: Requerimiento) => void,
  onActualizarEstado: (id: string, estadoId: string) => void,
  onActualizarResponsable: (id: string, responsableId: string) => void,
): ColumnDef<Requerimiento>[] => [
  {
    accessorKey: "fecha",
    header: "Fecha",
    size: 70,
    cell: ({ getValue }) =>
      formatearFecha(String(getValue())
    )
  },
  {
    accessorKey: "clienteEmpresa",
    header: "Cliente",
    size: 220,
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
    size: 130,
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
    size: 160,
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
    size: 70,
    cell: ({ getValue }) =>
      formatearMoneda(Number(getValue()))
  },
  {
    accessorKey: "montoPagado",
    header: "Pagado",
    size: 70,
    cell: ({ row }) => { 
      const clase = clasesEstadoPago[getEstadoPago(row.original.montoPagado, row.original.montoTotal)];
      return <span className={clase}>{formatearMoneda(row.original.montoPagado)}</span>;
    }
  },
  {
    accessorKey: "montoPendiente",
    header: "Pendiente",
    size: 80,
    cell: ({ row }) => { 
      const clase = clasesEstadoPago[getEstadoPago(row.original.montoPagado, row.original.montoTotal)];
      return <span className={clase}>{formatearMoneda(row.original.montoPendiente)}</span>;
    }
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
      <DropdownAcciones
        requerimiento={row.original}
        onEditar={onEditar}
        onVerDetalle={onVerDetalle}
        onEliminar={onEliminar}
        onRegistrarPago={onRegistrarPago}
      />
    ),
  },
];