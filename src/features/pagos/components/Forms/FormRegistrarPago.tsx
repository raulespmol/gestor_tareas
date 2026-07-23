import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useCatalogos } from "@/context/CatalogosContext";

import type { Requerimiento } from "../../../requerimientos/types/requerimiento.type";
import type { RegistrarPagoFormData } from "@/features/pagos/schemas/registrarPago.schema";

import { createRegistrarPagoSchema } from "@/features/pagos/schemas/registrarPago.schema";

import { formatearMonedaInput, parsearMonedaInput } from "@/utils/formatearMoneda";
import { getEstadoPago } from "@/features/requerimientos/utils/colorMonto";

import { CardMonto } from "@/features/requerimientos/components/CardMonto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"
import { Calendar, CreditCard, DollarSign, ScrollText } from "lucide-react";
import { Separator } from "@/components/ui/separator"

type RegistrarPagoFormProps = {
  requerimiento: Requerimiento;
  onSuccess: () => void;
};

export const FormRegistrarPago = ({ requerimiento, onSuccess }: RegistrarPagoFormProps) => {
  const agregarPago = (data: {}, id: string) => {
    console.log(data, id) //TRAER DESDE SERVICE
  }

  const { medios_pago } = useCatalogos()

  const montoMaximo = Math.max(
    0,
    (requerimiento.monto_pendiente ?? requerimiento.monto_total - requerimiento.monto_pagado)
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<RegistrarPagoFormData>({
    resolver: zodResolver(createRegistrarPagoSchema(montoMaximo)),

    defaultValues: {
      fecha: new Date().toISOString().split("T")[0],
      monto: 0,
      medio_pago: "",
      voucher: "",
    },
  })

  const onSubmit = (data: RegistrarPagoFormData) => {
    agregarPago(data, requerimiento.id)
    reset({
      fecha: new Date().toISOString().split("T")[0],
      monto: 0,
      medio_pago: "",
      voucher: "",
    })
    onSuccess();
  }

  const medioPagoValue = watch("medio_pago");
  const isVoucherEnabled = medioPagoValue === "debito" || medioPagoValue === "credito"

  useEffect(() => {
    if (!isVoucherEnabled) {
      setValue("voucher", "");
    }
  }, [isVoucherEnabled, setValue]);

  const estadoPago = getEstadoPago(requerimiento.monto_pagado, requerimiento.monto_total);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <Field className="col-span-1 flex justify-end">
          <FieldLabel>
            <Calendar size={16} />
            Fecha
          </FieldLabel>
          <Input
            type="date"
            {...register("fecha")}
          />
          <FieldError errors={[errors.fecha]} />
        </Field>

        <Field className="col-span-1 flex justify-end">
          <FieldLabel>
            <DollarSign size={16} />
            Monto a Pagar
            <Button
              type="button"
              onClick={() => setValue("monto", montoMaximo)}
              size={"xs"}
              variant={"default"}
            >
              Pagar pendiente
            </Button>
          </FieldLabel>
          <Controller
            control={control}
            name="monto"
            render={({ field }) => (
              <Input
                type="text"
                inputMode="numeric"
                max={montoMaximo}
                value={formatearMonedaInput(field.value)}
                onChange={(event) => field.onChange(parsearMonedaInput(event.target.value))}
                onBlur={() => field.onBlur()}
                className="font-mono"
                autoFocus
              />
            )}
          />
          <FieldError errors={[errors.monto]} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field className="col-span-1">
          <FieldLabel>
            <CreditCard size={16} />
            Medio de Pago
          </FieldLabel>
          <Controller
            control={control}
            name="medio_pago"
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  {medios_pago.map(m => (
                    <SelectItem
                      key={m.key}
                      value={m.key}
                    >
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
            )}
          />
          
          <FieldError errors={[errors.medio_pago]} />
        </Field>
        
        <Field className="col-span-1">
          <FieldLabel>
            <ScrollText size={16} />
            N° Voucher
          </FieldLabel>

          <Input
            {...register("voucher")}
            disabled={!isVoucherEnabled}
            className="font-mono"
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