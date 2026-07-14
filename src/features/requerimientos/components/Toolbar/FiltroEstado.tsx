import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { estados } from "@/data/placeholder/estados";
import { cn } from "@/lib/utils";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

export default function FiltroEstado({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const toggleEstado = (id: string) => {
    onChange(
      value.includes(id)
        ? value.filter((v) => v !== id)
        : [...value, id]
    );
  };

  const label = value.length > 0
    ? `Estado (${value.length})`
    : "Estado";

  const todosSeleccionados = value.length === estados.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          {label}
          {value.length > 0
            ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" onClick={(e) => { e.stopPropagation(); onChange([]); }} />
            : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>
              Sin resultados
            </CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => onChange(estados.map((e) => e.id))}
                className="gap-2"
              >
                <Check className={cn("h-4 w-4", todosSeleccionados ? "opacity-100" : "opacity-0")} />
                Seleccionar todo
              </CommandItem>
              <CommandItem
                onSelect={() => onChange([])}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Borrar filtro
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              {estados.map((estado) => (
                <CommandItem
                  key={estado.id}
                  onSelect={() => toggleEstado(estado.id)}
                  className="gap-2"
                >
                  <Check className={cn("h-4 w-4", value.includes(estado.id) ? "opacity-100" : "opacity-0")} />
                  {estado.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}