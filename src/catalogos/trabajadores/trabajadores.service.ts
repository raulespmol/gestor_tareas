import { supabase } from "@/utils/supabase";
import type { Trabajador } from "./trabajador.type";

export const obtenerTrabajadores = async (): Promise<Trabajador[]> => {
  try {
    const { data, error } = await supabase
      .from("trabajadores")
      .select("*");

    if (error) {
      throw error;
    }
    return data;

  } catch (error: unknown) {

    if (error instanceof Error) {
      console.error("Error al obtener los requerimientos:", error.message);
    } else {
      console.error("Ocurrió un error al obtener los requerimientos.", error);
    }
    return [];
  }
}