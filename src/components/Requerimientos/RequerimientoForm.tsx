import { useForm } from "react-hook-form";

import type { RequerimientoFormData } from "@/types/requerimientoForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

import {useRequerimientos} from "@/context/RequerimientosContext";

export const RequerimientoForm = () => {
  const { register, 
    handleSubmit, 
    reset,
    formState: { errors } } = useForm<RequerimientoFormData>({
      defaultValues: {
        clienteEmpresa: "",
        numeroCotizacion: "",
        detalleDescripcion: "",
        montoTotal: 0,
        montoPagado: 0
      }
    });

  const { agregarRequerimiento } = useRequerimientos();

  const onSubmit = (data: RequerimientoFormData) => {
    agregarRequerimiento(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field>
        <FieldLabel>
          Cliente / Empresa
        </FieldLabel>

        <Input
          {...register("clienteEmpresa",
            { required: "Este campo es obligatorio" }
          )}
        />

        <FieldError errors={[errors.clienteEmpresa]} />
      </Field>

      <Field>
        <FieldLabel>
          Cotización
        </FieldLabel>

        <Input
          type="text"
          {...register("numeroCotizacion")}
        />
        <FieldError errors={[errors.numeroCotizacion]} />
      </Field>

      <Field>
        <FieldLabel>
          Descripción
        </FieldLabel>

        <Textarea
          {...register("detalleDescripcion")}
        />
      </Field>

      <Field>
        <FieldLabel>
          Monto Total
        </FieldLabel>

        <Input
          type="number"
          {...register("montoTotal", {
            valueAsNumber: true,
            required: "Este campo es obligatorio",
            min: {value: 0, message: "El monto total no puede ser negativo"}
          })}
        />

        <FieldError errors={[errors.montoTotal]} />
      </Field>

      <Field>
        <FieldLabel>
          Monto Pagado
        </FieldLabel>

        <Input
          type="number"
          {...register("montoPagado", {
            valueAsNumber: true,
            min: {value: 0, message: "El monto no puede ser negativo"}
          })}
        />

        <FieldError errors={[errors.montoPagado]} />
      </Field>

      <Button type="submit">
        Guardar
      </Button>
    </form>
  )
}