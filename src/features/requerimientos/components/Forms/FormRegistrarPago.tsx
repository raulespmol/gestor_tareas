import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registrarPagoSchema,
  type RegistrarPagoFormData
} from "@/features/requerimientos/schemas/registrarPago.schema";

import { mediosPago } from "@/data/placeholder/mediosPago";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"

type RegistrarPagoFormProps = {
  onSuccess: () => void;
};

export const FormRegistrarPago = ({ onSuccess }: RegistrarPagoFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<RegistrarPagoFormData>({
    resolver: zodResolver(registrarPagoSchema),

    defaultValues: {
      fecha: new Date().toISOString().split("T")[0],
      monto: 0,
      medioPago: "",
      voucher: "",
    },
  })

  const onSubmit = (data: RegistrarPagoFormData) => {
    console.log("Pago Registrado:", data)
    reset({
      fecha: new Date().toISOString().split("T")[0],
      monto: 0,
      medioPago: "",
      voucher: "",
    })
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Field className="col-span-1">
          <FieldLabel>
            Fecha
          </FieldLabel>
          <Input
            type="date"
            {...register("fecha")}
          />
          <FieldError errors={[errors.fecha]} />
        </Field>

        <Field className="col-span-1">
          <FieldLabel>
            Monto a Pagar
          </FieldLabel>
          <Input
            type="number"
            {...register("monto", {valueAsNumber: true})}
          />
          <FieldError errors={[errors.monto]} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field className="col-span-1">
          <FieldLabel>
            Medio de Pago
          </FieldLabel>
          <Controller
            control={control}
            name="medioPago"
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  {mediosPago.map(t => (
                    <SelectItem
                      key={t.value}
                      value={t.value}
                    >
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
            )}
          />
          
          <FieldError errors={[errors.medioPago]} />
        </Field>
        
        <Field className="col-span-2">
          <FieldLabel>
            N° Voucher
          </FieldLabel>

          <Input
            {...register("voucher")}
            placeholder="0123"
          />
          <FieldError errors={[errors.voucher]} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">

      </div>

      <div className="col-span-2 flex justify-end">
        <Button type="submit">
          Registrar
        </Button>
      </div>

    </form>
  )
}