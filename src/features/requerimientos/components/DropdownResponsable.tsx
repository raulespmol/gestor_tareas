import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCatalogos } from "@/context/CatalogosContext";
import { Check } from "lucide-react";
import { memo } from "react";
import { BadgeResponsable } from "./BadgeResponsable";

type DropdownResponsableProps = {
  responsableId: string;
  requerimientoId: string;
  onChange: (requerimientoId: string, nuevoResponsableId: string) => void;
};

export const DropdownResponsable = memo(
  ({ responsableId, requerimientoId, onChange }: DropdownResponsableProps) => {
    const { trabajadores } = useCatalogos();
    const responsableActual = trabajadores.find((t) => t.id === responsableId) ?? trabajadores[0] ?? { id: "0", nombre: "Sin asignar" };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="text-left">
            <BadgeResponsable>{responsableActual?.nombre}</BadgeResponsable>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-56">
          {trabajadores.map((trabajador) => (
            <DropdownMenuItem
              key={trabajador.id}
              onClick={() => onChange(requerimientoId, trabajador.id)}
              className="flex justify-between cursor-pointer"
            >
              <span>{trabajador.nombre}</span>

              {trabajador.id === responsableId && <Check className="size-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);
