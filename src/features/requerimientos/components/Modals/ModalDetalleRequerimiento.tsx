import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatearFecha } from "@/utils/formatearFecha";
import { formatearMoneda } from "@/utils/formatearMoneda";
import { trabajadores } from "@/data/placeholder/trabajadores";
import { estados } from "@/data/placeholder/estados";

import type { Requerimiento } from "../../types/requerimiento.type";

type Props = {
  requerimiento: Requerimiento | null;
  onOpenChange: (open: boolean) => void;
};

type CampoProps = {
  label: string;
  valor?: string;
};

const Campo = ({ label, valor }: CampoProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-sm">{valor || "—"}</span>
  </div>
);

const ModalDetalleRequerimiento = ({ requerimiento, onOpenChange }: Props) => {
  if (!requerimiento) return null;

  const estado = estados.find((e) => e.id === requerimiento.estadoId)?.nombre;
  const responsable = trabajadores.find((t) => t.id === requerimiento.responsableId)?.nombre;

  return (
    <Dialog open={requerimiento !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{requerimiento.clienteEmpresa}</DialogTitle>
          <DialogDescription className="sr-only">
            Detalle del requerimiento seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">

          {/* Columna izquierda */}
          <div className="flex flex-col gap-4">
            <Campo label="Fecha" valor={formatearFecha(requerimiento.fecha)} />
            <Campo label="N° Cotización" valor={requerimiento.numeroCotizacion} />
            <Campo label="Descripción" valor={requerimiento.detalleDescripcion} />
            <Campo label="Estado" valor={estado} />
            <Campo label="Responsable" valor={responsable} />
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-4">
            <Campo label="Total" valor={formatearMoneda(requerimiento.montoTotal)} />
            <Campo label="Pagado" valor={formatearMoneda(requerimiento.montoPagado)} />
            <Campo label="Pendiente" valor={formatearMoneda(requerimiento.montoPendiente)} />
            <Campo label="Medio de Pago" valor={requerimiento.medioPago} />
            <Campo label="N° Factura" valor={requerimiento.numeroFactura} />
            <Campo label="Otros Datos" valor={requerimiento.otrosDatos} />
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleRequerimiento;