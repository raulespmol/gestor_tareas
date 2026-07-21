import type { Requerimiento } from "../types/requerimiento.type";

export const camposBusqueda = (row: Requerimiento) =>
  [
    row.clienteEmpresa,
    row.numeroCotizacion,
    row.detalleDescripcion,
    row.numeroFactura,
    row.otrosDatos,
  ].join(" ");