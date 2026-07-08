import type { RequerimientoFormData } from "../schemas/nuevoRequerimiento.schema";

export const defaultRequerimientoForm: RequerimientoFormData = {
  fecha: new Date().toISOString().split("T")[0],
  clienteEmpresa: "",
  numeroCotizacion: "",
  detalleDescripcion: "",
  responsableId: "0",
  estadoId: "0",
  montoTotal: 0,
  numeroFactura: "",
 otrosDatos: "",
};