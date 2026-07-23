import { supabase } from "@/utils/supabase";
import type { Estado } from "./estado.type";

export const obtenerEstados = async (): Promise<Estado[]> => {
  const { data, error } = await supabase
    .from("estados")
    .select("id, key, label")
    .order("orden", {ascending: true})

  if (error) throw error;

  return data ?? [];
};