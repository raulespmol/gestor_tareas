import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  requerimientoSchema,
  type RequerimientoFormData
} from "@/features/requerimientos/schemas/requerimiento.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import {useRequerimientos} from "@/context/RequerimientosContext";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"

import { trabajadores } from "@/data/placeholder/trabajadores";
import { estados } from "@/data/placeholder/estados";
import { defaultRequerimientoForm } from "@/features/requerimientos/constants/defaultRequerimientoForm"

type RequerimientoFormProps = {
  onSuccess: () => void;
};

export const FormNuevoRequerimiento = ({ onSuccess }: RequerimientoFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors }
  } = useForm<RequerimientoFormData>({
    resolver: zodResolver(requerimientoSchema),

    defaultValues: defaultRequerimientoForm,
  });

  const { agregarRequerimiento } = useRequerimientos();

  const montoTotal = watch("montoTotal");
  const montoPagado = watch("montoPagado");
  const montoPendiente = montoTotal - montoPagado

  const onSubmit = (data: RequerimientoFormData) => {
    agregarRequerimiento(data);
    reset(defaultRequerimientoForm);
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
            {...register("fecha")}
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
            placeholder="01234"
          />
          <FieldError errors={[errors.numeroCotizacion]} />
        </Field>
        
        <Field className="col-span-2">
          <FieldLabel>
            Cliente
          </FieldLabel>

          <Input
            {...register("clienteEmpresa")}
            placeholder="Nombre / Razón Social"
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
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(value)}
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
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(value)}
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
                setValueAs: (v) => Number(v || 0),
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
                setValueAs: (v) => Number(v || 0),
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
              placeholder="Transf. / Efectivo / Debito"
            />
          </Field>
          <Field className="col-span-1">
            <FieldLabel>
              N° Factura
            </FieldLabel>
            <Input
              type="text"
              {...register("numeroFactura")}
              placeholder="01234"
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
          Agregar
        </Button>
      </div>

    </form>
  )
}