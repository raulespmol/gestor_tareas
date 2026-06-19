import { useForm } from "react-hook-form";

import type { RequerimientoFormData } from "@/types/requerimientoForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

export const RequerimientoForm = () => {
  const { register, 
    handleSubmit, 
    formState: { errors } } = useForm<RequerimientoFormData>({
      defaultValues: {
        clienteEmpresa: "",
        numeroCotizacion: "",
        detalleDescripcion: "",
        montoTotal: 0,
      }
    });

  const onSubmit = (data: RequerimientoFormData) => {
    console.log("Datos del formulario:", data);
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

      <Button type="submit">
        Guardar
      </Button>
    </form>
  )
}