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
import { BadgeEstado } from "./BadgeEstado";

type Props = {
  estadoId: string;
  requerimientoId: string;
  onChange: (requerimientoId: string, nuevoEstadoId: string) => void;
};

const SelectEstado = memo(({ estadoId, requerimientoId, onChange }: Props) => {
  return (
    <Select
      
      value={estadoId.toString()}
      onValueChange={(e) => onChange(requerimientoId, e)}
    >
      <SelectTrigger size="sm" className="w-full text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {estados.map((s) => (
            <SelectItem key={s.id} value={s.id}>
              <BadgeEstado color={s.color}>
                {s.label}
              </BadgeEstado>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default SelectEstado;