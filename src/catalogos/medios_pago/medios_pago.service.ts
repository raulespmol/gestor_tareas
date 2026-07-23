import { supabase } from "@/utils/supabase";
import type { MedioPago } from "./medio_pago.type";

export const obtenerMediosPago = async (): Promise<MedioPago[]> => {
  const { data, error } = await supabase
      .from("medios_pago")
      .select("id, key, label");
  
    if (error) throw error;
  
    return data ?? [];
}