import type { ColumnDef } from "@tanstack/react-table";

import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";

import DropdownAcciones from "./DropdownAcciones";

import { formatearMoneda } from "@/utils/formatearMoneda";
import { formatearFecha } from "@/utils/formatearFecha";
import { getEstadoPago, textoEstadoPago } from "../../utils/colorMonto";
import { DropdownEstado } from "../DropdownEstado";
import { DropdownResponsable } from "../DropdownResponsable";

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
    size: 65,
    cell: ({ getValue }) =>
      formatearFecha(String(getValue())
    )
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    size: 210,
  },
  {
    accessorKey: "cotizacion",
    header: "COT",
    size: 60,
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    meta: { flex: true },
    cell: ({ row }) => (
      <div className="w-full truncate">
        {row.original.descripcion}
      </div>
    ),
  },
  {
    accessorKey: "estado_id",
    header: "Estado",
    size: 95,
    cell: ({ row }) => (
      <DropdownEstado
        estadoId={row.original.estado_id}
        requerimientoId={row.original.id}
        onChange={onActualizarEstado}
      />
    ),
  },
  {
    accessorKey: "responsable_id",
    header: "Responsable",
    size: 125,
    cell: ({ row }) => (
      <DropdownResponsable
        responsableId={row.original.responsable_id}
        requerimientoId={row.original.id}
        onChange={onActualizarResponsable}
      />
    ),
  },
  {
    accessorKey: "monto_total",
    header: "Total",
    size: 75,
    cell: ({ getValue }) =>
      formatearMoneda(Number(getValue()))
  },
  {
    accessorKey: "montoPagado",
    header: "Pagado",
    size: 75,
    cell: ({ row }) => { 
      const variant = getEstadoPago(row.original.monto_pagado, row.original.monto_total);
      return (
        <span className={textoEstadoPago({ variant })}>
          {formatearMoneda(row.original.monto_pagado)}
        </span>
      );
    }
  },
  {
    accessorKey: "montoPendiente",
    header: "Pendiente",
    size: 75,
    cell: ({ row }) => { 
      const variant = getEstadoPago(row.original.monto_pagado, row.original.monto_total);
      return (
        <span className={textoEstadoPago({ variant })}>
          {formatearMoneda(row.original.monto_pendiente)}
        </span>
      );
    }
  },
  {
    accessorKey: "numeroFactura",
    header: "FAC",
    size: 60,
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