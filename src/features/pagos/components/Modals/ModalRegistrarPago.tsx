import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Requerimiento } from "../../../requerimientos/types/requerimiento.type";

import { FormRegistrarPago } from "@/features/pagos/components/Forms/FormRegistrarPago";

type Props = {
  requerimiento: Requerimiento | null;
  onOpenChange: (open: boolean) => void;
};

const ModalRegistrarPago = ({ requerimiento, onOpenChange }: Props) => {
  return (
    <Dialog
      open={requerimiento !== null}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar Pago - Requerimiento {requerimiento?.id}</DialogTitle>
          <DialogDescription className="sr-only">
            Ingrese la información del pago.
          </DialogDescription>
        </DialogHeader>
        {requerimiento && (
          <FormRegistrarPago 
            requerimiento={requerimiento}
            onSuccess={() => onOpenChange(false)} 
          />
        )}

      </DialogContent>

    </Dialog>
  );
};

export default ModalRegistrarPago;