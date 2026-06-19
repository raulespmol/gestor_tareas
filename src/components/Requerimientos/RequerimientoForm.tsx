import { useForm } from "react-hook-form";

import type { RequerimientoFormData } from "@/types/requerimientoForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "../ui/field";

export const RequerimientoForm = () => {
  const { register, handleSubmit } = useForm<RequerimientoFormData>();

  const onSubmit = (data: RequerimientoFormData) => {
    console.log("Datos del formulario:", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel>
          Cliente / Empresa
        </FieldLabel>

        <Input
          {...register("clienteEmpresa")}
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
          })}
        />
      </Field>

      <Button type="submit">
        Guardar
      </Button>
    </form>
  )
}