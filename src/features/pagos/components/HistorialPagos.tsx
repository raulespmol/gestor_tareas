import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";
import { usePagos } from "@/context/PagosContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { mediosPago } from "@/data/placeholder/mediosPago";

import { formatearMoneda } from "@/utils/formatearMoneda";
import { formatearFecha } from "@/utils/formatearFecha";

type HistorialPagosProps = {
  requerimiento: Requerimiento
}

export const HistorialPagos = ({ requerimiento }: HistorialPagosProps) => {
  const { pagosPorRequerimiento } = usePagos()
  const pagos = pagosPorRequerimiento(requerimiento.id)

  return (
    <div className="flex flex-col">
      <p className="text-md mb-3 font-semibold">Historial de Pagos</p>
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
              return (
                <TableRow key={pago.id}>
                  <TableCell>{formatearFecha(pago.fecha)}</TableCell>
                  <TableCell>{formatearMoneda(pago.monto)}</TableCell>
                  <TableCell>
                    {medioPagoLabel}{pago.voucher ? ` #${pago.voucher}` : ""}
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
  ) 
}
