import type { RequerimientoFormData } from "../schemas/requerimiento.schema";

export const defaultRequerimientoForm: RequerimientoFormData = {
  fecha: new Date().toISOString().split("T")[0],
  clienteEmpresa: "",
  numeroCotizacion: "",
  detalleDescripcion: "",
  responsableId: 0,
  estadoId: 0,
  montoTotal: 0,
  montoPagado: 0,
  medioPago: "",
  numeroFactura: "",
 otrosDatos: "",
};