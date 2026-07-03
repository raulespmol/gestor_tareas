import { memo } from "react";
import {
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectTrigger, 
  SelectValue,
} from "@/components/ui/select";
import { trabajadores } from "@/data/placeholder/trabajadores";

type Props = {
  responsableId: number;
  requerimientoId: number;
  onChange: (requerimientoId: number, nuevoResponsableId: number) => void;
};

const SelectResponsable = memo(({ responsableId, requerimientoId, onChange }: Props) => {
  return (
    <Select
      value={responsableId.toString()}
      onValueChange={(e) => onChange(requerimientoId, parseInt(e))}
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
  );
});

export default SelectResponsable;