import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import { Eye, Edit3, Trash2, MoreHorizontal, DollarSign } from "lucide-react";

type DropdownAccionesProps = {
  requerimiento: Requerimiento;
  onEditar: (requerimiento: Requerimiento) => void;
  onVerDetalle: (requerimiento: Requerimiento) => void;
  onEliminar: (requerimiento: Requerimiento) => void;
  onRegistrarPago: (requerimiento: Requerimiento) => void;
};

export default function DropdownAcciones({
  requerimiento,
  onEditar,
  onVerDetalle,
  onEliminar,
  onRegistrarPago,
}: DropdownAccionesProps) {

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-full">

          <DropdownMenuItem onSelect={() => onVerDetalle(requerimiento)}>
            <Eye className="mr-2 h-4 w-4" />
            Ver detalles
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => onRegistrarPago(requerimiento)}
            disabled={requerimiento.montoPendiente === 0}
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Registrar pago
          </DropdownMenuItem>

          <Separator className="my-1" />
          
          <DropdownMenuItem onSelect={() => onEditar(requerimiento)}>
            <Edit3 className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => onEliminar(requerimiento)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
