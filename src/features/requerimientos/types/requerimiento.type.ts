export interface Requerimiento {
  id: string;
  fecha: string;
  clienteEmpresa: string;
  numeroCotizacion: string;
  detalleDescripcion: string;
  responsableId: string;
  estadoId: string;
  montoTotal: number;
  montoPagado: number;
  montoPendiente: number;
  medioPago: string;
  numeroFactura: string;
  otrosDatos: string;
}