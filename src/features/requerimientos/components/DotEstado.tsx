import { coloresEstado} from "../constants/coloresEstado";
import type { Estado } from "../../../catalogos/estados/estado.type";
import { colorPorEstado } from "../constants/colorPorEstado";

type EstadoDotProps = {
  estado: Estado
}

export const DotEstado = ({ estado }: EstadoDotProps) => {
    const color = colorPorEstado[estado.key] ?? "gray";

  return (
    <div className="flex items-center gap-2">
      <div className={coloresEstado[color].dot} />
      <span>{estado.label}</span>
    </div>
  )
}