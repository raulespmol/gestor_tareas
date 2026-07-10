import { cva } from "class-variance-authority"

export type EstadoPago = "pendiente" | "abono" | "pagado";

export const getEstadoPago = (montoPagado: number, montoTotal: number): EstadoPago => {
  if (montoPagado === 0) return "pendiente";
  if (montoPagado >= montoTotal) return "pagado";
  return "abono";
};

export const textoEstadoPago = cva("text", {
  variants: {
    variant:{
      pendiente: ["text-red-500"],
      abono: ["text-amber-500"],
      pagado: ["text-green-500"],
    }
  },
});

export const bordeEstadoPago = cva("border", {
  variants: {
    variant: {
      pendiente: ["border-red-500"],
      abono: ["border-amber-500"],
      pagado: ["border-green-500"],
    }
  },
});

export const fondoEstadoPago = cva("bg", {
  variants: {
    variant: {
      pendiente: ["bg-red-500/15"],
      abono: ["bg-amber-500/15"],
      pagado: ["bg-green-500/15"],
    }
  },
});