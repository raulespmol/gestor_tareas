

import { formatearMoneda } from "@/utils/formatearMoneda"
import { textoEstadoPago, bordeEstadoPago, fondoEstadoPago } from "@/features/requerimientos/utils/colorMonto"

type montoCardProps = {
  label: string,
  value: number,
  variant?: "pendiente" | "abono" | "pagado"
}

export const CardMonto = ({ label, value, variant }: montoCardProps) => {
  return (
    <div 
      className={`
        flex flex-col  px-4 py-2 rounded-lg border
        ${variant ? bordeEstadoPago({ variant }) : "border-border"}
        ${variant ? fondoEstadoPago({ variant }) : "bg-background"}
      `}
    >
      <span 
        className={`
          text-xs uppercase
          ${variant ? textoEstadoPago({ variant }) : "text-muted-foreground"}
        `}
      >
        {label}
      </span>
      <span
        className={`
          font-mono font-bold text-lg
          ${variant ? textoEstadoPago({ variant }) : "text-foreground"}
        `}
      >
        {formatearMoneda(value)}
      </span>
    </div>
  )
}