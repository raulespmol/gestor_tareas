import { memo } from "react";
import {
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectTrigger, 
  SelectValue,
} from "@/components/ui/select";
import { estados } from "@/data/placeholder/estados";

type Props = {
  estadoId: number;
  requerimientoId: number;
  onChange: (requerimientoId: number, nuevoEstadoId: number) => void;
};

const SelectEstado = memo(({ estadoId, requerimientoId, onChange }: Props) => {
  return (
    <Select
      value={estadoId.toString()}
      onValueChange={(e) => onChange(requerimientoId, parseInt(e))}
    >
      <SelectTrigger size="sm" className="w-full text-xs">
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
  );
});

export default SelectEstado;