import { supabase } from "@/utils/supabase";
import type { Trabajador } from "./trabajador.type";

export const obtenerTrabajadores = async (): Promise<Trabajador[]> => {
  const { data, error } = await supabase
    .from("trabajadores")
    .select("id, nombre");

  if (error) throw error;

  return data ?? [];
}