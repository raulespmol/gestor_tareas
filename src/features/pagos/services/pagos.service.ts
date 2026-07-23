import { supabase } from "@/utils/supabase";
import type { Pago } from "../types/pago.type";

export const obtenerPagosRequerimiento = async (id: string): Promise<Pago[]> => {
  const { data, error } = await supabase
    .from("pagos")
    .select("*")
    .eq('requerimiento_id', id)
    

  if (error) throw error;

  console.log(data)
  return data;
}