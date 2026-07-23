import { coloresEstado } from "../../../catalogos/estados/coloresEstado";
import type { Estado } from "../../../catalogos/estados/estado.type";

type EstadoDotProps = {
  estado: Estado
}

export const DotEstado = ({ estado }: EstadoDotProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className={coloresEstado[estado.color].dot} />
      <span>{estado.label}</span>
    </div>
  )
}