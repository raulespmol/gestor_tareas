import { z } from "zod";

const numberField = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return 0;
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}, z.number().min(0, "No puede ser negativo"));

export const requerimientoSchema = z.object({
  cliente: z.string().min(1, "Requerido"),
  fecha: z.string().min(1),

  total: numberField,
  pagado: numberField,
});