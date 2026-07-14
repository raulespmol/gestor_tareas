import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { memo } from "react";
import { BadgeEstado } from "./BadgeEstado";
import { estados } from "@/data/placeholder/estados";
import { Check } from "lucide-react";

type EstadoDotProps = {
  color?: string,
  label: string
}

const EstadoDot = ({ color, label }: EstadoDotProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`size-2 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  )
}

type DropdownEstadoProps = {
  estadoId: string;
  requerimientoId: string;
  onChange: (
    requerimientoId: string,
    nuevoEstadoId: string
  ) => void;
};

export const DropdownEstado = memo(
({
  estadoId,
  requerimientoId,
  onChange,
}: DropdownEstadoProps) => {

  const estadoActual = estados.find(
    e => e.id === estadoId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <BadgeEstado
            color={estadoActual?.color}
          >
            {estadoActual?.label}
          </BadgeEstado>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-52"
      >
        {estados.map((estado) => (

          <DropdownMenuItem
            key={estado.id}
            onClick={() =>
              onChange(
                requerimientoId,
                estado.id
              )
            }
            className="flex justify-between cursor-pointer"
          >
            <EstadoDot color={estado.color} label={estado.label} />

            {estado.id === estadoId && (
              <Check className="size-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});