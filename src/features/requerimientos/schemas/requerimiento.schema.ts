import { z } from "zod";

export const requerimientoSchema = z
  .object({
    fecha: z.string().min(1, "La fecha es obligatoria"),

    clienteEmpresa: z
      .string()
      .trim()
      .min(1, "El cliente es obligatorio"),

    numeroCotizacion: z.string().trim(),

    detalleDescripcion: z.string().trim(),

    responsableId: z.string(),

    estadoId: z.string(),

    montoTotal: z
      .number({
        error: "Ingrese un monto válido",
      })
      .min(0, "El monto no puede ser negativo"),

    montoPagado: z
      .number({
        error: "Ingrese un monto válido",
      })
      .min(0, "El monto no puede ser negativo"),

    medioPago: z.string().trim(),

    numeroFactura: z.string().trim(),

    otrosDatos: z.string().trim(),
  })
  .refine(
    (data) => data.montoPagado <= data.montoTotal,
    {
      message: "El monto pagado no puede ser mayor al total",
      path: ["montoPagado"],
    }
  );

export type RequerimientoFormData = z.infer<typeof requerimientoSchema>;