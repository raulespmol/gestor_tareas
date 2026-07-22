export interface Requerimiento {
  id: string;
  fecha: string;
  cliente: string;
  cotizacion: string;
  descripcion: string;
  responsable_id: string;
  estado_id: string;
  monto_total: number;
  monto_pagado: number;
  monto_pendiente: number;
  factura: string;
  otros_datos: string;
}