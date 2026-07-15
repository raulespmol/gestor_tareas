import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";
import type { EstadoColor } from "../constants/coloresEstado";
import { coloresEstado } from "../constants/coloresEstado";


type BadgeEstadoProps = {
  children: ReactNode;
  color: EstadoColor 
};

export const BadgeEstado = ({ color, children }: BadgeEstadoProps) => {
  return (
    <Badge className={coloresEstado[color].badge}>
      {children}
    </Badge>
  );
};