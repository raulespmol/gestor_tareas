export interface RequerimientoFormData {
  fecha: string;
  clienteEmpresa: string;
  numeroCotizacion: string;
  detalleDescripcion: string;
  responsableId?: number;
  estadoId?: number;
  montoTotal: number;
  montoPagado: number;
  montoPendiente: number;
  medioPago: string;
  numeroFactura: string;
  otrosDatos: string;
}