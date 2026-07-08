import { z } from "zod";

export const createRegistrarPagoSchema = (maxMonto: number) => z.object({
  fecha: z
    .string()
    .min(1, "La fecha es obligatoria"),

  monto: z
    .number({ message: "El monto debe ser un número válido" })
    .min(1, { message: "El monto es obligatorio" })
    .max(maxMonto, {
      message: "No puede superar el saldo pendiente",
    }),

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
        data.medioPago === "credito" || data.medioPago === "debito";

      if (requiereVoucher && data.voucher === "") {
        ctx.addIssue({
          code: "custom",
          path: ["voucher"],
          message: "El número de voucher es obligatorio.",
        });
      }
    });

export type RegistrarPagoFormData = z.infer<ReturnType<typeof createRegistrarPagoSchema>>;