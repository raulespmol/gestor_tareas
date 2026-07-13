import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Requerimiento } from "../../types/requerimiento.type";

import { FormRequerimiento } from "@/features/requerimientos/components/Forms/FormRequerimiento";

import { useRequerimientos } from "@/context/RequerimientosContext";
import type { RequerimientoFormData } from "../../schemas/nuevoRequerimiento.schema";

type Props = {
  requerimiento: Requerimiento | null;
  onOpenChange: (open: boolean) => void;
};

const ModalEditarRequerimiento = ({ requerimiento, onOpenChange }: Props) => {
  const { editarRequerimiento } = useRequerimientos()

  const handleSave = (data: RequerimientoFormData) => {
  editarRequerimiento({
    ...requerimiento!,
    ...data
  });
  onOpenChange(false);
};

  return (
    <Dialog
      open={requerimiento !== null}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl p-6">
        <DialogHeader>
          <DialogTitle>Editar Requerimiento</DialogTitle>
          <DialogDescription className="sr-only">
            Edite la información del requerimiento seleccionado.
          </DialogDescription>
        </DialogHeader>
        {requerimiento && (
          <FormRequerimiento
            requerimiento={requerimiento}
            defaultValues={requerimiento}
            onSave={handleSave}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditarRequerimiento;