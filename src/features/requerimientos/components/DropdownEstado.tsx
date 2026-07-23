import { memo } from "react";
import { useCatalogos } from "@/context/CatalogosContext";

import { colorPorEstado } from "../constants/colorPorEstado";

import { BadgeEstado } from "./BadgeEstado";
import { Check } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DotEstado } from "./DotEstado";

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

  const { estados } = useCatalogos()

  const estadoActual = estados.find(e => e.id === estadoId) ?? estados[0];
  const color = colorPorEstado[estadoActual.key] ?? "gray";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <BadgeEstado color={color}>
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
            onClick={() => onChange(requerimientoId, estado.id)}
            className="flex justify-between cursor-pointer"
          >
            <DotEstado estado={estado}/>
            {estado.id === estadoId && (<Check className="size-4" />)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});