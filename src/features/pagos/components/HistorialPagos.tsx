import { useState, useEffect } from "react";
import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";
import type { Pago } from "../types/pago.type";

import { useCatalogos } from "@/context/CatalogosContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatearMoneda } from "@/utils/formatearMoneda";
import { formatearFecha } from "@/utils/formatearFecha";

import { obtenerPagosRequerimiento } from "../services/pagos.service";

type HistorialPagosProps = {
  requerimiento: Requerimiento
}

export const HistorialPagos = ({ requerimiento }: HistorialPagosProps) => {
  const [pagos, setPagos] = useState<Pago[]>([])

  useEffect(() => {
    const cargarPagos = async () => {
      const data = await obtenerPagosRequerimiento(requerimiento.id)
      setPagos(data)
    }

    cargarPagos()
  }, [requerimiento.id])

  const { medios_pago } = useCatalogos()

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
              const medioPagoLabel = medios_pago.find((m) => m.id === pago.medio_pago_id)?.label ?? pago.medio_pago_id;
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
