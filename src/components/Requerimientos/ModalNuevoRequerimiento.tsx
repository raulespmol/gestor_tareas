import {
  Dialog,
  DialogContent,
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

        <RequerimientoForm />
      </DialogContent>
    </Dialog>
  );
};

export default ModalNuevoRequerimiento;