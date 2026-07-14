import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";


type BadgeEstadoProps = {
  children: ReactNode;
  color: string 
};

export const BadgeEstado = ({ color, children }: BadgeEstadoProps) => {
  return (
    <Badge className={color}>
      {children}
    </Badge>
  );
};