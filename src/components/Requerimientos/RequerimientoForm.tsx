import { useForm, Controller } from "react-hook-form";

import type { RequerimientoFormData } from "@/types/requerimientoForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

import {useRequerimientos} from "@/context/RequerimientosContext";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"

import { trabajadores, estados } from "@/data/data_placeholder";

type RequerimientoFormProps = {
  onSuccess: () => void;
};

export const RequerimientoForm = ({ onSuccess }: RequerimientoFormProps) => {
  const { register, 
    handleSubmit, 
    reset,
    control,
    watch,
    formState: { errors } } = useForm<RequerimientoFormData>({
      defaultValues: {
        fecha: new Date().toISOString().split("T")[0], 
        clienteEmpresa: "",
        numeroCotizacion: "",
        detalleDescripcion: "",
        responsableId: 0,
        estadoId: 0,
        montoTotal: 0,
        montoPagado: 0,
        medioPago: "",
        numeroFactura: "",
        otrosDatos: ""
      }
    });

  const { agregarRequerimiento } = useRequerimientos();

  const toSafeNumber = (value: unknown) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  const montoTotal = toSafeNumber(watch("montoTotal"));
  const montoPagado = toSafeNumber(watch("montoPagado"));

  const montoPendiente = Math.max(montoTotal - montoPagado, 0);

  const onSubmit = (data: RequerimientoFormData) => {
    const pendiente = data.montoTotal - data.montoPagado

    if (pendiente < 0) {
      alert("El monto pagado no puede ser mayor al monto total"); //reemplazar por error
      return;
    }

    agregarRequerimiento(data);
    reset();
    onSuccess();
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <div className="col-span-1 grid grid-cols-2 gap-4">
        <Field className="col-span-1">
          <FieldLabel>
            Fecha
          </FieldLabel>
          <Input
            type="date"
            {...register("fecha", { required: "Este campo es obligatorio" })}
          />
          <FieldError errors={[errors.fecha]} />
        </Field>

        <Field className="col-span-1">
          <FieldLabel>
            N° Cotización
          </FieldLabel>
          <Input
            type="text"
            {...register("numeroCotizacion")}
          />
          <FieldError errors={[errors.numeroCotizacion]} />
        </Field>
        
        <Field className="col-span-2">
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

        <Field className="col-span-2">
          <FieldLabel>
            Descripción
          </FieldLabel>

          <Textarea
            {...register("detalleDescripcion")}
            className="resize-none h-27.5"
            placeholder="Adhesivo / Tela / Greyback ..."
          />
        </Field>
      </div>

      <div className="col-span-1">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Field className="col-span-1">
            <FieldLabel>
              Responsable
            </FieldLabel>
            <Controller
              control={control}
              name="responsableId"
              rules={{required: "Debe seleccionar un responsable"}}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {trabajadores.map(t => (
                      <SelectItem
                        key={t.id}
                        value={t.id.toString()}
                      >
                        {t.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>

                </Select>
                )}
                />
              <FieldError errors={[errors.responsableId]} />
          </Field>
          
          

          <Field className="col-span-1">
            <FieldLabel>
              Estado
            </FieldLabel>
            <Controller
              control={control}
              name="estadoId"
              rules={{required: "Debe seleccionar un estado"}}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map(e => (
                      <SelectItem
                        key={e.id}
                        value={e.id.toString()}
                      >
                        {e.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>

                </Select>
                )}
                />
              <FieldError errors={[errors.estadoId]} />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field className="col-span-1">
            <FieldLabel>
              Total
            </FieldLabel>

            <Input 
              type="text"
              inputMode="numeric"
              {...register("montoTotal", {
                valueAsNumber: true,
                required: "Este campo es obligatorio",
                min: {value: 0, message: "El monto total no puede ser negativo"}
              })}
            />

            <FieldError errors={[errors.montoTotal]} />
          </Field>

          <Field className="col-span-1">
            <FieldLabel>
              Pagado
            </FieldLabel>

            <Input 
              type="text"
              inputMode="numeric"
              {...register("montoPagado", {
                valueAsNumber: true,
                min: {value: 0, message: "El monto no puede ser negativo"}
              })}
            />

            <FieldError errors={[errors.montoPagado]} />
          </Field>

          <Field className="col-span-1">
            <FieldLabel>
              Pendiente
            </FieldLabel>
            <Input 
              value={montoPendiente}
              disabled/>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Field className="col-span-1">
            <FieldLabel>
              Medio de Pago
            </FieldLabel>
            <Input
              type="text"
              {...register("medioPago")}
            />
          </Field>
          <Field className="col-span-1">
            <FieldLabel>
              N° Factura
            </FieldLabel>
            <Input
              type="text"
              {...register("numeroFactura")}
            />
          </Field>
        </div>

        <Field className="col-span-2 mt-4">
          <FieldLabel>
            Otros Datos
          </FieldLabel>
          <Input
            type="text"
            {...register("otrosDatos")}
            placeholder="Telefono / OC / RUT"
          />
        </Field>
        
      </div>

      <div className="col-span-2 flex justify-end">
        <Button type="submit">
          Guardar
        </Button>
      </div>

    </form>
  )
}