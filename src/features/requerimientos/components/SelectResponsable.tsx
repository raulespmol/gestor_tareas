import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRequerimientos } from "@/context/RequerimientosContext.tsx"
import { trabajadores } from "@/data/placeholder/trabajadores";

const SelectResponsable = ( {responsableId, requerimientoId}: {responsableId: number, requerimientoId: number}) => {
  const { actualizarResponsable } = useRequerimientos();

  const handleChange = (nuevoResponsableId: number) => {
    actualizarResponsable(requerimientoId, nuevoResponsableId);
  }

  return (
    <Select 
      value={responsableId.toString()}
      onValueChange={(e) => handleChange(parseInt(e))}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {trabajadores.map((t) => (
            <SelectItem key={t.id} value={t.id.toString()}>
              {t.nombre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectResponsable