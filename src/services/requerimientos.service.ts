import { supabase } from "@/utils/supabase";
import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";
import { ordenarFechaAsc } from "@/features/requerimientos/utils/ordenarFecha";

export const obtenerRequerimientos = async (): Promise<Requerimiento[]> => {
  try {
    const { data, error } = await supabase
      .from("requerimientos_resumen")
      .select("*");

    if (error) {
      throw error;
    }
    return ordenarFechaAsc(data);

  } catch (error: unknown) {

    if (error instanceof Error) {
      console.error("Error al obtener los requerimientos:", error.message);
    } else {
      console.error("Ocurrió un error al obtener los requerimientos.", error);
    }
    return [];
  }
};