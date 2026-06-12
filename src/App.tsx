import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { placeholderData } from "@/assets/data_placeholder";

export function App() {
  return (
    <div className="flex w-full min-h-svh p-6">
      <div className="flex min-w-0 w-full flex-col gap-4 text-sm leading-loose">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestor de Tareas</h1>
          <Button>Agregar Tarea</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Fecha</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Pagado</TableHead>
              <TableHead className="text-right">Pendiente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {placeholderData.map((item) => (
              <TableRow key={item.numeroCotizacion}>
                <TableCell className="font-medium">{item.fecha}</TableCell>
                <TableCell>{item.clienteEmpresa}</TableCell>
                <TableCell>{item.estado}</TableCell>
                <TableCell className="text-right">${item.montoTotal.toLocaleString('es-CL')}</TableCell>
                <TableCell className="text-right">${item.montoPagado.toLocaleString('es-CL')}</TableCell>
                <TableCell className="text-right">${(item.montoTotal - item.montoPagado).toLocaleString('es-CL')}</TableCell>
                <TableCell>{item.medioPago}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default App
