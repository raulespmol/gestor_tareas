import { z } from "zod";

export const registrarPagoSchema = z.object({
  fecha: z.string().min(1, "La fecha es obligatoria"),
  monto: z.string().trim(),
  medioPago: z.string().trim(),
  voucher: z.string().trim(),
});

export type RegistrarPagoFormData = z.infer<typeof registrarPagoSchema>;