import type { EstadoColor } from "./coloresEstado";

export const colorPorEstado: Record<string, EstadoColor> = {
  en_proceso: "gray",
  cotizar: "red",
  diseno: "sky",
  impresion: "sky",
  taller: "sky",
  por_entregar: "orange",
  instalacion: "purple",
  externo: "purple",
  entregado: "green"
};