import { z } from "zod";

export const editarRequerimientoSchema = z.object({
  fecha: z.string().min(1, "La fecha es obligatoria"),
  clienteEmpresa: z.string().trim().min(1, "El cliente es obligatorio"),
  numeroCotizacion: z.string().trim(),
  detalleDescripcion: z.string().trim(),
  numeroFactura: z.string().trim(),
  otrosDatos: z.string().trim(),
});

export type EditarRequerimientoFormData = z.infer<typeof editarRequerimientoSchema>;