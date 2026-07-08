import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import {
  createRegistrarPagoSchema,
  type RegistrarPagoFormData
} from "@/features/pagos/schemas/registrarPago.schema";

import { mediosPago } from "@/data/placeholder/mediosPago";

import { usePagos } from "@/context/PagosContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"
import type { Requerimiento } from "../../../requerimientos/types/requerimiento.type";
import { formatearMoneda } from "@/utils/formatearMoneda";

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

  type CampoProps = {
    label: string;
    valor?: string;
  };

  const Campo = ({ label, valor }: CampoProps) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm">{valor || "—"}</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <Campo 
          label="Total" 
          valor={formatearMoneda(requerimiento.montoTotal)} 
        />
        <Campo 
          label="Pagado" 
          valor={formatearMoneda(requerimiento.montoPagado)} 
        />
        <Campo 
          label="Pendiente" 
          valor={formatearMoneda(requerimiento.montoTotal - requerimiento.montoPagado)} 
        />
      </div>

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
            max={montoMaximo}
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
        
        <Field className="col-span-1">
          <FieldLabel>
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