import { supabase } from "@/utils/supabase";
import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";
import { ordenarFechaAsc } from "@/features/requerimientos/utils/ordenarFecha";

export const obtenerRequerimientos = async (): Promise<Requerimiento[]> => {
  const { data, error } = await supabase
    .from("requerimientos_resumen")
    .select("*");

  if (error) throw error;

  return ordenarFechaAsc(data);
};