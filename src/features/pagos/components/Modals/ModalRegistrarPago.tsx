import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator"

import type { Requerimiento } from "../../../requerimientos/types/requerimiento.type";

import { FormRegistrarPago } from "@/features/pagos/components/Forms/FormRegistrarPago";
import { HistorialPagos } from "../HistorialPagos";

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
          <DialogTitle>Registrar Pago - Requerimiento {requerimiento?.cliente}</DialogTitle>
          <DialogDescription className="sr-only">
            Ingrese la información del pago.
          </DialogDescription>
        </DialogHeader>
        {requerimiento && (
          <>
            <FormRegistrarPago 
              requerimiento={requerimiento}
              onSuccess={() => onOpenChange(false)} 
            />

            <Separator />
            
            <HistorialPagos 
              requerimiento={requerimiento}
            />
          </>
        )}

      </DialogContent>

    </Dialog>
  );
};

export default ModalRegistrarPago;