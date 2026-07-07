import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editarRequerimientoSchema,
  type EditarRequerimientoFormData,
} from "@/features/requerimientos/schemas/editarRequerimiento.schema";
import { useRequerimientos } from "@/context/RequerimientosContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";

type Props = {
  requerimiento: Requerimiento;
  onSuccess: () => void;
};

export const FormEditarRequerimiento = ({ requerimiento, onSuccess }: Props) => {
  const { editarRequerimiento } = useRequerimientos();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditarRequerimientoFormData>({
    resolver: zodResolver(editarRequerimientoSchema),
    defaultValues: {
      fecha: requerimiento.fecha,
      clienteEmpresa: requerimiento.clienteEmpresa,
      numeroCotizacion: requerimiento.numeroCotizacion,
      detalleDescripcion: requerimiento.detalleDescripcion,
      numeroFactura: requerimiento.numeroFactura,
      otrosDatos: requerimiento.otrosDatos,
    },
  });

  const onSubmit = (data: EditarRequerimientoFormData) => {
    editarRequerimiento({ ...requerimiento, ...data });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <Field className="col-span-1">
        <FieldLabel>Fecha</FieldLabel>
        <Input type="date" {...register("fecha")} />
        <FieldError errors={[errors.fecha]} />
      </Field>

      <Field className="col-span-1">
        <FieldLabel>N° Cotización</FieldLabel>
        <Input
          type="text"
          {...register("numeroCotizacion")}
          placeholder="01234"
        />
        <FieldError errors={[errors.numeroCotizacion]} />
      </Field>

      <Field className="col-span-2">
        <FieldLabel>Cliente</FieldLabel>
        <Input
          {...register("clienteEmpresa")}
          placeholder="Nombre / Razón Social"
        />
        <FieldError errors={[errors.clienteEmpresa]} />
      </Field>

      <Field className="col-span-2">
        <FieldLabel>Descripción</FieldLabel>
        <Textarea
          {...register("detalleDescripcion")}
          className="resize-none h-27.5"
          placeholder="Adhesivo / Tela / Greyback ..."
        />
      </Field>

      <Field className="col-span-1">
        <FieldLabel>N° Factura</FieldLabel>
        <Input
          type="text"
          {...register("numeroFactura")}
          placeholder="01234"
        />
      </Field>

      <Field className="col-span-1">
        <FieldLabel>Otros Datos</FieldLabel>
        <Input
          type="text"
          {...register("otrosDatos")}
          placeholder="Telefono / OC / RUT"
        />
      </Field>

      <div className="col-span-2 flex justify-end">
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
};