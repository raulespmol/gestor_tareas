import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  nuevoRequerimientoSchema,
  type RequerimientoFormData
} from "@/features/requerimientos/schemas/nuevoRequerimiento.schema";
import type { Requerimiento } from "../../types/requerimiento.type";

import { Calendar, User, FileText, DollarSign, TextAlignStart, Tag, Ellipsis, Plus, Check } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"

import { trabajadores } from "@/data/placeholder/trabajadores";
import { estados } from "@/data/placeholder/estados";
import { DotEstado } from "../DotEstado";

type RequerimientoFormProps = {
  requerimiento?: Requerimiento | null
  defaultValues: RequerimientoFormData;
  onSave: (data: RequerimientoFormData) => void;
  errorMontoTotal?: string;
};

export const FormRequerimiento = ({ requerimiento, defaultValues, onSave, errorMontoTotal }: RequerimientoFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<RequerimientoFormData>({
    resolver: zodResolver(nuevoRequerimientoSchema),
    defaultValues,
  });

  const mode = requerimiento ? "edit" : "create"

  const handleFormSubmit = (data: RequerimientoFormData) => {
    onSave(data)
    reset(defaultValues)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Field className="col-span-1">
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
        
        <Field className="col-span-1">
          <FieldLabel>
            <User size={16} />
            Cliente
          </FieldLabel>

          <Input
            {...register("clienteEmpresa")}
            placeholder="Nombre / Razón Social"
          />

          <FieldError errors={[errors.clienteEmpresa]} />
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Field className="col-span-1">
          <FieldLabel>
            <FileText size={16} />
            N° Cotización
          </FieldLabel>
          <Input
            type="text"
            {...register("numeroCotizacion")}
            placeholder="01234"
          />
          <FieldError errors={[errors.numeroCotizacion]} />
        </Field>

        <Field className="col-span-1">
          <FieldLabel>
            <DollarSign size={16} />
            Total
          </FieldLabel>

          <Input 
            type="text"
            inputMode="numeric"
            {...register("montoTotal", {
              setValueAs: (v) => Number(v || 0),
            })}
          />

          <FieldError errors={[errors.montoTotal, errorMontoTotal ? { message: errorMontoTotal } : undefined]} />
        </Field>
        
        <Field className="col-span-1">
          <FieldLabel>
            <FileText size={16} />
            N° Factura
          </FieldLabel>
          <Input
            type="text"
            {...register("numeroFactura")}
            placeholder="01234"
          />
        </Field>
      </div>

      <Field className="col-span-2">
          <FieldLabel>
            <TextAlignStart size={16} />
            Descripción
          </FieldLabel>

          <Textarea
            {...register("detalleDescripcion")}
            className="resize-none h-27.5"
            placeholder="Adhesivo / Tela / Greyback ..."
          />
        </Field>

      <div className="col-span-1">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Field className="col-span-1">
            <FieldLabel>
              <User size={16} />
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
              <Tag size={16} />
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
                        <DotEstado estado={e}/>
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
          
        </div>

        <Field className="col-span-2 mb-4">
          <FieldLabel>
            <Ellipsis size={16} />
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
          {mode === "create" ? <Plus /> : <Check />}
          {mode === "create" ? "Agregar" : "Guardar"}
        </Button>
      </div>

    </form>
  )
}