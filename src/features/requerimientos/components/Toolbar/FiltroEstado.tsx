import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { estados } from "@/data/placeholder/estados";
import { cn } from "@/lib/utils";

type Props = {
  value: number[];
  onChange: (value: number[]) => void;
};

export default function FiltroEstado({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const toggleEstado = (id: number) => {
    onChange(
      value.includes(id)
        ? value.filter((v) => v !== id)
        : [...value, id]
    );
  };

  const label = value.length > 0
    ? `Estado (${value.length})`
    : "Estado";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          {label}
          {value.length > 0
            ? <X className="h-3.5 w-3.5 text-muted-foreground" onClick={(e) => { e.stopPropagation(); onChange([]); }} />
            : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>Sin resultados</CommandEmpty>
            <CommandGroup>
              {estados.map((estado) => (
                <CommandItem
                  key={estado.id}
                  onSelect={() => toggleEstado(estado.id)}
                  className="gap-2"
                >
                  <Check className={cn("h-4 w-4", value.includes(estado.id) ? "opacity-100" : "opacity-0")} />
                  {estado.nombre}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}