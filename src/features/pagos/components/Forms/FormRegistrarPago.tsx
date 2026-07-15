import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import {
  createRegistrarPagoSchema,
  type RegistrarPagoFormData
} from "@/features/pagos/schemas/registrarPago.schema";

import { CardMonto } from "@/features/requerimientos/components/CardMonto";

import { getEstadoPago } from "@/features/requerimientos/utils/colorMonto";
import { mediosPago } from "@/data/placeholder/mediosPago";
import { usePagos } from "@/context/PagosContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"
import type { Requerimiento } from "../../../requerimientos/types/requerimiento.type";
import { Calendar, CreditCard, DollarSign, ScrollText } from "lucide-react";
import { Separator } from "@/components/ui/separator"

type RegistrarPagoFormProps = {
  requerimiento: Requerimiento;
  onSuccess: () => void;
};

export const FormRegistrarPago = ({ requerimiento, onSuccess }: RegistrarPagoFormProps) => {
  const { agregarPago } = usePagos();

  const montoMaximo = Math.max(
    0,
    (requerimiento.montoPendiente ?? requerimiento.montoTotal - requerimiento.montoPagado)
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
      medioPago: "",
      voucher: "",
    },
  })

  const onSubmit = (data: RegistrarPagoFormData) => {
    agregarPago(data, requerimiento.id)
    reset({
      fecha: new Date().toISOString().split("T")[0],
      monto: 0,
      medioPago: "",
      voucher: "",
    })
    onSuccess();
  }

  const medioPagoValue = watch("medioPago");
  const isVoucherEnabled = medioPagoValue === "debito" || medioPagoValue === "credito"

  useEffect(() => {
    if (!isVoucherEnabled) {
      setValue("voucher", "");
    }
  }, [isVoucherEnabled, setValue]);

  const estadoPago = getEstadoPago(requerimiento.montoPagado, requerimiento.montoTotal);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <CardMonto 
          label="Total" 
          value={requerimiento.montoTotal} 
        />
        <CardMonto 
          label="Pagado" 
          value={requerimiento.montoPagado} variant={estadoPago} 
        />
        <CardMonto 
          label="Pendiente" 
          value={requerimiento.montoPendiente} variant={estadoPago} 
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
              // className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              Pagar pendiente
            </Button>
          </FieldLabel>
          <Input
            type="number"
            max={montoMaximo}
            {...register("monto", {valueAsNumber: true})}
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
        
        <Field className="col-span-1">
          <FieldLabel>
            <ScrollText size={16} />
            N° Voucher
          </FieldLabel>

          <Input
            {...register("voucher")}
            disabled={!isVoucherEnabled}
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