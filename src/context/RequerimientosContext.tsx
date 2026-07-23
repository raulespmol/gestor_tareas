import { createContext, useContext, useEffect, useState } from "react";
import { ordenarFechaAsc } from "@/features/requerimientos/utils/ordenarFecha";
import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";
import type { RequerimientoFormData } from "@/features/requerimientos/schemas/nuevoRequerimiento.schema";

import { obtenerRequerimientos } from "@/features/requerimientos/services/requerimientos.service";

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

export const RequerimientosProvider = ({children}: ProviderProps) => {
  const [requerimientos, setRequerimientos] = useState<Requerimiento[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cargarRequerimientos();
  }, []);

  const cargarRequerimientos = async () => {
    // setIsLoading(true);

    const data = await obtenerRequerimientos();

    setRequerimientos(data);
    // setIsLoading(false);
  };

  const actualizarEstado = (id_requerimiento: string, nuevo_id_estado: string) => {
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
    //INSERT SUPABASE
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