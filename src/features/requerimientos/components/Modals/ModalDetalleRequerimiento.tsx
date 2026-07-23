import type { ReactNode } from "react";
import type { Requerimiento } from "../../types/requerimiento.type";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator"
import { Calendar, EllipsisIcon, FileText, Tag, TextAlignStart, User } from "lucide-react";

import { CardMonto } from "@/features/requerimientos/components/CardMonto";
import { HistorialPagos } from "@/features/pagos/components/HistorialPagos";

import { getEstadoPago } from "@/features/requerimientos/utils/colorMonto";

import { formatearFecha } from "@/utils/formatearFecha";
import { useCatalogos } from "@/context/CatalogosContext";
import { estados } from "@/data/placeholder/estados";
import { BadgeEstado } from "../BadgeEstado";
import { BadgeResponsable } from "../BadgeResponsable";

type Props = {
  requerimiento: Requerimiento | null;
  onOpenChange: (open: boolean) => void;
};

type CampoProps = {
  label: string;
  valor?: string | ReactNode
  icon?: ReactNode;
};

const Campo = ({ label, valor, icon }: CampoProps) => (
  <div className="flex gap-2">
    {icon && <div className="p-1 bg-muted rounded flex items-center">{icon}</div>}
    <div className="flex flex-col">
      <span className="text-[10px] text-muted-foreground uppercase">{label}</span>
      <span className="text-sm">{valor || "—"}</span>
    </div>
  </div>
);

const ModalDetalleRequerimiento = ({ requerimiento, onOpenChange }: Props) => {
  if (!requerimiento) return null;

  const { trabajadores } = useCatalogos();
  const estado = estados.find((e) => e.id === requerimiento.estado_id);
  const responsable = trabajadores.find((t) => t.id === requerimiento.responsable_id)?.nombre;

  const estadoPago = getEstadoPago(requerimiento.monto_pagado, requerimiento.monto_total);

  return (
    <Dialog open={requerimiento !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-6">
        <DialogHeader>
          <DialogTitle>Requerimiento {requerimiento.cliente}</DialogTitle>
          <DialogDescription className="sr-only">
            Detalle del requerimiento seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-2">
          <Separator />
          <div className="grid grid-cols-3 gap-4">
            <CardMonto 
              label="Total" 
              value={requerimiento.monto_total} 
            />
            <CardMonto 
              label="Pagado" 
              value={requerimiento.monto_pagado} variant={estadoPago} 
            />
            <CardMonto 
              label="Pendiente" 
              value={requerimiento.monto_pendiente} variant={estadoPago} 
            />
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <Campo 
              label="Fecha" 
              valor={formatearFecha(requerimiento.fecha)} 
              icon={<Calendar size={16} />}
            />
            <Campo 
              label="Cliente" 
              valor={requerimiento.cliente} 
              icon={<User size={16} />}
            />
          
            <Campo 
              label="N° Cotización" 
              valor={requerimiento.cotizacion} 
              icon={<FileText size={16} />}
            />
            <Campo 
              label="N° Factura" 
              valor={requerimiento.factura} 
              icon={<FileText size={16} />}
            />

            <Campo 
              label="Responsable" 
              valor={
                <BadgeResponsable>{responsable}</BadgeResponsable>
              } 
              icon={<User size={16} />}
            />
            <Campo 
              label="Estado" 
              valor={
                <BadgeEstado color={estado!.color}>
                  {estado?.label}
                </BadgeEstado>  } 
              icon={<Tag size={16} />}
            />
          </div>

          <Separator />

          <div>
            <Campo 
              label="Descripción" 
              valor={
                <p className="whitespace-pre-wrap text-sm">{requerimiento.descripcion}</p>
              } 
              icon={<TextAlignStart size={16} />}
            />
          </div>
          
          <Separator />
          
          <div>
            <Campo 
              label="Otros Datos" 
              valor={requerimiento.otros_datos} 
              icon={<EllipsisIcon size={16} />}
            />
          </div>

          <Separator />
          
          <HistorialPagos requerimiento={requerimiento} />

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleRequerimiento;