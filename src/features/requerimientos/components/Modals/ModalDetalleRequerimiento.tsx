import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatearFecha } from "@/utils/formatearFecha";
import { formatearMoneda } from "@/utils/formatearMoneda";
import { trabajadores } from "@/data/placeholder/trabajadores";
import { estados } from "@/data/placeholder/estados";
import { mediosPago } from "@/data/placeholder/mediosPago";

import { usePagos } from "@/context/PagosContext";

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

  const { pagosPorRequerimiento } = usePagos()

  const estado = estados.find((e) => e.id === requerimiento.estadoId)?.nombre;
  const responsable = trabajadores.find((t) => t.id === requerimiento.responsableId)?.nombre;
  const pagos = pagosPorRequerimiento(requerimiento.id)

  return (
    <Dialog open={requerimiento !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Requerimiento {requerimiento.id}</DialogTitle>
          <DialogDescription className="sr-only">
            Detalle del requerimiento seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-2">

          <div className="grid grid-cols-3 gap-6">
            <Campo label="Fecha" valor={formatearFecha(requerimiento.fecha)} />
            <Campo label="Cliente" valor={requerimiento.clienteEmpresa} />
            <Campo label="N° Cotización" valor={requerimiento.numeroCotizacion} />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Campo label="Estado" valor={estado} />
            <Campo label="Responsable" valor={responsable} />
            <Campo label="N° Factura" valor={requerimiento.numeroFactura} />
          </div>

          <div>
            <Campo label="Descripción" valor={requerimiento.detalleDescripcion} />
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            <Campo label="Total" valor={formatearMoneda(requerimiento.montoTotal)} />
            <Campo label="Pagado" valor={formatearMoneda(requerimiento.montoPagado)} />
            <Campo label="Pendiente" valor={formatearMoneda(requerimiento.montoPendiente)} />
            <Campo label="Otros Datos" valor={requerimiento.otrosDatos} />
          </div>

          <div>
            <h4 className="text-md mb-2 font-semibold">Historial de Pagos</h4>
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Medio de Pago</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagos.length > 0 ? (
                  pagos.map((pago) => {
                    const medioLabel = mediosPago.find((m) => m.value === pago.medioPago)?.label ?? pago.medioPago;
                    return (
                      <TableRow key={pago.id}>
                        <TableCell>{formatearFecha(pago.fecha)}</TableCell>
                        <TableCell>{formatearMoneda(pago.monto)}</TableCell>
                        <TableCell>
                          {medioLabel}{pago.voucher ? ` #${pago.voucher}` : ""}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      Sin pagos registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleRequerimiento;