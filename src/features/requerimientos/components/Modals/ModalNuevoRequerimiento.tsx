import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { RequerimientoFormData } from "../../schemas/nuevoRequerimiento.schema";

import { FormRequerimiento } from "@/features/requerimientos/components/Forms/FormRequerimiento";
import { defaultRequerimientoForm } from "../../constants/defaultRequerimientoForm";
import { useRequerimientos } from "@/context/RequerimientosContext";


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};



const ModalNuevoRequerimiento = ({ open, onOpenChange }: Props) => {
  const { agregarRequerimiento } = useRequerimientos();

  const handleSave = (data: RequerimientoFormData) => {
    agregarRequerimiento(data);
    onOpenChange(false);
  };

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
        <FormRequerimiento 
          defaultValues={defaultRequerimientoForm}
          onSave={handleSave}
        />
      </DialogContent>
      <DialogDescription className="sr-only">
        Ingrese la información del nuevo requerimiento.
      </DialogDescription>
    </Dialog>
  );
};

export default ModalNuevoRequerimiento;