import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FormNuevoRequerimiento } from "@/features/requerimientos/components/Forms/FormNuevoRequerimiento";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ModalNuevoRequerimiento = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl p-6">
        <DialogHeader>
          <DialogTitle>
            Nuevo Requerimiento
          </DialogTitle>
        </DialogHeader>

        <FormNuevoRequerimiento onSuccess={() => onOpenChange(false)} />
      </DialogContent>
      <DialogDescription className="sr-only">
        Ingrese la información del nuevo requerimiento.
      </DialogDescription>
    </Dialog>
  );
};

export default ModalNuevoRequerimiento;