import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRequerimientos } from "@/context/RequerimientosContext.tsx"
import { estados } from "@/data/placeholder/estados";

const SelectEstado = ( {estadoId, requerimientoId}: {estadoId: number, requerimientoId: number}) => {
  const { actualizarEstado } = useRequerimientos();

  const handleChange = (nuevoEstadoId: number) => {
    actualizarEstado(requerimientoId, nuevoEstadoId);
  }

  return (
    <Select 
      value={estadoId.toString()}
      onValueChange={(e) => handleChange(parseInt(e))}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {estados.map((s) => (
            <SelectItem key={s.id} value={s.id.toString()}>
              {s.nombre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectEstado