import type { EstadoColor } from "../constants/coloresEstado";

export type Estado = {
  id: string;
  key: string;
  label: string;
  color: EstadoColor;
};