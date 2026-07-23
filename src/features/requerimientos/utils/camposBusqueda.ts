import type { Requerimiento } from "../types/requerimiento.type";

export const camposBusqueda = (row: Requerimiento) =>
  [
    row.cliente,
    row.cotizacion,
    row.descripcion,
    row.factura,
    row.otros_datos,
  ].join(" ");