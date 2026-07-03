import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type DropdownAccionesProps = {
  requerimiento: Requerimiento;
  onEditar: (requerimiento: Requerimiento) => void;
  onVerDetalle: (requerimiento: Requerimiento) => void;
  onEliminar: (requerimiento: Requerimiento) => void;
};

export default function DropdownAcciones({
  requerimiento,
  onEditar,
  onVerDetalle,
  onEliminar,
}: DropdownAccionesProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => onVerDetalle(requerimiento)}>
          Ver detalles
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onEditar(requerimiento)}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => onEliminar(requerimiento)}
          className="text-destructive focus:text-destructive"
        >
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
