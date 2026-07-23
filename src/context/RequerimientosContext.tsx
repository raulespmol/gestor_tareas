import { supabase } from "@/utils/supabase";
import { createContext, useContext, useEffect, useState } from "react";
import { ordenarFechaAsc } from "@/features/requerimientos/utils/ordenarFecha";
import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";
import type { RequerimientoFormData } from "@/features/requerimientos/schemas/nuevoRequerimiento.schema";

type RequerimientosContextType = {
  requerimientos: Requerimiento[];
  actualizarEstado: (id_requerimiento: string, nuevo_id_estado: string) => void;
  actualizarResponsable: (id_requerimiento: string, nuevo_id_responsable: string) => void;
  agregarRequerimiento: (data: RequerimientoFormData) => void;
  editarRequerimiento: (actualizado: Requerimiento) => void;
  eliminarRequerimiento: (id: string) => void;
  actualizarMontos: (requerimiento_id: string, monto_pagado: number) => void;
}

type ProviderProps = {
  children: React.ReactNode;
}

const RequerimientosContext = createContext<RequerimientosContextType | null>(null);

const cargarRequerimientos = async (): Promise<Requerimiento[]> => {
  try {
    const { data, error } = await supabase
      .from("requerimientos_resumen")
      .select("*");

    if (error) {
      throw error;
    }
    console.log(data)
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

export const RequerimientosProvider = ({children}: ProviderProps) => {
  const [requerimientos, setRequerimientos] = useState<Requerimiento[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const data = await cargarRequerimientos();
      setRequerimientos(data);
    };

    cargar();
  }, []);

  const actualizarEstado = (idRequerimiento: string, nuevoEstadoId: string) => {
    setRequerimientos((prev) => 
      prev.map(req => req.id === id_requerimiento ? {...req, estado_id: nuevo_id_estado} : req)
    );
  };

  const actualizarResponsable = (id_requerimiento: string, nuevo_id_responsable: string) => {
    setRequerimientos((prev) => 
      prev.map(req => req.id === id_requerimiento ? {...req, responsable_id: nuevo_id_responsable
  
      } : req)
    );
  };

  const agregarRequerimiento = (data: RequerimientoFormData) => {
    const nuevoRequerimiento: Requerimiento = {
      ...data,
      monto_pendiente: data.monto_total,
      monto_pagado: 0,
    }
    
    setRequerimientos((prev) => ordenarFechaAsc([...prev, nuevoRequerimiento]))
  }

  const editarRequerimiento = (actualizado: Requerimiento) => {
    setRequerimientos((prev) =>
      ordenarFechaAsc(prev.map((r) => (r.id === actualizado.id ? actualizado : r)))
    );
  };

  const eliminarRequerimiento = (id: string) => {
    setRequerimientos((prev) => prev.filter((r) => r.id !== id));
  };

 const actualizarMontos = (requerimiento_id: string, monto_pagado: number) => {
  setRequerimientos((prev) =>
    prev.map((r) =>
      r.id === requerimiento_id
        ? { ...r,  
            monto_pagado: r.monto_pagado + monto_pagado, 
            monto_pendiente: r.monto_pendiente - monto_pagado }
        : r
    )
  );
};

  return (
    <RequerimientosContext.Provider value={{ 
      requerimientos, 
      actualizarEstado, 
      actualizarResponsable, 
      agregarRequerimiento,
      editarRequerimiento,
      eliminarRequerimiento,
      actualizarMontos
    }}>
      {children}
    </RequerimientosContext.Provider>
  );
};

export const useRequerimientos = () => {
  const context = useContext(RequerimientosContext);
  if (!context) {
    throw new Error("useRequerimientos must be used within a RequerimientosProvider");
  }
  return context;
}