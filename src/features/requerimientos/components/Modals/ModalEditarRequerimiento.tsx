import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Requerimiento } from "../../types/requerimiento.type";
import { formatearMoneda } from "@/utils/formatearMoneda";

import { FormRequerimiento } from "@/features/requerimientos/components/Forms/FormRequerimiento";

import { useRequerimientos } from "@/context/RequerimientosContext";
import type { RequerimientoFormData } from "../../schemas/nuevoRequerimiento.schema";

type Props = {
  requerimiento: Requerimiento | null;
  onOpenChange: (open: boolean) => void;
};

const ModalEditarRequerimiento = ({ requerimiento, onOpenChange }: Props) => {
  const [errorMontoTotal, setErrorMontoTotal] = useState<string | undefined>();
  const { editarRequerimiento } = useRequerimientos()

  useEffect(() => {
    setErrorMontoTotal(undefined);
  }, [requerimiento]);

  const handleSave = (data: RequerimientoFormData) => {
    if (!requerimiento) return;
    if (data.montoTotal < requerimiento.montoPagado){
      setErrorMontoTotal(
        `El total no puede ser menor al monto ya pagado (${formatearMoneda(requerimiento.montoPagado)})`
      )
      return;
    }

    setErrorMontoTotal(undefined)
    editarRequerimiento({
      ...requerimiento,
      ...data,
      montoPendiente: data.montoTotal - requerimiento.montoPagado,
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
            errorMontoTotal={errorMontoTotal}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditarRequerimiento;