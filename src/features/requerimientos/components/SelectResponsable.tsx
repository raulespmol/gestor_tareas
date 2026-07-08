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
  responsableId: string;
  requerimientoId: string;
  onChange: (requerimientoId: string, nuevoResponsableId: string) => void;
};

const SelectResponsable = memo(({ responsableId, requerimientoId, onChange }: Props) => {
  return (
    <Select
      value={responsableId.toString()}
      onValueChange={(e) => onChange(requerimientoId, e)}
    >
      <SelectTrigger size="sm" className="w-full text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {trabajadores.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.nombre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default SelectResponsable;