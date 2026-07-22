import type { RequerimientoFormData } from "../schemas/nuevoRequerimiento.schema";

export const defaultRequerimientoForm: RequerimientoFormData = {
  fecha: new Date().toISOString().split("T")[0],
  cliente: "",
  cotizacion: "",
  descripcion: "",
  responsable_id: "0",
  estado_id: "0",
  monto_total: 0,
  factura: "",
  otros_datos: "",
};