import { z } from "zod";

export const registrarPagoSchema = z.object({
  fecha: z
    .string()
    .min(1, "La fecha es obligatoria"),

  monto: z
    .number()
    .min(1, "El monto es obligatorio"),

  medioPago: z
    .string()
    .trim()
    .min(1, "El medio de pago es obligatorio"),

  voucher: z
    .string()
    .trim(),
})
.superRefine((data, ctx) => {
    const requiereVoucher =
      data.medioPago === "credito" ||
      data.medioPago === "debito";

    if (requiereVoucher && data.voucher === "") {
      ctx.addIssue({
        code: "custom",
        path: ["voucher"],
        message: "El número de voucher es obligatorio.",
      });
    }
});

export type RegistrarPagoFormData = z.infer<typeof registrarPagoSchema>;