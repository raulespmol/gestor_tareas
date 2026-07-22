import { z } from "zod";

export const nuevoRequerimientoSchema = z
  .object({
    fecha: z
      .string()
      .min(1, "La fecha es obligatoria"),

    cliente: z
      .string()
      .trim()
      .min(1, "El cliente es obligatorio"),

    cotizacion: z
      .string()
      .trim(),

    descripcion: z
      .string()
      .trim(),

    responsable_id: z
      .string(),

    estado_id: z
      .string(),

    monto_total: z
      .number({
        error: "Ingrese un monto válido",
      })
      .min(0, "El monto no puede ser negativo"),

    factura: z.string().trim(),

    otros_datos: z.string().trim(),
  })

export type RequerimientoFormData = z.infer<typeof nuevoRequerimientoSchema>;