import type { ReactNode } from "react";
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
import { Separator } from "@/components/ui/separator"

import { CardMonto } from "@/features/requerimientos/components/CardMonto";

import { getEstadoPago } from "@/features/requerimientos/utils/colorMonto";

import { formatearFecha } from "@/utils/formatearFecha";
import { formatearMoneda } from "@/utils/formatearMoneda";
import { trabajadores } from "@/data/placeholder/trabajadores";
import { estados } from "@/data/placeholder/estados";
import { mediosPago } from "@/data/placeholder/mediosPago";

import { usePagos } from "@/context/PagosContext";

import type { Requerimiento } from "../../types/requerimiento.type";
import { Calendar, EllipsisIcon, FileText, Tag, TextAlignStart, User } from "lucide-react";


type Props = {
  requerimiento: Requerimiento | null;
  onOpenChange: (open: boolean) => void;
};

type CampoProps = {
  label: string;
  valor?: string;
  icon?: ReactNode;
};

const Campo = ({ label, valor, icon }: CampoProps) => (
  <div className="flex gap-2">
    {icon && <div className="p-1 bg-muted rounded flex items-center">{icon}</div>}
    <div className="flex flex-col">
      <span className="text-[10px] text-muted-foreground uppercase">{label}</span>
      <span className="text-sm">{valor || "—"}</span>
    </div>
  </div>
);

const ModalDetalleRequerimiento = ({ requerimiento, onOpenChange }: Props) => {
  if (!requerimiento) return null;

  const { pagosPorRequerimiento } = usePagos()

  const estado = estados.find((e) => e.id === requerimiento.estadoId)?.nombre;
  const responsable = trabajadores.find((t) => t.id === requerimiento.responsableId)?.nombre;
  const pagos = pagosPorRequerimiento(requerimiento.id)

  const estadoPago = getEstadoPago(requerimiento.montoPagado, requerimiento.montoTotal);

  return (
    <Dialog open={requerimiento !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-6">
        <DialogHeader>
          <DialogTitle>Requerimiento {requerimiento.clienteEmpresa}</DialogTitle>
          <DialogDescription className="sr-only">
            Detalle del requerimiento seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-2">
          <Separator />
          <div className="grid grid-cols-3 gap-4">
            <CardMonto 
              label="Total" 
              value={requerimiento.montoTotal} 
            />
            <CardMonto 
              label="Pagado" 
              value={requerimiento.montoPagado} variant={estadoPago} 
            />
            <CardMonto 
              label="Pendiente" 
              value={requerimiento.montoPendiente} variant={estadoPago} 
            />
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <Campo 
              label="Fecha" 
              valor={formatearFecha(requerimiento.fecha)} 
              icon={<Calendar size={16} />}
            />
            <Campo 
              label="Cliente" 
              valor={requerimiento.clienteEmpresa} 
              icon={<User size={16} />}
            />
          
            <Campo 
              label="N° Cotización" 
              valor={requerimiento.numeroCotizacion} 
              icon={<FileText size={16} />}
            />
            <Campo 
              label="N° Factura" 
              valor={requerimiento.numeroFactura} 
              icon={<FileText size={16} />}
            />

            <Campo 
              label="Responsable" 
              valor={responsable} 
              icon={<User size={16} />}
            />
            <Campo 
              label="Estado" 
              valor={estado} 
              icon={<Tag size={16} />}
            />
          </div>

          <Separator />

          <div>
            <Campo 
              label="Descripción" 
              valor={requerimiento.detalleDescripcion} 
              icon={<TextAlignStart size={16} />}
            />
          </div>
          
          <Separator />
          
          <div>
            <Campo 
              label="Otros Datos" 
              valor={requerimiento.otrosDatos} 
              icon={<EllipsisIcon size={16} />}
            />
          </div>

          <Separator />

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