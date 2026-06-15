import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { trabajadores } from "@/assets/data_placeholder";

const SelectResponsable = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Asignar Responsable" />
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