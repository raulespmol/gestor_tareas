import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { RequerimientoForm } from "./RequerimientoForm";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Nuevo Requerimiento
          </DialogTitle>
        </DialogHeader>

        <RequerimientoForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
      <DialogDescription className="sr-only">
        Ingrese la información del nuevo requerimiento.
      </DialogDescription>
    </Dialog>
  );
};

export default ModalNuevoRequerimiento;