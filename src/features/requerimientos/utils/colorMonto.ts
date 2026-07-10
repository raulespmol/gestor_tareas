export type EstadoPago = "pendiente" | "abono" | "pagado";

export const getEstadoPago = (montoPagado: number, montoTotal: number): EstadoPago => {
  if (montoPagado === 0) return "pendiente";
  if (montoPagado >= montoTotal) return "pagado";
  return "abono";
};

export const clasesEstadoPago: Record<EstadoPago, string> = {
  "pendiente": "text-red-500",
  "abono": "text-amber-500",
  "pagado": "text-green-500",
};