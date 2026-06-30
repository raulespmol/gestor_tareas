import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Requerimiento } from "../types/requerimiento.type";

import { EditarRequerimientoForm } from "./FormEditarRequerimiento";

type Props = {
  requerimiento: Requerimiento | null;
  onOpenChange: (open: boolean) => void;
};

const ModalEditarRequerimiento = ({ requerimiento, onOpenChange }: Props) => {
  return (
    <Dialog
      open={requerimiento !== null}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Editar Requerimiento</DialogTitle>
          <DialogDescription className="sr-only">
            Edite la información del requerimiento seleccionado.
          </DialogDescription>
        </DialogHeader>
        {requerimiento && (
          <EditarRequerimientoForm
            requerimiento={requerimiento}
            onSuccess={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditarRequerimiento;