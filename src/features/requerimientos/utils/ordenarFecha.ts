import type { Requerimiento } from "../types/requerimiento.type";

export const ordenarFechaAsc = (
  requerimientos: Requerimiento[]
): Requerimiento[] => {
  return [...requerimientos].sort(
    (a, b) =>
      new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );
};