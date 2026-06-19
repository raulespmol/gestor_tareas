import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRequerimientos } from "@/context/RequerimientosContext.tsx" 
import SelectResponsable from "./SelectResponsable";
import SelectEstado from "./SelectEstado";

const TablaRequerimientos = () => {
  const { requerimientos } = useRequerimientos();
  return (
    <Table className="w-full max-h-[calc(100vh-12rem)] overflow-hidden">
      <TableHeader>
        <TableRow className="text-sm sticky top-0 z-10 bg-muted">
          <TableHead className="w-25 text-center">Fecha</TableHead>
          <TableHead className="text-center">Cliente</TableHead>
          <TableHead className="w-10 text-center">Cotización</TableHead>
          <TableHead className="text-center">Descripción</TableHead>
          <TableHead className="text-center">Responsable</TableHead>
          <TableHead className="w-25 text-center">Estado</TableHead>
          <TableHead className="text-center">Total</TableHead>
          <TableHead className="text-center">Pagado</TableHead>
          <TableHead className="text-center">Pendiente</TableHead>
          <TableHead className="text-center">Medio de Pago</TableHead>
          <TableHead className="text-center">Factura</TableHead>
          <TableHead className="text-center">Otros datos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="max-h-[calc(100vh-12rem)] overflow-y-auto text-sm">
        {requerimientos.map((item) => (
          <TableRow key={item.id} className="hover:bg-muted/50">
            <TableCell className="text-xs text-center">{item.fecha}</TableCell>
            <TableCell className="text-left">{item.clienteEmpresa}</TableCell>
            <TableCell className="text-center">{item.numeroCotizacion}</TableCell>
            <TableCell className="max-w-xs text-left overflow-hidden">{item.detalleDescripcion}</TableCell>
            <TableCell className="text-center w-50">
              <SelectResponsable responsableId={item.responsableId} requerimientoId={item.id} />
            </TableCell>
            <TableCell className="text-center">
              <SelectEstado estadoId={item.estadoId} requerimientoId={item.id} />
            </TableCell>
            <TableCell className="text-center">${item.montoTotal.toLocaleString('es-CL')}</TableCell>
            <TableCell className="text-center">${item.montoPagado.toLocaleString('es-CL')}</TableCell>
            <TableCell className="text-center">${(item.montoTotal - item.montoPagado).toLocaleString('es-CL')}</TableCell>
            <TableCell className="text-center">{item.medioPago}</TableCell>
            <TableCell className="text-center">{item.numeroFactura}</TableCell>
            <TableCell className="text-left">{item.otrosDatos}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TablaRequerimientos