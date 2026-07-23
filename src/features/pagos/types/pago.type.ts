export type Pago = {
  id: string;
  requerimiento_id: string;
  fecha: string;
  monto: number;
  medio_pago_id: string;
  voucher: string;
};